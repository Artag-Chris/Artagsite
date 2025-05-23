"use client"

import React, { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { projectsData } from "@/data/proyectData"
import { ProjectPopup } from "../sub-sections/Propyect-PopUp"
import GlowProjectCard from "@/components/compontents/GlowProyectCard";



function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = !useMediaQuery("(min-width: 768px)")
  const carouselRef = useRef(null)


  const getItemsPerSlide = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3 // lg
      if (window.innerWidth >= 768) return 2 // md
      return 1 // mobile
    }
    return 3 // Default for SSR
  }

  const itemsPerSlide = getItemsPerSlide()
  const totalSlides = Math.ceil(projectsData.length / itemsPerSlide)

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const handleHover = (index: number, isHovered: boolean, event: React.MouseEvent<HTMLDivElement> | null) => {
    if (isHovered) {
      setHoveredIndex(index)
      if (event) {
        const rect = event.currentTarget.getBoundingClientRect()
        setPopupPosition({
          x: rect.left + rect.width / 2,
          y: window.scrollY + rect.top,
        })
      }
    } else {
      setHoveredIndex(null)
    }
  }

  // Calculate which projects to show in the current slide
  const startIndex = currentIndex * itemsPerSlide
  const visibleProjects = projectsData.slice(startIndex, startIndex + itemsPerSlide)

  return (
    <div>
      
      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Featured <span className="text-emerald-500">Projects</span>
          </h2>

          <div ref={carouselRef} className="relative">
            {/* Carousel Navigation */}
            <div className="flex justify-between absolute -top-16 right-0 space-x-2">
              <button
                onClick={handlePrevSlide}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 text-zinc-400" />
              </button>
              <button
                onClick={handleNextSlide}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 text-zinc-400" />
              </button>
              <div className="flex items-center space-x-1 ml-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      currentIndex === index ? "bg-emerald-500" : "bg-zinc-700"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Carousel Content */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {visibleProjects.map((project, index) => (
                  <motion.div
                    key={startIndex + index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onMouseEnter={(e) => handleHover(startIndex + index, true, e)}
                    onMouseLeave={() => handleHover(startIndex + index, false, null)}
                  >
                    <GlowProjectCard
                        project={project}
                        index={startIndex + index}
                        onHover={(isHovered: boolean) =>
                            handleHover(startIndex + index, isHovered, null)
                        }
                        isHovered={hoveredIndex === startIndex + index}
                    />

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Popup that appears on hover (not on mobile) */}
            {!isMobile && hoveredIndex !== null && (
              <ProjectPopup
                project={projectsData[hoveredIndex]}
                isVisible={true}
                position={popupPosition}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects
