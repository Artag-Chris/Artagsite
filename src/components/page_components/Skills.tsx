"use client"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useInViewOnReady } from "@/hooks/useInViewOnReady"
import { UseCasesCarousel } from "../sub-sections/UseCasesCarousel"
import { UseCaseModal } from "../sub-sections/UseCaseModal"
import { ToolsShowcase } from "../sub-sections/ToolsShowcase"
import { GeometricBackground } from "../compontents/GeometricBackground"
import { UseCase } from "@/data/skillsData"

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
}

const headerItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null)
  const { ref: headerInViewRef, isReady: headerReady } = useInViewOnReady<HTMLDivElement>({ amount: 0.3 })

  return (
    <div>
      <section id="skills" className="bg-gradient-to-b from-black via-black to-[#0a0a0a] py-16 sm:py-32 relative overflow-hidden w-screen -mx-[calc((100vw-100%)/2)]" ref={sectionRef}>
        {/* Animated background grid - more prominent */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Enhanced background glows with animation */}
        <div className="absolute top-20 right-1/4 w-1/2 h-1/2 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2/5 h-2/5 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-cyan-600/4 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>

        {/* Content - Full Width */}
        <div className="w-full relative z-10">
          {/* Header Section with enhanced typography */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
            <motion.div
              ref={headerInViewRef}
              className="space-y-4 sm:space-y-6"
              variants={headerContainer}
              initial="hidden"
              animate={headerReady ? "visible" : "hidden"}
            >
              <motion.div className="inline-block" variants={headerItem}>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-500/70 bg-cyan-500/10 border border-cyan-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
                  Architecture & Automation
                </span>
              </motion.div>
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
                variants={headerItem}
              >
                What I <span className='text-cyan-400 drop-shadow-lg' style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>Build</span>
              </motion.h2>
              <motion.p
                className="text-gray-300 text-base sm:text-lg max-w-4xl leading-relaxed"
                variants={headerItem}
              >
                Here are the real problems I solve. Each expertise area represents years of hands-on experience building scalable systems, automating workflows, and delivering measurable results. Scroll through to explore the technical depth and specific capabilities.
              </motion.p>
            </motion.div>
          </div>

          {/* Use Cases Carousel */}
          <div className="w-full px-0 sm:px-0 mb-12 sm:mb-16">
            <UseCasesCarousel onSelectUseCase={setSelectedUseCase} />
          </div>

          {/* Tools Showcase Section */}
          <div className="mt-16 sm:mt-24 w-full px-4 sm:px-6 lg:px-8 border-t border-[#262626]">
            <div className="max-w-6xl mx-auto py-12 sm:py-16">
              <ToolsShowcase showLabel={true} />
            </div>
          </div>

          {/* Bottom accent element */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Use Case Modal */}
      {selectedUseCase && (
        <UseCaseModal
          useCase={selectedUseCase}
          isOpen={!!selectedUseCase}
          onClose={() => setSelectedUseCase(null)}
        />
      )}
    </div>
  )
}

export default Skills
