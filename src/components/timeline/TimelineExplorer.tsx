"use client"

import { useState, useEffect, useRef } from "react"
import { timelineEvents, TimelineEvent } from "@/components/timeline/timelineData/timelineEvents"
import TimelineEventCard from "./TimelineEventCard"

interface TimelineExplorerProps {
  onSelectEvent: (event: TimelineEvent) => void
}

export default function TimelineExplorer({ onSelectEvent }: TimelineExplorerProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisible = new Set(visibleCards)
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute("data-index") || "-1")
          if (entry.isIntersecting) {
            newVisible.add(index)
          }
        })
        setVisibleCards(newVisible)
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    if (containerRef.current) {
      containerRef.current.querySelectorAll("[data-index]").forEach((el) => {
        observer.observe(el)
      })
    }

    return () => observer.disconnect()
  }, [visibleCards])

  return (
    <div ref={containerRef} className="relative w-full py-12 md:py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Timeline container */}
        <div className="space-y-6 md:space-y-8">
          {/* Vertical connector line - Only visible on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-cyan-400/10 to-transparent" />

          {/* Events grid */}
          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              data-index={index}
              className="relative"
            >
              <TimelineEventCard
                event={event}
                index={index}
                onClick={() => onSelectEvent(event)}
                isVisible={visibleCards.has(index)}
              />
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-16 md:mt-20 pt-12 border-t border-zinc-800/50">
          <div className="text-center">
            <p className="text-sm md:text-base text-zinc-500 font-mono">
              End of chapter
            </p>
            <p className="text-xs text-zinc-600 mt-2">
              {timelineEvents.length} milestones documented
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
