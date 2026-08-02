"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: any
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader
    // The ring pattern is always centered on the cursor (no falling back to
    // screen-center), and the distance field feeding the bands is stretched
    // along the cursor's recent velocity so the rings lean/elongate in the
    // direction of travel instead of staying perfectly circular.
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;
      uniform vec2 velocity;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        vec2 muv = (mouse * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        vec2 d = uv - muv;
        float speed = length(velocity);
        vec2 dir = speed > 0.0001 ? velocity / speed : vec2(1.0, 0.0);
        float along = dot(d, dir);
        float perp = dot(d, vec2(-dir.y, dir.x));
        float stretch = 1.0 + clamp(speed * 40.0, 0.0, 3.5);
        float dist = length(vec2(along / stretch, perp));

        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - dist + mod(uv.x+uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: new THREE.Vector2() },
      velocity: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    container.appendChild(renderer.domElement)

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    // Initial resize
    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Pointer tracking: the ring center eases toward the pointer every frame,
    // always — never falls back toward screen-center.
    const targetMouse = new THREE.Vector2()
    const prevMouse = new THREE.Vector2()

    // Listen on window (not the container) so movement is tracked everywhere
    // on the page, including over buttons/text stacked above the shader.
    let moving = false
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const scaleX = renderer.domElement.width / rect.width
      const scaleY = renderer.domElement.height / rect.height
      targetMouse.x = (e.clientX - rect.left) * scaleX
      targetMouse.y = renderer.domElement.height - (e.clientY - rect.top) * scaleY
      moving = true
    }
    window.addEventListener("pointermove", onPointerMove)

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate)
      // the ring cycle only advances on frames where the pointer actually
      // moved, and advances much slower than before once it does
      if (moving) {
        uniforms.time.value += 0.008
        moving = false
      }

      prevMouse.copy(uniforms.mouse.value)
      uniforms.mouse.value.x += (targetMouse.x - uniforms.mouse.value.x) * 0.08
      uniforms.mouse.value.y += (targetMouse.y - uniforms.mouse.value.y) * 0.08

      // velocity in the same normalized space the shader uses for `uv`/`mouse`
      const m = Math.min(uniforms.resolution.value.x, uniforms.resolution.value.y) || 1
      const rawVx = ((uniforms.mouse.value.x - prevMouse.x) * 2.0) / m
      const rawVy = ((uniforms.mouse.value.y - prevMouse.y) * 2.0) / m
      uniforms.velocity.value.x += (rawVx - uniforms.velocity.value.x) * 0.25
      uniforms.velocity.value.y += (rawVy - uniforms.velocity.value.y) * 0.25

      renderer.render(scene, camera)

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId
      }
    }

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize)
      window.removeEventListener("pointermove", onPointerMove)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}
