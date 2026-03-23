"use client"

import { useRef, useState } from "react"
import TimelineHero from "./TimelineHero"
import TimelineExplorer from "./TimelineExplorer"
import TimelineEventModal from "./TimelineEventModal"
import TimelineReflection from "./TimelineReflection"
import { timelineEvents, TimelineEvent } from "./timelineData/timelineEvents"

export default function DeveloperJourneyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  const currentEventIndex = selectedEvent 
    ? timelineEvents.findIndex((e) => e.id === selectedEvent.id) 
    : -1

  const handleNextEvent = () => {
    if (currentEventIndex < timelineEvents.length - 1) {
      setSelectedEvent(timelineEvents[currentEventIndex + 1])
    }
  }

  const handlePreviousEvent = () => {
    if (currentEventIndex > 0) {
      setSelectedEvent(timelineEvents[currentEventIndex - 1])
    }
  }

  const yearStart = timelineEvents[0]?.year || "2006"
  const yearEnd = timelineEvents[timelineEvents.length - 1]?.year || "2024"

  return (
    <div ref={containerRef} className="relative w-full bg-zinc-950 overflow-hidden">
      {/* Hero Section */}
      <TimelineHero 
        eventCount={timelineEvents.length}
        yearStart={yearStart}
        yearEnd={yearEnd}
      />

      {/* Timeline Explorer */}
      <TimelineExplorer onSelectEvent={setSelectedEvent} />

      {/* Event Modal */}
      <TimelineEventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onNextEvent={handleNextEvent}
        onPreviousEvent={handlePreviousEvent}
      />

      {/* Reflection Section */}
      <TimelineReflection />
    </div>
  )
}
