"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { Sparkles } from "lucide-react"

interface EpilogueProps {
  isVisible?: boolean
}

export default function Epilogue({ isVisible = false }: EpilogueProps) {
  const epilogueRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!epilogueRef.current || !contentRef.current) return

    if (isVisible) {
      // Page turn animation
      gsap.fromTo(
        epilogueRef.current,
        {
          rotationX: 90,
          opacity: 0,
        },
        {
          rotationX: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      )

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.4,
        },
      )
    }
  }, [isVisible])

  return (
    <div
      ref={epilogueRef}
      className="relative w-full min-h-screen flex items-center justify-center px-4 py-12 md:py-20 bg-gradient-to-b from-zinc-900 to-zinc-950"
      style={{ perspective: "1200px" }}
    >
      {/* Decorative background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Ornamental corner frames */}
      <div className="absolute top-4 left-4 w-8 h-8 md:w-12 md:h-12 border-2 border-amber-400/30 rounded-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 md:w-12 md:h-12 border-2 border-amber-400/30 rounded-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 md:w-12 md:h-12 border-2 border-amber-400/30 rounded-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 md:w-12 md:h-12 border-2 border-amber-400/30 rounded-lg" />

      {/* Page number */}
      <div className="absolute top-6 md:top-8 right-6 md:right-8 text-zinc-500 text-xs md:text-sm font-serif">
        Epilogue
      </div>

      {/* Main content */}
      <div ref={contentRef} className="relative z-10 max-w-xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-emerald-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">
          The Journey Continues
        </h2>

        {/* Main message */}
        <p className="text-lg md:text-xl text-zinc-300 mb-8 font-serif leading-relaxed">
          This story is not an ending, but a chapter in a much larger narrative. Every day brings new challenges to overcome, new skills to master, and new opportunities to make a meaningful impact.
        </p>

        {/* Quote */}
        <div className="border-l-4 border-amber-400/50 pl-6 py-4 my-8 bg-gradient-to-r from-amber-500/5 to-transparent">
          <p className="text-base md:text-lg text-amber-300/80 italic font-serif">
            "The story is still being written, each line a new chapter of growth, each page a fresh beginning."
          </p>
        </div>

        {/* Reflective message */}
        <p className="text-sm md:text-base text-zinc-400 font-serif leading-relaxed mb-8">
          I'm committed to continuous learning, deeper skill mastery, and leveraging technology to create positive change. Whether through mentoring others, building innovative solutions, or supporting my family, the best chapters are yet to come.
        </p>

        {/* Call to action */}
        <div className="mt-12 flex flex-col gap-4">
          <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-widest font-serif">
            Stay tuned for the next chapter
          </p>
          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-3 bg-emerald-400 rounded-full opacity-60"
                style={{
                  animation: `pulse 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative separator at bottom */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
      </div>
    </div>
  )
}
