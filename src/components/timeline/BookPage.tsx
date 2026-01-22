"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"

interface BookPageProps {
  side: "left" | "right"
  chapterNumber: number
  chapterTitle: string
  title: string
  description: string
  imageUrl?: string
  imageAlt?: string
  quote: string
  emotionalArc: "challenge" | "triumph" | "transformation" | "discovery"
  year: string
  index: number
  isVisible?: boolean
}

const emotionalArcColors = {
  challenge: "from-red-500/20 to-transparent",
  triumph: "from-gold-500/20 to-transparent",
  transformation: "from-purple-500/20 to-transparent",
  discovery: "from-blue-500/20 to-transparent",
}

const emotionalArcBorder = {
  challenge: "border-red-400/30",
  triumph: "border-amber-400/30",
  transformation: "border-purple-400/30",
  discovery: "border-blue-400/30",
}

export default function BookPage({
  side,
  chapterNumber,
  chapterTitle,
  title,
  description,
  imageUrl,
  imageAlt,
  quote,
  emotionalArc,
  year,
  index,
  isVisible = false,
}: BookPageProps) {
  const pageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pageRef.current || !contentRef.current) return

    if (isVisible) {
      // Page turn animation
      gsap.fromTo(
        pageRef.current,
        {
          rotationY: side === "left" ? -90 : 90,
          opacity: 0,
        },
        {
          rotationY: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      )

      // Content fade in after page turn
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 20,
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
  }, [isVisible, side])

  return (
    <div
      ref={pageRef}
      className={`relative w-full h-full min-h-screen flex items-center justify-center px-4 py-12 md:py-20 ${
        side === "left" ? "md:pr-0 md:pl-4" : "md:pl-0 md:pr-4"
      }`}
      style={{ perspective: "1200px" }}
    >
      {/* Page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950" />

      {/* Page number */}
      <div className={`absolute top-6 md:top-8 text-zinc-500 text-xs md:text-sm font-serif ${
        side === "left" ? "left-6 md:left-8" : "right-6 md:right-8"
      }`}>
        {2 * index + (side === "left" ? 1 : 2)}
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-md md:max-w-lg"
      >
        {/* Chapter number and title */}
        <div className="mb-6 md:mb-8">
          <div className="inline-block mb-2">
            <span className="text-6xl md:text-7xl font-serif font-bold text-amber-400/60">
              {String(chapterNumber).padStart(2, "0")}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-emerald-300 mb-2">
            {chapterTitle}
          </h2>
          <p className="text-sm text-zinc-500 font-serif">{year}</p>
        </div>

        {/* Emotional arc indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`w-2 h-8 rounded-full ${
            emotionalArc === "challenge" ? "bg-red-400/60" :
            emotionalArc === "triumph" ? "bg-amber-400/60" :
            emotionalArc === "transformation" ? "bg-purple-400/60" :
            "bg-blue-400/60"
          }`} />
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-serif">
            {emotionalArc}
          </span>
        </div>

        {/* Main title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-serif">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-6 md:mb-8 font-serif">
          {description}
        </p>

        {/* Quote */}
        <div className={`border-l-4 border-amber-400/50 pl-4 py-3 mb-6 md:mb-8 bg-gradient-to-r from-amber-500/5 to-transparent ${emotionalArcBorder[emotionalArc]}`}>
          <p className="text-sm md:text-base text-amber-300/80 italic font-serif">
            "{quote}"
          </p>
        </div>

        {/* Image if provided */}
        {imageUrl && (
          <div className={`relative h-40 md:h-56 rounded-lg overflow-hidden mb-6 md:mb-8 border-2 ${emotionalArcBorder[emotionalArc]} shadow-xl`}>
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${emotionalArcColors[emotionalArc]}`} />
          </div>
        )}

        {/* Decorative separator */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </div>
      </div>
    </div>
  )
}
