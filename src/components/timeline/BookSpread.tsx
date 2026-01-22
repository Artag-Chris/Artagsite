"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import BookPage from "./BookPage"
import { TimelineEvent } from "./timelineData/timelineEvents"

interface BookSpreadProps {
  event: TimelineEvent
  index: number
  isInView?: boolean
}

export default function BookSpread({ event, index, isInView = false }: BookSpreadProps) {
  const spreadRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!spreadRef.current || !isInView) return

    // Add subtle glow effect when page comes into view
    gsap.to(spreadRef.current, {
      boxShadow: "inset 0 0 60px rgba(16, 185, 129, 0.1)",
      duration: 0.8,
      ease: "power2.out",
    })
  }, [isInView])

  if (isMobile) {
    // Mobile: Single column layout
    return (
      <div
        ref={spreadRef}
        className="w-full min-h-screen flex flex-col relative"
      >
        <BookPage
          side="left"
          chapterNumber={event.chapterNumber}
          chapterTitle={event.chapterTitle}
          title={event.title}
          description={event.description}
          imageUrl={event.imageUrl}
          imageAlt={event.imageAlt}
          quote={event.quote}
          emotionalArc={event.emotionalArc}
          year={event.year}
          index={index}
          isVisible={isInView}
        />
      </div>
    )
  }

  // Desktop: Two-page spread (left and right)
  return (
    <div
      ref={spreadRef}
      className="w-full min-h-screen flex relative"
      style={{
        perspective: "1200px",
        background: "linear-gradient(to bottom, #18181b, #09090b)",
      }}
    >
      {/* Left page background */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 border-r border-zinc-800/30" />

      {/* Right page background */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 border-l border-zinc-800/30" />

      {/* Left Page */}
      <div className="relative w-1/2 overflow-hidden">
        <BookPage
          side="left"
          chapterNumber={event.chapterNumber}
          chapterTitle={event.chapterTitle}
          title={event.title}
          description={event.description}
          imageUrl={event.imageUrl}
          imageAlt={event.imageAlt}
          quote={event.quote}
          emotionalArc={event.emotionalArc}
          year={event.year}
          index={index * 2}
          isVisible={isInView}
        />
      </div>

      {/* Right Page (duplicate with some variation) */}
      <div className="relative w-1/2 overflow-hidden">
        <BookPage
          side="right"
          chapterNumber={event.chapterNumber}
          chapterTitle={event.chapterTitle}
          title={event.title}
          description={event.description}
          imageUrl={event.imageUrl}
          imageAlt={event.imageAlt}
          quote={event.quote}
          emotionalArc={event.emotionalArc}
          year={event.year}
          index={index * 2 + 1}
          isVisible={isInView}
        />
      </div>
    </div>
  )
}
