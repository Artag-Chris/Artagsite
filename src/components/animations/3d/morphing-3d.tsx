"use client"

import { useEffect, useState } from "react"
import Element3D from "./3d-element"
import "./morphing-3d.css"

interface ColorScheme {
  name: string
  border: string
  background: string
  text: string
  glow: string
  particle: string
  particleGlow: string
}

interface Shape {
  name: string
  component: React.ReactNode
}

const colorSchemes: ColorScheme[] = [
  {
    name: "amber",
    border: "rgba(251, 146, 60, 0.6)",
    background: "rgba(251, 146, 60, 0.05)",
    text: "#fb923c",
    glow: "rgba(251, 146, 60, 0.8)",
    particle: "radial-gradient(circle, #fbbf24, #fb923c)",
    particleGlow: "rgba(251, 146, 60, 0.8)",
  },
  {
    name: "cyan",
    border: "rgba(0, 217, 255, 0.6)",
    background: "rgba(0, 217, 255, 0.05)",
    text: "#00d9ff",
    glow: "rgba(0, 217, 255, 0.8)",
    particle: "radial-gradient(circle, #00ffff, #00d9ff)",
    particleGlow: "rgba(0, 217, 255, 0.8)",
  },
  {
    name: "purple",
    border: "rgba(168, 85, 247, 0.6)",
    background: "rgba(168, 85, 247, 0.05)",
    text: "#a855f7",
    glow: "rgba(168, 85, 247, 0.8)",
    particle: "radial-gradient(circle, #d8b4fe, #a855f7)",
    particleGlow: "rgba(168, 85, 247, 0.8)",
  },
  {
    name: "pink",
    border: "rgba(236, 72, 153, 0.6)",
    background: "rgba(236, 72, 153, 0.05)",
    text: "#ec4899",
    glow: "rgba(236, 72, 153, 0.8)",
    particle: "radial-gradient(circle, #f472b6, #ec4899)",
    particleGlow: "rgba(236, 72, 153, 0.8)",
  },
  {
    name: "green",
    border: "rgba(34, 197, 94, 0.6)",
    background: "rgba(34, 197, 94, 0.05)",
    text: "#22c55e",
    glow: "rgba(34, 197, 94, 0.8)",
    particle: "radial-gradient(circle, #86efac, #22c55e)",
    particleGlow: "rgba(34, 197, 94, 0.8)",
  },
]

/**
 * Componente 3D que cambia de colores y formas cada X segundos
 * @param colorChangeInterval - Intervalo en ms para cambiar color (default: 5000)
 * @param shapeChangeInterval - Intervalo en ms para cambiar forma (default: 8000)
 */
export default function Morphing3D({
  colorChangeInterval = 5000,
  shapeChangeInterval = 8000,
}: {
  colorChangeInterval?: number
  shapeChangeInterval?: number
}) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const currentColor = colorSchemes[currentColorIndex]

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Color change effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colorSchemes.length)
    }, colorChangeInterval)

    return () => clearInterval(interval)
  }, [colorChangeInterval])

  // Shape change effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShapeIndex((prev) => (prev + 1) % 3) // 0: cube, 1: sphere, 2: pyramid
    }, shapeChangeInterval)

    return () => clearInterval(interval)
  }, [shapeChangeInterval])

  if (!isClient) return null

  const renderShape = () => {
    switch (currentShapeIndex) {
      case 0: // Cube
        return (
          <div className="cube" style={{ "--color-border": currentColor.border } as React.CSSProperties}>
            <div className="cube-face front" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">const innovation</div>
                <div className="code-line">= "reality"</div>
              </div>
            </div>
            <div className="cube-face back" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">function create()</div>
                <div className="code-line">{"{ magic(); }"}</div>
              </div>
            </div>
            <div className="cube-face right" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">build()</div>
                <div className="code-line">deploy()</div>
              </div>
            </div>
            <div className="cube-face left" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">design()</div>
                <div className="code-line">iterate()</div>
              </div>
            </div>
            <div className="cube-face top" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">// Tech Stack</div>
              </div>
            </div>
            <div className="cube-face bottom" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">// Full Stack</div>
              </div>
            </div>
          </div>
        )

      case 1: // Sphere
        return (
          <div className="sphere-morphing" style={{ "--color-border": currentColor.border, "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
            <div className="sphere-inner">
              <div className="sphere-text">3D</div>
            </div>
          </div>
        )

      case 2: // Pyramid
        return (
          <div className="pyramid" style={{ "--color-border": currentColor.border } as React.CSSProperties}>
            <div className="pyramid-face front" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">Build</div>
              </div>
            </div>
            <div className="pyramid-face back" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">Create</div>
              </div>
            </div>
            <div className="pyramid-face left" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">Design</div>
              </div>
            </div>
            <div className="pyramid-face right" style={{ "--color-text": currentColor.text, "--color-glow": currentColor.glow } as React.CSSProperties}>
              <div className="face-content">
                <div className="code-line">Deploy</div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Element3D animationDuration={20}>
      <div className="morphing-container" style={{ "--transition-color": currentColor.border } as React.CSSProperties}>
        {renderShape()}
      </div>
    </Element3D>
  )
}
