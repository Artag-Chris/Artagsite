"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import BookPage from "./BookPage"
import { TimelineEvent } from "./timelineData/timelineEvents"

interface BookSpreadProps {
  events: TimelineEvent[]  // Now accepts array of events
  spreadIndex: number
  isInView?: boolean
}

export default function BookSpread({ events, spreadIndex, isInView = false }: BookSpreadProps) {
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
    // Mobile: Stack events vertically
    return (
      <div
        ref={spreadRef}
        className="w-full flex flex-col relative"
      >
        {events.map((event, eventIndex) => (
          <BookPage
            key={event.id}
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
            index={spreadIndex * 2 + eventIndex}
            isVisible={isInView}
          />
        ))}
      </div>
    )
  }

  // Desktop: Two-page spread with different events
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

      {/* Left Page - First event */}
      {events[0] && (
        <div className="relative w-1/2 overflow-hidden">
          <BookPage
            side="left"
            chapterNumber={events[0].chapterNumber}
            chapterTitle={events[0].chapterTitle}
            title={events[0].title}
            description={events[0].description}
            imageUrl={events[0].imageUrl}
            imageAlt={events[0].imageAlt}
            quote={events[0].quote}
            emotionalArc={events[0].emotionalArc}
            year={events[0].year}
            index={spreadIndex * 2}
            isVisible={isInView}
          />
        </div>
      )}

      {/* Right Page - Second event (if exists) */}
      {events[1] ? (
        <div className="relative w-1/2 overflow-hidden">
          <BookPage
            side="right"
            chapterNumber={events[1].chapterNumber}
            chapterTitle={events[1].chapterTitle}
            title={events[1].title}
            description={events[1].description}
            imageUrl={events[1].imageUrl}
            imageAlt={events[1].imageAlt}
            quote={events[1].quote}
            emotionalArc={events[1].emotionalArc}
            year={events[1].year}
            index={spreadIndex * 2 + 1}
            isVisible={isInView}
          />
        </div>
      ) : (
        // Empty right page if only one event
        <div className="relative w-1/2 overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950" />
      )}
    </div>
  )
}
