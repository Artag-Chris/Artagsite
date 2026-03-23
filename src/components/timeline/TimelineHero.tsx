"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface TimelineHeroProps {
  eventCount: number
  yearStart: string
  yearEnd: string
}

export default function TimelineHero({ eventCount, yearStart, yearEnd }: TimelineHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return

    // Initial state
    gsap.set(contentRef.current, {
      opacity: 0,
      y: 30,
    })

    // Animate in
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    })
  }, [])

  const totalYears = parseInt(yearEnd) - parseInt(yearStart) + 1

  return (
    <div
      ref={heroRef}
      className="relative w-full py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            textShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
            color: '#ffffff',
          }}
        >
          The Architect's <span className="text-cyan-400">Ledger</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 mb-8 md:mb-10 leading-relaxed max-w-2xl">
          A journey from uncertainty to mastery. Seven transformative milestones that shaped who I am today.
        </p>

        {/* Divider line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mb-8 md:mb-10" />

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row gap-8 md:gap-12">
          <div>
            <div className="text-sm font-mono text-cyan-400/70 uppercase tracking-widest mb-2">
              Time Span
            </div>
            <p className="text-xl md:text-2xl font-mono text-white">
              {yearStart} — {yearEnd}
            </p>
            <p className="text-xs md:text-sm text-zinc-500 mt-1">
              {totalYears} years of growth
            </p>
          </div>

          <div>
            <div className="text-sm font-mono text-cyan-400/70 uppercase tracking-widest mb-2">
              Milestones
            </div>
            <p className="text-xl md:text-2xl font-mono text-white">
              {eventCount} chapters
            </p>
            <p className="text-xs md:text-sm text-zinc-500 mt-1">
              Major life events
            </p>
          </div>

          <div>
            <div className="text-sm font-mono text-cyan-400/70 uppercase tracking-widest mb-2">
              Emotional Arcs
            </div>
            <p className="text-xl md:text-2xl font-mono text-white">
              4 themes
            </p>
            <p className="text-xs md:text-sm text-zinc-500 mt-1">
              Challenge, Triumph, Transformation, Discovery
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
