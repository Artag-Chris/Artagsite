"use client"

import { motion } from "framer-motion"
import type { UseCase } from "@/data/skillsData"

interface UseCaseCardProps {
  useCase: UseCase
  index: number
  isCarousel?: boolean
  onSelect?: (useCase: UseCase) => void
}

export function UseCaseCard({ useCase, index, isCarousel = false, onSelect }: UseCaseCardProps) {
  const Icon = useCase.icon

  // Fixed size for carousel mode
  const cardWidthClass = isCarousel ? "w-[90vw] md:w-[420px] flex-shrink-0" : "w-full"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`${cardWidthClass} group h-fit`}
    >
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] hover:border-cyan-500/80 hover:from-[#0f0f0f] hover:to-[#1a1a1a]"
        onClick={() => onSelect?.(useCase)}
      >
        {/* Animated grid background overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          style={{
            backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Enhanced glow effect on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
        />

        {/* Corner accent lights */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 -mr-12 -mt-12" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/15 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -ml-8 -mb-8" />

        {/* Main content - Compact layout */}
        <div className="relative z-10 p-4 md:p-5">
          {/* Header with icon and title */}
          <div className="flex items-start gap-3 mb-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`relative p-2 rounded-lg bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#404040] group-hover:border-cyan-500/40 flex-shrink-0 transition-all duration-300`}
            >
              <Icon className={`h-5 w-5 ${useCase.iconColor} transition-transform duration-300`} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 
                className="font-bold text-base md:text-lg text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2 leading-snug" 
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {useCase.title}
              </h3>
              <p className="text-cyan-500/50 text-xs font-mono mt-0.5">Use Case</p>
            </div>
          </div>

          {/* Problem statement */}
          <div className="mb-3">
            <p className="text-gray-400 text-xs md:text-sm leading-tight line-clamp-2">{useCase.problem}</p>
          </div>

          {/* Tech Stack - First 2 items */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {useCase.techStack.slice(0, 2).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded-sm bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-300 font-medium"
                >
                  {tech}
                </span>
              ))}
              {useCase.techStack.length > 2 && (
                <span className="px-1.5 py-0.5 rounded-sm bg-gray-500/10 border border-gray-500/25 text-xs text-gray-400 font-medium">
                  +{useCase.techStack.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Primary Metric */}
          {useCase.metrics.length > 0 && (
            <div className="p-3 rounded-lg bg-black/50 border border-[#262626] group-hover:border-cyan-500/20 transition-colors duration-300">
              <p className="text-cyan-400 font-bold text-base">{useCase.metrics[0].value}</p>
              <p className="text-gray-500 text-xs mt-1">{useCase.metrics[0].label}</p>
            </div>
          )}

          {/* Subtle "Click for details" hint */}
          <p className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors mt-3 text-center">
            Click to view details →
          </p>
        </div>
      </div>
    </motion.div>
  )
}
