"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import Link from "next/link"

export default function TimelineReflection() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // Fade in on mount
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
    )
  }, [])

  return (
    <div className="relative w-full py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle glow effect */}
      <div className="absolute -top-20 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Title */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight"
          style={{
            fontFamily: 'var(--font-display)',
            textShadow: '0 0 20px rgba(6, 182, 212, 0.2)',
          }}
        >
          The Journey <span className="text-cyan-400">Continues</span>
        </h2>

        {/* Main reflection */}
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 md:mb-10">
          This is not an ending, but a chapter in a much larger story. Every day brings new challenges to overcome, new skills to master, and new opportunities to make a meaningful impact.
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mb-8 md:mb-10" />

        {/* Key themes */}
        <div className="mb-12">
          <p className="text-sm font-mono text-cyan-400/70 uppercase tracking-widest mb-6">
            Guiding Principles
          </p>
          <ul className="space-y-3 text-left md:text-center max-w-xl mx-auto">
            <li className="flex items-start md:items-center gap-3">
              <span className="text-cyan-400 mt-1 md:mt-0">▪</span>
              <span className="text-gray-400">
                <strong className="text-white">Resilience through adversity</strong> — Every challenge is an opportunity to grow stronger
              </span>
            </li>
            <li className="flex items-start md:items-center gap-3">
              <span className="text-cyan-400 mt-1 md:mt-0">▪</span>
              <span className="text-gray-400">
                <strong className="text-white">Growth driven by purpose</strong> — Clear purpose transforms struggle into progress
              </span>
            </li>
            <li className="flex items-start md:items-center gap-3">
              <span className="text-cyan-400 mt-1 md:mt-0">▪</span>
              <span className="text-gray-400">
                <strong className="text-white">Continuous learning as path</strong> — Mastery requires dedication, curiosity, and humility
              </span>
            </li>
          </ul>
        </div>

        {/* Closing statement */}
        <p className="text-base md:text-lg text-gray-400 italic mb-12 md:mb-16 leading-relaxed">
          I'm committed to continuous learning, deeper skill mastery, and leveraging technology to create positive change. Whether through mentoring others, building innovative solutions, or supporting my family—the best chapters are yet to come.
        </p>

        {/* CTA Section */}
        <div className="space-y-6">
          <div>
            <p className="text-xs md:text-sm font-mono text-cyan-400/70 uppercase tracking-widest mb-6">
              What's Next?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#skills"
                className="px-6 py-3 rounded-lg border border-cyan-400/50 bg-cyan-400/5 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/80 transition-all duration-150 font-medium text-sm md:text-base"
              >
                Explore My Work
              </Link>
              <Link
                href="/#contact"
                className="px-6 py-3 rounded-lg border border-zinc-600 text-white hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-150 font-medium text-sm md:text-base"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Closing accent */}
        <div className="mt-12 md:mt-16 pt-12 md:pt-16 border-t border-zinc-800/50">
          <p className="text-xs md:text-sm text-zinc-600 font-mono">
            "The story is still being written, each line a new chapter of growth, each page a fresh beginning."
          </p>
        </div>
      </div>
    </div>
  )
}
