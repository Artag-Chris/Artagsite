"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useInViewOnReady } from "@/hooks/useInViewOnReady"
import { toolsData, Tool } from "@/data/skillsData"

interface ToolsShowcaseProps {
  showLabel?: boolean
}

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25 } },
}

const headerItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

function groupByCategory(tools: Tool[]): { category: string; items: Tool[] }[] {
  const map = new Map<string, Tool[]>()
  for (const tool of tools) {
    const arr = map.get(tool.category) || []
    arr.push(tool)
    map.set(tool.category, arr)
  }
  return Array.from(map.entries()).map(([category, items]) => ({ category, items }))
}

export function ToolsShowcase({ showLabel = true }: ToolsShowcaseProps) {
  const t = useTranslations("skills.tools")
  const { ref: headerInViewRef, isReady: headerReady } = useInViewOnReady<HTMLDivElement>({ amount: 0.3 })
  const grouped = groupByCategory(toolsData)

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
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-400/70 bg-amber-500/10 border border-amber-500/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              {t("badge")}
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
            variants={headerItem}
          >
            {t("title")}<span className="text-blue-400">{t("titleAccent")}</span>
          </motion.h2>
          <motion.p
            className="text-zinc-400 text-base sm:text-lg max-w-3xl leading-relaxed"
            variants={headerItem}
          >
            {t("description")}
          </motion.p>
        </motion.div>
      )}

      <div className="space-y-10 sm:space-y-12">
        {grouped.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-500">
                {t(`categories.${group.category}`)}
              </h3>
              <div className="flex-1 h-px bg-white/[0.04]" />
              <span className="text-[10px] font-mono text-zinc-600">
                {group.items.length}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
              {group.items.map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.03 }}
                    viewport={{ once: true, margin: "-30px" }}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    className="group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/5 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-2 rounded-lg bg-white/[0.03] transition-all duration-200">
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${tool.color} transition-transform duration-200 group-hover:scale-110`} />
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium text-zinc-500 group-hover:text-zinc-300 text-center transition-colors duration-200 leading-tight">
                      {tool.name}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
