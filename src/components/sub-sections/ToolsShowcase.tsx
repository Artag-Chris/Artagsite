"use client"

import { motion } from "framer-motion"
import { useInViewOnReady } from "@/hooks/useInViewOnReady"
import { toolsData } from "@/data/skillsData"

interface ToolsShowcaseProps {
  showLabel?: boolean
}

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
}

const headerItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

export function ToolsShowcase({ showLabel = true }: ToolsShowcaseProps) {
  const { ref: headerInViewRef, isReady: headerReady } = useInViewOnReady<HTMLDivElement>({ amount: 0.3 })

  return (
    <div className="w-full">
      {showLabel && (
        <motion.div
          ref={headerInViewRef}
          className="mb-12 sm:mb-16 space-y-4 sm:space-y-6"
          variants={headerContainer}
          initial="hidden"
          animate={headerReady ? "visible" : "hidden"}
        >
          <motion.div className="inline-block" variants={headerItem}>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-500/70 bg-cyan-500/10 border border-cyan-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
              Tech Stack
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
            variants={headerItem}
          >
            Technologies & <span className="text-cyan-400 drop-shadow-lg" style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>Tools</span>
          </motion.h2>
          <motion.p
            className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed"
            variants={headerItem}
          >
            Here's the full toolkit I use to bring these solutions to life. Each technology is carefully selected and mastered for specific use cases.
          </motion.p>
        </motion.div>
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
