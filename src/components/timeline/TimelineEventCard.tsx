"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { TimelineEvent } from "@/components/timeline/timelineData/timelineEvents"
import Image from "next/image"

interface TimelineEventCardProps {
  event: TimelineEvent
  index: number
  onClick: () => void
  isVisible?: boolean
}

const emotionalArcColors = {
  challenge: "border-red-500/60 bg-red-500/5",
  triumph: "border-amber-500/60 bg-amber-500/5",
  transformation: "border-purple-500/60 bg-purple-500/5",
  discovery: "border-blue-500/60 bg-blue-500/5",
}

const emotionalArcBorderOnly = {
  challenge: "border-l-4 border-red-500",
  triumph: "border-l-4 border-amber-500",
  transformation: "border-l-4 border-purple-500",
  discovery: "border-l-4 border-blue-500",
}

export default function TimelineEventCard({
  event,
  index,
  onClick,
  isVisible = false,
}: TimelineEventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return

    if (isVisible) {
      // Staggered entrance animation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: index * 0.1,
        },
      )
    }
  }, [isVisible, index])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${emotionalArcBorderOnly[event.emotionalArc]} relative w-full p-6 rounded-lg bg-gradient-to-r from-zinc-900/50 to-transparent backdrop-blur-sm cursor-pointer transition-all duration-150 ease-out hover:scale-105 hover:from-zinc-800/50 group`}
      style={{
        minHeight: '160px',
      }}
    >
      {/* Subtle background image overlay */}
      {event.imageUrl && (
        <div className="absolute inset-0 rounded-lg overflow-hidden opacity-5 group-hover:opacity-10 transition-opacity duration-150">
          <Image
            src={event.imageUrl}
            alt={event.imageAlt}
            fill
            className="object-cover blur-sm"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header */}
        <div>
          {/* Year */}
          <div className="text-sm md:text-base font-mono text-cyan-400/70 mb-2">
            {event.year}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight transition-colors duration-150 group-hover:text-cyan-300">
            {event.title}
          </h3>

          {/* Description preview */}
          <p className="text-sm md:text-base text-gray-400 line-clamp-2 mb-4">
            {event.description}
          </p>
        </div>

        {/* Expanded preview (on hover) */}
        {isHovered && (
          <div className="space-y-3 pt-4 border-t border-zinc-700/30">
            {/* Quote */}
            <div className="text-sm text-amber-300/80 italic">
              "{event.quote}"
            </div>

            {/* Themes */}
            <div className="flex flex-wrap gap-2">
              {event.themes.slice(0, 2).map((theme, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                >
                  {theme}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="text-sm text-cyan-400 font-medium flex items-center gap-1 pt-2">
              Read full story →
            </div>
          </div>
        )}

        {/* Fallback CTA when not hovering */}
        {!isHovered && (
          <div className="text-sm text-cyan-400/60 font-medium">
            › Click for story
          </div>
        )}
      </div>
    </div>
  )
}
