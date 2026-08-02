"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

// Two-pass accumulation buffer: nothing here is time-driven or cycles on
// its own. Each frame the previous buffer barely diffuses and slowly
// decays, and a *static* set of concentric bands (no time term - fixed
// ring radii, same reciprocal-glow technique as the original design) is
// stamped along the segment the pointer traveled since the last frame -
// with zero stamp while the pointer is idle. So light only ever appears
// where the cursor actually moved, then dims and barely spreads on its own.
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
        vec2 texel = 1.0 / uResolution;

        // barely-there diffusion: most weight stays on the source pixel
        vec3 prev = texture2D(uPrev, texUv).rgb * 0.84;
        prev += texture2D(uPrev, texUv + vec2(texel.x, 0.0)).rgb * 0.04;
        prev += texture2D(uPrev, texUv - vec2(texel.x, 0.0)).rgb * 0.04;
        prev += texture2D(uPrev, texUv + vec2(0.0, texel.y)).rgb * 0.04;
        prev += texture2D(uPrev, texUv - vec2(0.0, texel.y)).rgb * 0.04;

        // slow decay - dims gradually rather than snapping off
        prev *= 0.988;

        // static concentric bands (no time term => no cycling), stamped
        // along the segment traveled this frame; zero when idle
        vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
        float dist = distToSegment(p, uMousePrev, uMouse);

        vec3 stamp = vec3(0.0);
        for (int ch = 0; ch < 3; ch++) {
          for (int k = 0; k < 5; k++) {
            float r = 0.035 + float(k) * 0.045 + float(ch) * 0.003;
            float w = 0.0028;
            stamp[ch] += w * float(k + 1) / (abs(dist - r) + w);
          }
        }

        vec3 color = prev + stamp * 0.16 * uIntensity;
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
        color = color / (1.0 + color); // soft tonemap so accumulated brightness doesn't clip harshly
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

    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)

      const w = renderer.domElement.width
      const h = renderer.domElement.height
      rtA.setSize(w, h)
      rtB.setSize(w, h)
      simUniforms.uResolution.value.set(w, h)
      displayUniforms.uResolution.value.set(w, h)

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
      const m = Math.min(fullW, fullH) || 1
      return new THREE.Vector2((px * 2 - fullW) / m, (py * 2 - fullH) / m)
    }

    // Listen on window (not the container) so movement is tracked everywhere
    // on the page, including over buttons/text stacked above the shader.
    const onPointerMove = (e: PointerEvent) => {
      current.copy(toFieldSpace(e.clientX, e.clientY))
      moveIntensity = 1
    }
    window.addEventListener("pointermove", onPointerMove)

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
      moveIntensity *= 0.7 // stamping fades out within a handful of frames once movement stops
    }
    animate()

    return () => {
      window.removeEventListener("resize", onWindowResize)
      window.removeEventListener("pointermove", onPointerMove)
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
