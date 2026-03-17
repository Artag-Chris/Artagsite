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

  // Fixed size for carousel mode - NOT full width!
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

        {/* Main content - Compact layout */}
        <div className="relative z-10 p-4 md:p-5">
          {/* Header with icon and title - minimal */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <motion.div
                animate={isExpanded ? { 
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
                } : {
                  scale: 1,
                  boxShadow: '0 0 0px rgba(6, 182, 212, 0)'
                }}
                transition={{ duration: 0.3 }}
                className={`relative p-2 rounded-lg bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#404040] group-hover:border-cyan-500/40 flex-shrink-0 transition-all duration-300`}
              >
                <Icon className={`h-5 w-5 ${useCase.iconColor} transition-transform duration-300 group-hover:scale-110`} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <h3 
                  className="font-bold text-base md:text-lg text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-1" 
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {useCase.title}
                </h3>
                <p className="text-cyan-500/50 text-xs font-mono mt-0.5">Use Case</p>
              </div>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors duration-300" />
            </motion.div>
          </div>

          {/* Problem statement - One line max when collapsed */}
          <div className="mb-2.5">
            <p className="text-gray-400 text-xs md:text-sm leading-tight line-clamp-2">{useCase.problem}</p>
          </div>

          {/* Tech Stack - Horizontal, minimal */}
          <div className="mb-2.5">
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

          {/* Metrics - Just 1 highlighted metric visible */}
          {useCase.metrics.length > 0 && (
            <div className="p-2 rounded-lg bg-black/50 border border-[#262626] group-hover:border-cyan-500/20 transition-colors duration-300 mb-2.5">
              <p className="text-cyan-400 font-bold text-base">{useCase.metrics[0].value}</p>
              <p className="text-gray-500 text-xs">{useCase.metrics[0].label}</p>
            </div>
          )}

          {/* Expandable content - Only shows on expand */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={isExpanded ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-2.5 pt-3 border-t border-[#262626]">
              {/* Solution */}
              <div>
                <h4 className="text-xs font-mono text-cyan-500/50 mb-1 uppercase tracking-wider">Solution</h4>
                <p className="text-gray-300 text-xs leading-tight line-clamp-3">{useCase.solution}</p>
              </div>

              {/* Capabilities - Compact list */}
              <div>
                <h4 className="text-xs font-mono text-cyan-500/50 mb-1 uppercase tracking-wider">Capabilities</h4>
                <ul className="space-y-0.5">
                  {useCase.capabilities.slice(0, 2).map((capability, idx) => (
                    <li key={idx} className="flex gap-1.5 text-xs text-gray-300">
                      <span className="text-cyan-400 font-bold flex-shrink-0">✓</span>
                      <span className="line-clamp-1">{capability}</span>
                    </li>
                  ))}
                  {useCase.capabilities.length > 2 && (
                    <li className="text-xs text-cyan-400/70">+{useCase.capabilities.length - 2} more</li>
                  )}
                </ul>
              </div>

              {/* All metrics in expanded view */}
              {useCase.metrics.length > 1 && (
                <div>
                  <h4 className="text-xs font-mono text-cyan-500/50 mb-1 uppercase tracking-wider">All Metrics</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {useCase.metrics.map((metric, idx) => (
                      <div key={idx} className="p-1.5 rounded-lg bg-black/50 border border-[#262626]">
                        <p className="text-cyan-400 font-bold text-sm">{metric.value}</p>
                        <p className="text-gray-500 text-xs">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech stack full list */}
              {useCase.techStack.length > 2 && (
                <div>
                  <h4 className="text-xs font-mono text-cyan-500/50 mb-1 uppercase tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    {useCase.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded-sm bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Process if available */}
              {useCase.process && useCase.process.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-cyan-500/50 mb-1 uppercase tracking-wider">Process</h4>
                  <ol className="space-y-0.5">
                    {useCase.process.slice(0, 3).map((step, idx) => (
                      <li key={idx} className="flex gap-1 text-xs text-gray-300">
                        <span className="text-cyan-400 font-bold flex-shrink-0">{idx + 1}.</span>
                        <span className="line-clamp-1">{step}</span>
                      </li>
                    ))}
                  </ol>
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
              y: 2
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  )
}
