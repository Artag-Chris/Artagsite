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

  // Adjust width for carousel mode - more compact
  const cardWidthClass = isCarousel ? "w-full min-w-[min(95vw,520px)] md:min-w-[600px] flex-shrink-0" : "w-full"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`${cardWidthClass} group`}
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
        <div className="relative z-10 p-5 md:p-6">
          {/* Header with icon and title - more compact */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <motion.div
                animate={isExpanded ? { 
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
                } : {
                  scale: 1,
                  boxShadow: '0 0 0px rgba(6, 182, 212, 0)'
                }}
                transition={{ duration: 0.3 }}
                className={`relative p-2.5 rounded-lg bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#404040] group-hover:border-cyan-500/40 flex-shrink-0 transition-all duration-300`}
              >
                <Icon className={`h-6 w-6 ${useCase.iconColor} transition-transform duration-300 group-hover:scale-110`} />
              </motion.div>

              <div className="flex-1 min-w-0">
                <h3 
                  className="font-bold text-lg md:text-xl text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2" 
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {useCase.title}
                </h3>
                <p className="text-cyan-500/60 text-xs font-mono mt-0.5">Use Case</p>
              </div>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 mt-0.5"
            >
              <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors duration-300" />
            </motion.div>
          </div>

          {/* Problem statement - Compact */}
          <div className="mb-3">
            <p className="text-gray-400 text-xs md:text-sm leading-snug line-clamp-2">{useCase.problem}</p>
          </div>

          {/* Tech Stack - Compact grid */}
          <div className="mb-3">
            <p className="text-xs font-mono text-cyan-500/60 mb-1.5">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {useCase.techStack.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-300 font-medium"
                >
                  {tech}
                </span>
              ))}
              {useCase.techStack.length > 3 && (
                <span className="px-2 py-0.5 rounded-md bg-gray-500/10 border border-gray-500/25 text-xs text-gray-400 font-medium">
                  +{useCase.techStack.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Metrics preview - Compact grid */}
          <div className="grid grid-cols-2 gap-2">
            {useCase.metrics.slice(0, 2).map((metric, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-black/50 border border-[#262626] group-hover:border-cyan-500/20 transition-colors duration-300">
                <p className="text-cyan-400 font-bold text-sm md:text-base">{metric.value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{metric.label}</p>
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
            <div className="space-y-3 pt-4 border-t border-[#262626]">
              {/* Solution */}
              <div>
                <h4 className="text-xs font-mono text-cyan-500/60 mb-1.5 uppercase tracking-wider">Solution</h4>
                <p className="text-gray-300 text-xs md:text-sm leading-snug line-clamp-3">{useCase.solution}</p>
              </div>

              {/* Capabilities - Compact */}
              <div>
                <h4 className="text-xs font-mono text-cyan-500/60 mb-1.5 uppercase tracking-wider">Key Capabilities</h4>
                <ul className="space-y-1">
                  {useCase.capabilities.slice(0, 3).map((capability, idx) => (
                    <li key={idx} className="flex gap-2 text-xs md:text-sm text-gray-300">
                      <span className="text-cyan-400 font-bold flex-shrink-0">✓</span>
                      <span className="line-clamp-1">{capability}</span>
                    </li>
                  ))}
                  {useCase.capabilities.length > 3 && (
                    <li className="text-xs text-cyan-400/70">+{useCase.capabilities.length - 3} more capabilities</li>
                  )}
                </ul>
              </div>

              {/* Process steps if available - Compact */}
              {useCase.process && (
                <div>
                  <h4 className="text-xs font-mono text-cyan-500/60 mb-1.5 uppercase tracking-wider">Process</h4>
                  <ol className="space-y-1">
                    {useCase.process.slice(0, 4).map((step, idx) => (
                      <li key={idx} className="flex gap-2 text-xs md:text-sm text-gray-300">
                        <span className="text-cyan-400 font-bold flex-shrink-0">{idx + 1}.</span>
                        <span className="line-clamp-1">{step}</span>
                      </li>
                    ))}
                    {useCase.process.length > 4 && (
                      <li className="text-xs text-cyan-400/70">+{useCase.process.length - 4} more steps</li>
                    )}
                  </ol>
                </div>
              )}

              {/* Example if available */}
              {useCase.example && (
                <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/15">
                  <h4 className="text-xs font-mono text-cyan-500/60 mb-1 uppercase tracking-wider">Example</h4>
                  <p className="text-gray-300 text-xs md:text-sm leading-snug line-clamp-2">{useCase.example}</p>
                </div>
              )}

              {/* All metrics - if more than 2 */}
              {useCase.metrics.length > 2 && (
                <div>
                  <h4 className="text-xs font-mono text-cyan-500/60 mb-1.5 uppercase tracking-wider">All Metrics</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {useCase.metrics.map((metric, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-black/50 border border-[#262626]">
                        <p className="text-cyan-400 font-bold text-xs md:text-sm">{metric.value}</p>
                        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All tech stack */}
              {useCase.techStack.length > 3 && (
                <div>
                  <h4 className="text-xs font-mono text-cyan-500/60 mb-1.5 uppercase tracking-wider">Complete Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {useCase.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-300 font-medium"
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
