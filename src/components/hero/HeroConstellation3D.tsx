"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import type { ViewMode } from "@/lib/viewMode"
import { NeuralRouterSvgFallback } from "./NeuralRouterSvgFallback"

interface HeroConstellation3DProps {
  mode: ViewMode
  activePipeline?: "idle" | "atiende" | "cv-harness"
  className?: string
}

const NODE_COORDS: [number, number, number][] = [
  [-2.6, 1.1, 0.2],   // Webhook ingress
  [-1.2, 0.4, 0.7],   // Deduplication
  [0.0, 1.3, -0.4],   // pgvector RAG
  [0.1, -0.5, 0.6],   // BullMQ Queue
  [1.4, 0.7, 0.3],    // Semantic Cache
  [1.6, -1.0, -0.3],  // LLM Router
  [2.7, 0.1, 0.2],    // Channel Adapter
  [-0.9, -1.3, -0.5], // Circuit Breaker
]

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 6],
  [3, 7],
  [7, 5],
  [0, 7],
  [2, 5],
]

function canRunWebGL(): boolean {
  if (typeof window === "undefined") return false
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false
  if (typeof navigator !== "undefined" && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    return false
  }
  try {
    const testCanvas = document.createElement("canvas")
    const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl")
    if (!gl) return false
    // Fall back to the 1px SVG schematic on software WebGL renderers (no GPU)
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
    if (debugInfo) {
      const renderer = String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "")
      if (/SwiftShader|llvmpipe|Software|Microsoft Basic Render/i.test(renderer)) {
        return false
      }
    }
    return true
  } catch {
    return false
  }
}

export default function HeroConstellation3D({
  mode,
  activePipeline = "idle",
  className = "",
}: HeroConstellation3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [useFallback, setUseFallback] = useState(false)
  const modeRef = useRef(mode)
  const pipelineRef = useRef(activePipeline)

  modeRef.current = mode
  pipelineRef.current = activePipeline

  const accentHex = mode === "b2b" ? "#F59E0B" : "#00E599"

  useEffect(() => {
    if (!canRunWebGL()) {
      setUseFallback(true)
      return
    }

    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      setUseFallback(true)
      return
    }

    // Read layout box once before DOM mutation to avoid forced reflow
    const rect = container.getBoundingClientRect()
    const initW = Math.max(1, Math.round(rect.width) || 480)
    const initH = Math.max(1, Math.round(rect.height) || 320)

    // Strict DPR cap [1, 1.5] per Master Spec §3.2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setSize(initW, initH, false)
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, initW / initH, 0.1, 100)
    camera.position.set(0, 0, 6.2)

    const rootGroup = new THREE.Group()
    scene.add(rootGroup)

    // Wireframe technical nodes (OctahedronGeometry + MeshBasicMaterial)
    const nodeGeometry = new THREE.OctahedronGeometry(0.16, 0)
    const accentMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentHex),
      wireframe: true,
    })
    const secondaryMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#4A5162"),
      wireframe: true,
    })

    const nodeMeshes: THREE.Mesh[] = NODE_COORDS.map(([x, y, z], index) => {
      const mat = index % 2 === 0 ? accentMaterial : secondaryMaterial
      const mesh = new THREE.Mesh(nodeGeometry, mat)
      mesh.position.set(x, y, z)
      rootGroup.add(mesh)
      return mesh
    })

    // 1px hairline edges connecting the nodes
    const edgePositions: number[] = []
    for (const [a, b] of EDGES) {
      edgePositions.push(...NODE_COORDS[a], ...NODE_COORDS[b])
    }
    const edgeGeometry = new THREE.BufferGeometry()
    edgeGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(edgePositions, 3)
    )
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#262A34"),
      transparent: true,
      opacity: 0.9,
    })
    const edgeLines = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    rootGroup.add(edgeLines)

    // Data pulses traveling along edges
    const pulseGeometry = new THREE.BoxGeometry(0.07, 0.07, 0.07)
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentHex),
    })
    const pulses = EDGES.map(([a, b], idx) => {
      const mesh = new THREE.Mesh(pulseGeometry, pulseMaterial)
      rootGroup.add(mesh)
      return {
        mesh,
        from: new THREE.Vector3(...NODE_COORDS[a]),
        to: new THREE.Vector3(...NODE_COORDS[b]),
        t: (idx / EDGES.length) % 1,
      }
    })

    // Pointer tracking (gentle rotation)
    const pointer = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 0.6
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 0.4
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    const onResize = () => {
      if (!container) return
      const w = container.clientWidth || 480
      const h = container.clientHeight || 320
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", onResize, { passive: true })

    let rafId = 0
    let lastTime = performance.now()
    const tempVec = new THREE.Vector3()
    const emeraldColor = new THREE.Color("#00E599")
    const amberColor = new THREE.Color("#F59E0B")

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate)
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const isB2B = modeRef.current === "b2b"
      const isSimulating = pipelineRef.current !== "idle"
      const targetColor = isB2B ? amberColor : emeraldColor

      accentMaterial.color.lerp(targetColor, 0.08)
      pulseMaterial.color.lerp(targetColor, 0.08)

      const baseSpeed = isSimulating ? 0.85 : isB2B ? 0.35 : 0.25

      rootGroup.rotation.y += (pointer.x - rootGroup.rotation.y) * 0.04 + dt * 0.08
      rootGroup.rotation.x += (pointer.y - rootGroup.rotation.x) * 0.04

      for (const node of nodeMeshes) {
        node.rotation.y += dt * (isSimulating ? 1.2 : 0.4)
        node.rotation.x += dt * 0.25
      }

      for (const pulse of pulses) {
        pulse.t = (pulse.t + dt * baseSpeed) % 1
        tempVec.lerpVectors(pulse.from, pulse.to, pulse.t)
        pulse.mesh.position.copy(tempVec)
      }

      renderer.render(scene, camera)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)

      // Strict GPU resource cleanup (Test 3A)
      nodeGeometry.dispose()
      accentMaterial.dispose()
      secondaryMaterial.dispose()
      edgeGeometry.dispose()
      edgeMaterial.dispose()
      pulseGeometry.dispose()
      pulseMaterial.dispose()
      renderer.dispose()

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [accentHex])

  if (useFallback) {
    return (
      <div className={`relative h-full w-full ${className}`} data-testid="hero-3d-fallback">
        <NeuralRouterSvgFallback accentHex={accentHex} />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-testid="hero-3d-canvas-host"
      className={`relative h-full w-full ${className}`}
    />
  )
}
