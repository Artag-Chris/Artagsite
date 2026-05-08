"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCasesData, UseCase } from "@/data/skillsData"
import { UseCaseCard } from "./UseCaseCard"

interface UseCasesCarouselProps {
  onSelectUseCase?: (useCase: UseCase) => void
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

// rAF-driven smooth scroll with consistent easing across browsers (native
// scroll-behavior: smooth feels rigid on Windows). Cancellable via the returned function.
function animateScrollLeft(el: HTMLElement, targetLeft: number, duration = 700) {
  const startLeft = el.scrollLeft
  const distance = targetLeft - startLeft
  if (Math.abs(distance) < 1) return () => {}
  const startTime = performance.now()
  let frame = 0
  const step = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1)
    el.scrollLeft = startLeft + distance * easeOutCubic(t)
    if (t < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
  return () => cancelAnimationFrame(frame)
}

export function UseCasesCarousel({ onSelectUseCase }: UseCasesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cancelScrollRef = useRef<() => void>(() => {})

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  // First child is the padding spacer; cards start at index 1.
  const getCardEl = (index: number): HTMLElement | null => {
    const container = scrollContainerRef.current
    if (!container) return null
    return (container.children[index + 1] as HTMLElement) || null
  }

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current
    const cardEl = getCardEl(index)
    if (!container || !cardEl) return
    cancelScrollRef.current()
    const target = cardEl.offsetLeft - (container.clientWidth - cardEl.offsetWidth) / 2
    cancelScrollRef.current = animateScrollLeft(container, target, 700)
    setCurrentIndex(index)
  }

  const scroll = (direction: "left" | "right") => {
    const next = direction === "right"
      ? Math.min(currentIndex + 1, useCasesData.length - 1)
      : Math.max(currentIndex - 1, 0)
    scrollToIndex(next)
  }

  const handleDotClick = (index: number) => scrollToIndex(index)

  // Pick the card whose center is closest to the viewport center.
  const handleScroll = () => {
    checkScroll()
    const container = scrollContainerRef.current
    if (!container) return
    const center = container.scrollLeft + container.clientWidth / 2
    let bestIndex = 0
    let bestDist = Infinity
    for (let i = 0; i < useCasesData.length; i++) {
      const el = getCardEl(i)
      if (!el) continue
      const cardCenter = el.offsetLeft + el.offsetWidth / 2
      const dist = Math.abs(cardCenter - center)
      if (dist < bestDist) {
        bestDist = dist
        bestIndex = i
      }
    }
    setCurrentIndex(bestIndex)
  }

  return (
    <div className="w-full max-w-7xl mx-auto" ref={containerRef}>
      {/* Carousel Container */}
      <div className="relative group overflow-hidden rounded-xl">
        {/* Right fade gradient — elegant clip instead of hard cut */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none" />
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none" />
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 px-4 md:px-0"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onScroll={handleScroll}
        >
          {/* Hide scrollbar */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Padding start */}
          <div className="flex-shrink-0 w-4 md:w-8 lg:w-12" />

          {/* Cards */}
           {useCasesData.map((useCase, index) => (
            <UseCaseCard
              key={useCase.id}
              useCase={useCase}
              index={index}
              isCarousel={true}
              onSelect={onSelectUseCase}
            />
          ))}

          {/* Padding end */}
          <div className="flex-shrink-0 w-4 md:w-8 lg:w-12" />
        </div>

        {/* Left Arrow Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: canScrollLeft ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-500/80 hover:bg-black/80 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group-hover:opacity-100 opacity-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
        </motion.button>

        {/* Right Arrow Button */}
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: canScrollRight ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-500/80 hover:bg-black/80 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group-hover:opacity-100 opacity-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
        </motion.button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {useCasesData.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full border ${
              currentIndex === index
                ? "bg-cyan-500 border-cyan-400 w-3 h-3"
                : "bg-gray-700/40 border-gray-600/40 w-2 h-2 hover:bg-cyan-500/40 hover:border-cyan-500/40"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter - Optional */}
      <div className="flex justify-center mt-4">
        <span className="text-xs md:text-sm font-mono text-gray-500">
          {currentIndex + 1} / {useCasesData.length}
        </span>
      </div>
    </div>
  )
}
