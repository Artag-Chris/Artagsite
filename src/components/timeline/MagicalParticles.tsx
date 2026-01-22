"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface MagicalParticlesProps {
  count?: number
  colors?: string[]
  duration?: number
}

export default function MagicalParticles({
  count = 12,
  colors = ["#10b981", "#fbbf24", "#a855f7", "#3b82f6", "#f43f5e"],
  duration = 8,
}: MagicalParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Generate particles
    const particles = Array.from({ length: count }, (_, i) => {
      const particle = document.createElement("div")
      const size = Math.random() * 3 + 1
      const color = colors[Math.floor(Math.random() * colors.length)]
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      const delay = Math.random() * 2

      particle.className = "absolute rounded-full"
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${startX}%;
        top: ${startY}%;
        opacity: 0.6;
        filter: blur(0.5px);
        pointer-events: none;
      `

      containerRef.current?.appendChild(particle)

      // Animate particle
      gsap.to(particle, {
        y: -Math.random() * 200 - 100,
        x: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: duration + Math.random() * 4,
        ease: "power2.inOut",
        repeat: -1,
        delay: delay,
      })

      return particle
    })

    return () => {
      particles.forEach((p) => p.remove())
    }
  }, [count, colors, duration])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 1,
        background: "transparent",
      }}
    />
  )
}
