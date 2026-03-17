"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { UseCase } from "@/data/skillsData"

interface UseCaseCardProps {
  useCase: UseCase
  index: number
  isCarousel?: boolean
}

export function UseCaseCard({ useCase, index, isCarousel = false }: UseCaseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = useCase.icon

  // Adjust width for carousel mode
  const cardWidthClass = isCarousel ? "w-full min-w-[min(90vw,600px)] md:min-w-[700px] flex-shrink-0" : "w-full"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`${cardWidthClass} group`}
    >
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 h-full bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] hover:border-cyan-500/80 hover:from-[#0f0f0f] hover:to-[#1a1a1a]"
        onClick={() => setIsExpanded(!isExpanded)}
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

        {/* Main content - Header */}
        <div className="relative z-10 p-6 md:p-8">
          {/* Header with icon and title */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <motion.div
                animate={isExpanded ? { 
                  scale: 1.1,
                  boxShadow: '0 0 24px rgba(6, 182, 212, 0.4)'
                } : {
                  scale: 1,
                  boxShadow: '0 0 0px rgba(6, 182, 212, 0)'
                }}
                transition={{ duration: 0.3 }}
                className={`relative p-3 rounded-xl bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#404040] group-hover:border-cyan-500/40 flex-shrink-0 transition-all duration-300`}
              >
                <Icon className={`h-7 w-7 ${useCase.iconColor} transition-transform duration-300 group-hover:scale-125`} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <h3 
                  className="font-bold text-xl md:text-2xl text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2" 
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {useCase.title}
                </h3>
                <p className="text-cyan-500/70 text-xs md:text-sm font-mono mt-1">Use Case</p>
              </div>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 mt-1"
            >
              <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors duration-300" />
            </motion.div>
          </div>

          {/* Problem statement - Always visible */}
          <div className="mb-4 md:mb-6">
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">{useCase.problem}</p>
          </div>

          {/* Tech Stack - Always visible summary */}
          <div className="mb-4 md:mb-6">
            <p className="text-xs md:text-sm font-mono text-cyan-500/70 mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {useCase.techStack.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs md:text-sm text-cyan-300 font-medium"
                >
                  {tech}
                </span>
              ))}
              {useCase.techStack.length > 4 && (
                <span className="px-3 py-1 rounded-lg bg-gray-500/10 border border-gray-500/30 text-xs md:text-sm text-gray-400 font-medium">
                  +{useCase.techStack.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Metrics preview - Always visible */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {useCase.metrics.slice(0, 3).map((metric, idx) => (
              <div key={idx} className="p-3 md:p-4 rounded-lg bg-black/50 border border-[#262626] group-hover:border-cyan-500/30 transition-colors duration-300">
                <p className="text-cyan-400 font-bold text-lg md:text-xl">{metric.value}</p>
                <p className="text-gray-500 text-xs md:text-sm mt-1">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Expandable content */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pt-6 border-t border-[#262626]">
              {/* Solution */}
              <div>
                <h4 className="text-sm md:text-base font-mono text-cyan-500/70 mb-2 uppercase tracking-wider">Solution</h4>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{useCase.solution}</p>
              </div>

              {/* Capabilities */}
              <div>
                <h4 className="text-sm md:text-base font-mono text-cyan-500/70 mb-3 uppercase tracking-wider">Capabilities</h4>
                <ul className="space-y-2">
                  {useCase.capabilities.map((capability, idx) => (
                    <li key={idx} className="flex gap-3 text-sm md:text-base text-gray-300">
                      <span className="text-cyan-400 font-bold flex-shrink-0">✓</span>
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process steps if available */}
              {useCase.process && (
                <div>
                  <h4 className="text-sm md:text-base font-mono text-cyan-500/70 mb-3 uppercase tracking-wider">Process</h4>
                  <ol className="space-y-2">
                    {useCase.process.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-sm md:text-base text-gray-300">
                        <span className="text-cyan-400 font-bold flex-shrink-0">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Example if available */}
              {useCase.example && (
                <div className="p-4 md:p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                  <h4 className="text-sm md:text-base font-mono text-cyan-500/70 mb-2 uppercase tracking-wider">Example</h4>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">{useCase.example}</p>
                </div>
              )}

              {/* All metrics */}
              {useCase.metrics.length > 3 && (
                <div>
                  <h4 className="text-sm md:text-base font-mono text-cyan-500/70 mb-3 uppercase tracking-wider">All Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {useCase.metrics.map((metric, idx) => (
                      <div key={idx} className="p-3 md:p-4 rounded-lg bg-black/50 border border-[#262626]">
                        <p className="text-cyan-400 font-bold text-base md:text-lg">{metric.value}</p>
                        <p className="text-gray-500 text-xs md:text-sm mt-1">{metric.label}</p>
                        <p className="text-gray-600 text-xs mt-2">{metric.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All tech stack */}
              {useCase.techStack.length > 4 && (
                <div>
                  <h4 className="text-sm md:text-base font-mono text-cyan-500/70 mb-3 uppercase tracking-wider">Complete Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs md:text-sm text-cyan-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Bottom border accent */}
          <motion.div
            animate={isExpanded ? { 
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 4
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  )
}
