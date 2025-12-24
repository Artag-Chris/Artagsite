"use client"

import { useEffect, useState, ReactNode } from "react"
import "./3d-element.css"

interface Element3DProps {
  children: ReactNode
  className?: string
  animationDuration?: number
}

/**
 * Componente reutilizable para renderizar elementos 3D con rotación
 * Puedes pasar cualquier contenido como children
 */
export default function Element3D({ children, className = "", animationDuration = 20 }: Element3DProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className={`element-3d-container ${className}`} style={{ "--animation-duration": `${animationDuration}s` } as React.CSSProperties}>
      <div className="element-3d">{children}</div>

      {/* Floating particles */}
      <div className="particles-3d">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle-3d" style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties} />
        ))}
      </div>
    </div>
  )
}
