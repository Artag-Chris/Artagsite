"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { UseCase } from "@/data/skillsData"
import { UseCaseCard } from "./UseCaseCard"

interface UseCasesCarouselProps {
  useCases: UseCase[]
  onSelectUseCase?: (useCase: UseCase) => void
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function animateScrollLeft(el: HTMLElement, targetLeft: number, duration = 600) {
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

export function UseCasesCarousel({ useCases, onSelectUseCase }: UseCasesCarouselProps) {
  const t = useTranslations("skills.carousel")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cancelScrollRef = useRef<() => void>(() => {})

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [checkScroll])

  useEffect(() => {
    setCurrentIndex(0)
    setCanScrollLeft(false)
    setCanScrollRight(true)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0
    }
  }, [useCases])

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
    cancelScrollRef.current = animateScrollLeft(container, target, 600)
    setCurrentIndex(index)
  }

  const scroll = (direction: "left" | "right") => {
    const next = direction === "right"
      ? Math.min(currentIndex + 1, useCases.length - 1)
      : Math.max(currentIndex - 1, 0)
    scrollToIndex(next)
  }

  const handleScroll = useCallback(() => {
    checkScroll()
    const container = scrollContainerRef.current
    if (!container) return
    const center = container.scrollLeft + container.clientWidth / 2
    let bestIndex = 0
    let bestDist = Infinity
    for (let i = 0; i < useCases.length; i++) {
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
  }, [checkScroll, useCases.length])

  const progress = useCases.length > 1 ? currentIndex / (useCases.length - 1) : 0

  return (
    <div className="w-full">
      <div className="relative max-w-7xl mx-auto">
        {/* Carousel Container */}
        <div className="relative group">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 h-full w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 px-6 sm:px-10 lg:px-16"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onScroll={handleScroll}
          >
            <style>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {useCases.map((useCase, index) => (
              <UseCaseCard
                key={useCase.id}
                useCase={useCase}
                index={index}
                isCarousel={true}
                onSelect={onSelectUseCase}
              />
            ))}
          </div>
        </div>

        {/* Navigation — below carousel */}
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 mt-6">
          {/* Arrow buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-2.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t("scrollLeft")}
            >
              <ChevronLeft className="w-4 h-4 text-zinc-400" />
            </motion.button>
            <motion.button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-2.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t("scrollRight")}
            >
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </motion.button>
          </div>

          {/* Progress bar */}
          <div className="flex-1 max-w-[200px] mx-4 sm:mx-8">
            <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                animate={{ width: `${(1 / useCases.length) * 100}%` }}
                style={{ marginLeft: `${progress * (100 - (100 / useCases.length))}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* Counter */}
          <span className="text-xs font-mono text-zinc-600 tabular-nums">
            {String(currentIndex + 1).padStart(2, "0")} / {String(useCases.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}
