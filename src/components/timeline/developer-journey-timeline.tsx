"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BookCover from "./BookCover"
import BookSpread from "./BookSpread"
import Epilogue from "./Epilogue"
import MagicalParticles from "./MagicalParticles"
import { timelineEvents } from "./timelineData/timelineEvents"

gsap.registerPlugin(ScrollTrigger)

export default function DeveloperJourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleSpreads, setVisibleSpreads] = useState<Set<number>>(new Set())
  const [coverComplete, setCoverComplete] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      // Update visible spreads based on scroll position
      const spreads = containerRef.current.querySelectorAll("[data-spread]")
      const newVisible = new Set<number>()

      spreads.forEach((spread) => {
        const rect = spread.getBoundingClientRect()
        const spreadIndex = parseInt(spread.getAttribute("data-spread") || "-1")
        
        // Element is visible if it's in viewport or near it
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          newVisible.add(spreadIndex)
        }
      })

      setVisibleSpreads(newVisible)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useGSAP(
    () => {
      // Add animation for CSS
      const style = document.createElement("style")
      style.textContent = `
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(1.3); opacity: 1; }
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    },
    { scope: containerRef },
  )

  return (
    <div ref={containerRef} className="relative w-full bg-zinc-950 overflow-hidden">
      {/* Magical particles background */}
      {coverComplete && (
        <MagicalParticles 
          count={15} 
          colors={["#10b981", "#fbbf24", "#a855f7", "#3b82f6", "#f43f5e"]}
          duration={10}
        />
      )}

      {/* Book Cover */}
      <div className="relative w-full">
        <BookCover onAnimationComplete={() => setCoverComplete(true)} />
      </div>

      {/* Book Spreads */}
      <div className="relative w-full">
        {timelineEvents.map((event, index) => (
          <div
            key={event.id}
            data-spread={index}
            className="w-full"
          >
            <BookSpread
              event={event}
              index={index}
              isInView={visibleSpreads.has(index)}
            />
          </div>
        ))}
      </div>

      {/* Epilogue */}
      <div
        data-spread="epilogue"
        className="w-full"
      >
        <Epilogue isVisible={visibleSpreads.has(-1)} />
      </div>
    </div>
  )
}
