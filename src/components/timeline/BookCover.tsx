"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { BookOpen } from "lucide-react"

interface BookCoverProps {
  onAnimationComplete?: () => void
}

export default function BookCover({ onAnimationComplete }: BookCoverProps) {
  const coverRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!coverRef.current || !contentRef.current) return

    // Create initial state for cover (hidden behind book)
    gsap.set(coverRef.current, {
      rotationX: -90,
      opacity: 0,
    })

    gsap.set(contentRef.current, {
      opacity: 0,
      y: 30,
    })

    // Animate cover opening (3D page turn effect)
    const tl = gsap.timeline()

    // First: Cover rotates and appears
    tl.to(
      coverRef.current,
      {
        rotationX: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.inOut",
      },
      0,
    )

    // Then: Content fades in
    tl.to(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      0.5,
    )

    // Add optional callback when animation completes
    if (onAnimationComplete) {
      tl.call(onAnimationComplete)
    }
  }, [onAnimationComplete])

  return (
    <div
      ref={coverRef}
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-gradient-to-br from-zinc-900 via-emerald-900/20 to-zinc-900 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Decorative background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Ornamental frame (top-left corner) */}
      <div className="absolute top-8 left-8 w-16 h-16 border-2 border-amber-400/40 rounded-lg opacity-50" />

      {/* Ornamental frame (bottom-right corner) */}
      <div className="absolute bottom-8 right-8 w-16 h-16 border-2 border-amber-400/40 rounded-lg opacity-50" />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center max-w-2xl px-8 md:px-12"
      >
        {/* Book icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <BookOpen className="w-16 h-16 md:w-20 md:h-20 text-emerald-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-white">
          My Story
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-emerald-300 mb-8 font-serif italic">
          A Tale of Growth & Purpose
        </p>

        {/* Quote */}
        <p className="text-lg md:text-xl text-amber-300/80 mb-12 font-serif italic leading-relaxed">
          "From uncertain beginnings to breakthrough success,
          <br />
          every chapter is a lesson in resilience."
        </p>

        {/* Scroll hint */}
        <div className="flex flex-col items-center gap-2 mt-16">
          <p className="text-sm md:text-base text-zinc-400 font-light">Scroll to open the book</p>
          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-4 bg-emerald-400 rounded-full opacity-60"
                style={{
                  animation: `pulse 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Page number (front cover) */}
      <div className="absolute bottom-8 left-8 text-zinc-500 text-sm font-serif">
        Cover
      </div>
    </div>
  )
}
