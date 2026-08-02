"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

// Two-pass accumulation-buffer effect: a "sim" pass diffuses + decays the
// previous frame and stamps fresh light along the segment the pointer just
// traveled (only when it actually moved), then a "display" pass tonemaps
// that buffer to the screen. There is no time-driven animation — every
// visible pixel traces back to an actual pointer movement, fading and
// spreading outward on its own afterward.
export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const passVertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const simFragmentShader = `
      precision highp float;
      uniform sampler2D uPrev;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec2 uMousePrev;
      uniform float uIntensity;

      float distToSegment(vec2 p, vec2 a, vec2 b) {
        vec2 pa = p - a;
        vec2 ba = b - a;
        float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
        return length(pa - ba * h);
      }

      void main() {
        vec2 texUv = gl_FragCoord.xy / uResolution;
        vec2 texel = 2.5 / uResolution;

        // diffuse: cheap 4-tap blur of the previous frame (spreads the glow outward)
        vec3 prev = texture2D(uPrev, texUv).rgb * 0.55;
        prev += texture2D(uPrev, texUv + vec2(texel.x, 0.0)).rgb * 0.1125;
        prev += texture2D(uPrev, texUv - vec2(texel.x, 0.0)).rgb * 0.1125;
        prev += texture2D(uPrev, texUv + vec2(0.0, texel.y)).rgb * 0.1125;
        prev += texture2D(uPrev, texUv - vec2(0.0, texel.y)).rgb * 0.1125;

        // decay: fades toward darkness over time
        prev *= 0.982;

        // stamp fresh light along the segment traveled this frame (zero when idle)
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
        float d = distToSegment(p, uMousePrev, uMouse);
        float stamp = smoothstep(0.06, 0.0, d) * uIntensity;

        vec3 color = prev + stamp * vec3(0.55, 0.72, 1.0);
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const displayFragmentShader = `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec2 uResolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec3 color = texture2D(uTexture, uv).rgb;
        color = color / (1.0 + color); // soft tonemap so overlapping stamps don't clip harshly
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const camera = new THREE.Camera()
    camera.position.z = 1
    const geometry = new THREE.PlaneGeometry(2, 2)

    const simUniforms = {
      uPrev: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2() },
      uMousePrev: { value: new THREE.Vector2() },
      uIntensity: { value: 0 },
    }
    const simMaterial = new THREE.ShaderMaterial({
      uniforms: simUniforms,
      vertexShader: passVertexShader,
      fragmentShader: simFragmentShader,
    })
    const simScene = new THREE.Scene()
    simScene.add(new THREE.Mesh(geometry, simMaterial))

    const displayUniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uResolution: { value: new THREE.Vector2() },
    }
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: displayUniforms,
      vertexShader: passVertexShader,
      fragmentShader: displayFragmentShader,
    })
    const displayScene = new THREE.Scene()
    displayScene.add(new THREE.Mesh(geometry, displayMaterial))

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const rtOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
    }
    let rtA = new THREE.WebGLRenderTarget(1, 1, rtOptions)
    let rtB = new THREE.WebGLRenderTarget(1, 1, rtOptions)

    const clearTarget = (rt: THREE.WebGLRenderTarget) => {
      renderer.setRenderTarget(rt)
      renderer.setClearColor(0x000000, 1)
      renderer.clear()
    }

    const SIM_SCALE = 0.5 // sim buffer resolution relative to display; softens + speeds up diffusion

    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)

      const simW = Math.max(1, Math.floor(renderer.domElement.width * SIM_SCALE))
      const simH = Math.max(1, Math.floor(renderer.domElement.height * SIM_SCALE))
      rtA.setSize(simW, simH)
      rtB.setSize(simW, simH)
      simUniforms.uResolution.value.set(simW, simH)
      displayUniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height)

      clearTarget(rtA)
      clearTarget(rtB)
      renderer.setRenderTarget(null)
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    const current = new THREE.Vector2()
    const prevFrame = new THREE.Vector2()
    let moveIntensity = 0

    const toFieldSpace = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      const fullW = renderer.domElement.width
      const fullH = renderer.domElement.height
      const px = (clientX - rect.left) * (fullW / rect.width)
      const py = fullH - (clientY - rect.top) * (fullH / rect.height)
      const m = Math.min(fullW, fullH)
      return new THREE.Vector2((px * 2 - fullW) / m, (py * 2 - fullH) / m)
    }

    const onPointerMove = (e: PointerEvent) => {
      current.copy(toFieldSpace(e.clientX, e.clientY))
      moveIntensity = 1
    }
    container.addEventListener("pointermove", onPointerMove)

    let raf: number | null = null
    const animate = () => {
      raf = requestAnimationFrame(animate)

      simUniforms.uPrev.value = rtA.texture
      simUniforms.uMouse.value.copy(current)
      simUniforms.uMousePrev.value.copy(prevFrame)
      simUniforms.uIntensity.value = moveIntensity

      renderer.setRenderTarget(rtB)
      renderer.render(simScene, camera)

      displayUniforms.uTexture.value = rtB.texture
      renderer.setRenderTarget(null)
      renderer.render(displayScene, camera)

      const tmp = rtA
      rtA = rtB
      rtB = tmp

      prevFrame.copy(current)
      moveIntensity *= 0.85 // "is moving" gate eases out within a few frames of the pointer stopping
    }
    animate()

    return () => {
      window.removeEventListener("resize", onWindowResize)
      container.removeEventListener("pointermove", onPointerMove)
      if (raf !== null) cancelAnimationFrame(raf)
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      simMaterial.dispose()
      displayMaterial.dispose()
      rtA.dispose()
      rtB.dispose()
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
