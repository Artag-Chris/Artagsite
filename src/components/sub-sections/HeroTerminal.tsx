"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

type Line =
  | { prompt: string; command: string; delay: number; output?: never; highlight?: never }
  | { output: string[]; delay: number; prompt?: never; command?: never; highlight?: boolean }

export default function HeroTerminal() {
  const t = useTranslations("hero.terminal")
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [typedCommand, setTypedCommand] = useState<Record<number, string>>({})

  const lines: Line[] = [
    { prompt: "christian@artagdev", command: t("line1"), delay: 0 },
    {
      output: [t("out1"), t("out2"), t("out3")],
      delay: 600,
    },
    { prompt: "christian@artagdev", command: t("line2"), delay: 1800 },
    {
      output: [t("out4")],
      delay: 2400,
    },
    { prompt: "christian@artagdev", command: t("line3"), delay: 3800 },
    {
      output: [t("out5"), t("out6"), t("out7")],
      delay: 4400,
      highlight: true,
    },
  ]

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i])

        if ("command" in line && line.command) {
          const cmd = line.command
          let charIdx = 0
          const typeInterval = setInterval(() => {
            charIdx++
            setTypedCommand((prev) => ({ ...prev, [i]: cmd.slice(0, charIdx) }))
            if (charIdx >= cmd.length) clearInterval(typeInterval)
          }, 40)
        }
      }, line.delay)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className="hidden lg:block w-full max-w-lg mx-auto"
    >
      <div className="relative group">
        <div className="relative bg-[#0d0d0d]/90 backdrop-blur-sm border border-white/5 group-hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-200">

          <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-zinc-500 font-mono">{t("windowTitle")}</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-zinc-500 font-mono">{t("live")}</span>
            </div>
          </div>

          <div className="p-5 font-mono text-sm space-y-1.5 min-h-[280px]">
            <AnimatePresence>
              {(lines as Line[]).map((line, i) => {
                if (!visibleLines.includes(i)) return null

                if ("command" in line) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 flex-wrap"
                    >
                       <span className="text-blue-400">{line.prompt}</span>
                       <span className="text-zinc-600">~</span>
                       <span className="text-amber-400">$</span>
                      <span className="text-zinc-100">
                        {typedCommand[i] ?? ""}
                        {typedCommand[i]?.length !== (line.command ?? "").length && (
                           <span className="inline-block w-2 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle" />
                        )}
                      </span>
                    </motion.div>
                  )
                }

                return (
                  <div key={i} className="pl-2 space-y-0.5">
                    {line.output.map((out, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: j * 0.08 }}
                        className={
                          line.highlight
                            ? "text-cyan-300 font-medium"
                            : out.includes("UP")
                            ? "text-green-400/90"
                            : "text-zinc-500"
                        }
                      >
                        {out}
                      </motion.div>
                    ))}
                  </div>
                )
              })}
            </AnimatePresence>

            {visibleLines.length === lines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 mt-1"
              >
                 <span className="text-blue-400">christian@artagdev</span>
                 <span className="text-zinc-600">~</span>
                 <span className="text-amber-400">$</span>
                 <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse align-middle" />
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5, duration: 0.4 }}
          className="absolute -bottom-4 -right-4 bg-[#111111] border border-white/5 rounded-xl px-4 py-2 flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-zinc-400 font-mono font-medium">{t("badge")}</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
