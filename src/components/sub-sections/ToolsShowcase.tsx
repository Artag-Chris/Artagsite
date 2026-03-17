"use client"

import { motion } from "framer-motion"
import { toolsData } from "@/data/skillsData"

interface ToolsShowcaseProps {
  showLabel?: boolean
}

export function ToolsShowcase({ showLabel = true }: ToolsShowcaseProps) {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-8">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-gray-500 mb-3">
            Technologies & Tools
          </p>
          <p className="text-gray-400 text-sm max-w-2xl">
            Here's the full toolkit I use to bring these solutions to life. Each technology is carefully selected and mastered for specific use cases.
          </p>
        </div>
      )}

      {/* Tools grid - Compact display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {toolsData.map((tool, index) => {
          const Icon = tool.icon
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] hover:border-cyan-500/40 transition-all duration-300 cursor-default"
            >
              <div className="relative p-2 rounded-lg bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#404040] group-hover:border-cyan-500/40 transition-all duration-300">
                <Icon className={`h-6 w-6 md:h-7 md:w-7 ${tool.color} transition-transform duration-300 group-hover:scale-110`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-300 text-center group-hover:text-cyan-300 transition-colors duration-300">
                {tool.name}
              </span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-br from-cyan-500/20 via-transparent to-indigo-500/10 blur-xl pointer-events-none" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
