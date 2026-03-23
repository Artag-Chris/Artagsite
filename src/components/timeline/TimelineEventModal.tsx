"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { TimelineEvent, timelineEvents } from "@/components/timeline/timelineData/timelineEvents"
import Image from "next/image"
import { X } from "lucide-react"

interface TimelineEventModalProps {
  event: TimelineEvent | null
  isOpen: boolean
  onClose: () => void
  onNextEvent?: () => void
  onPreviousEvent?: () => void
}

const emotionalArcColors = {
  challenge: "border-red-500/40",
  triumph: "border-amber-500/40",
  transformation: "border-purple-500/40",
  discovery: "border-blue-500/40",
}

const emotionalArcBg = {
  challenge: "from-red-500/10",
  triumph: "from-amber-500/10",
  transformation: "from-purple-500/10",
  discovery: "from-blue-500/10",
}

export default function TimelineEventModal({
  event,
  isOpen,
  onClose,
  onNextEvent,
  onPreviousEvent,
}: TimelineEventModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const currentEventIndex = event ? timelineEvents.findIndex((e) => e.id === event.id) : -1
  const hasNextEvent = currentEventIndex < timelineEvents.length - 1
  const hasPreviousEvent = currentEventIndex > 0

  useEffect(() => {
    if (!isOpen) return

    // Prevent body scroll
    document.body.style.overflow = "hidden"

    // Animate in
    if (backdropRef.current && modalRef.current) {
      gsap.set(backdropRef.current, { opacity: 0 })
      gsap.set(modalRef.current, { opacity: 0, scale: 0.95 })

      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      })

      gsap.to(modalRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        delay: 0.05,
      })
    }

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowRight" && hasNextEvent && onNextEvent) {
        onNextEvent()
      } else if (e.key === "ArrowLeft" && hasPreviousEvent && onPreviousEvent) {
        onPreviousEvent()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose, hasNextEvent, hasPreviousEvent, onNextEvent, onPreviousEvent])

  if (!isOpen || !event) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0"
      onClick={(e) => {
        if (e.target === backdropRef.current) {
          onClose()
        }
      }}
      style={{
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full h-full md:h-auto md:max-w-2xl md:max-h-[90vh] bg-gradient-to-b from-zinc-900 to-zinc-950 md:rounded-xl overflow-y-auto md:overflow-hidden flex flex-col"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-4 border-b border-zinc-800/50 bg-gradient-to-b from-zinc-900 to-zinc-900/50 backdrop-blur-sm">
          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-150 text-zinc-400 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Year indicator */}
          <div className="text-sm md:text-base font-mono text-cyan-400/70">
            {event.year}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8 space-y-8">
            {/* Hero Image */}
            {event.imageUrl && (
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden border border-zinc-700/50">
                <Image
                  src={event.imageUrl}
                  alt={event.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 400px"
                />
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${emotionalArcBg[event.emotionalArc]} to-transparent`}
                />
              </div>
            )}

            {/* Title & metadata */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                {event.title}
              </h1>

              {/* Arc badge & themes */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {/* Arc badge */}
                <span
                  className={`text-xs md:text-sm px-3 py-1 rounded-full border ${emotionalArcColors[event.emotionalArc]} text-white uppercase tracking-wider font-mono`}
                >
                  {event.emotionalArc}
                </span>

                {/* Themes */}
                {event.themes.map((theme, i) => (
                  <span
                    key={i}
                    className="text-xs md:text-sm px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Narrative sections */}
            <div className="space-y-6">
              {/* Setup */}
              <div className="bg-gradient-to-r from-zinc-800/30 to-transparent border-l-2 border-blue-400/40 p-6 rounded-lg">
                <h3 className="text-sm font-mono text-blue-400/70 uppercase tracking-widest mb-3">
                  The Setup
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {event.narrative.setup}
                </p>
              </div>

              {/* Conflict */}
              <div className="bg-gradient-to-r from-zinc-800/30 to-transparent border-l-2 border-amber-400/40 p-6 rounded-lg">
                <h3 className="text-sm font-mono text-amber-400/70 uppercase tracking-widest mb-3">
                  The Challenge
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {event.narrative.conflict}
                </p>
              </div>

              {/* Resolution */}
              <div className="bg-gradient-to-r from-zinc-800/30 to-transparent border-l-2 border-emerald-400/40 p-6 rounded-lg">
                <h3 className="text-sm font-mono text-emerald-400/70 uppercase tracking-widest mb-3">
                  The Insight
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {event.narrative.resolution}
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="border-l-4 border-cyan-400/50 pl-6 py-4 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-r-lg">
              <p className="text-lg md:text-xl text-cyan-300 italic">
                "{event.quote}"
              </p>
            </div>

            {/* Timeline visualization */}
            <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4 md:p-6">
              <p className="text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4">
                Timeline Position
              </p>
              <div className="flex items-center justify-between gap-2">
                {/* Mini timeline dots */}
                <div className="flex gap-2">
                  {timelineEvents.map((e, idx) => (
                    <div
                      key={e.id}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentEventIndex
                          ? "bg-cyan-400 w-3"
                          : "bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-3">
                Event {currentEventIndex + 1} of {timelineEvents.length}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="sticky bottom-0 border-t border-zinc-800/50 bg-gradient-to-t from-zinc-900 to-zinc-900/50 backdrop-blur-sm px-6 md:px-8 py-4 flex items-center justify-between gap-4">
          {/* Previous button */}
          <button
            onClick={onPreviousEvent}
            disabled={!hasPreviousEvent}
            className="px-4 py-2 rounded-lg border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-cyan-400/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 text-sm md:text-base"
          >
            ← Previous
          </button>

          {/* Next button */}
          <button
            onClick={onNextEvent}
            disabled={!hasNextEvent}
            className="px-4 py-2 rounded-lg border border-cyan-400/50 bg-cyan-400/5 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 text-sm md:text-base"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
