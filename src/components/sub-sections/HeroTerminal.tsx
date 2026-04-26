"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const lines = [
  { prompt: "christian@artagdev", command: "git log --oneline -3", delay: 0 },
  {
    output: [
      "a3f9c12 feat: migrate 32k users — 0.004% error rate",
      "b81e004 feat: payment gateway $2M+ daily volume",
      "c77d331 fix: latency <100ms on real-time events",
    ],
    delay: 600,
  },
  { prompt: "christian@artagdev", command: "uptime --services", delay: 1800 },
  {
    output: ["api-gateway    ██████████ 99.99%  UP", "payment-svc    ██████████ 99.97%  UP", "automation     ██████████ 100.0%  UP"],
    delay: 2400,
  },
  { prompt: "christian@artagdev", command: "whoami --available", delay: 3800 },
  {
    output: ["✓ Open to full-time roles", "✓ Freelance & nearshore", "✓ Response time < 24h"],
    delay: 4400,
    highlight: true,
  },
]

type Line =
  | { prompt: string; command: string; delay: number; output?: never; highlight?: never }
  | { output: string[]; delay: number; prompt?: never; command?: never; highlight?: boolean }

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [typedCommand, setTypedCommand] = useState<Record<number, string>>({})

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i])

        // Type out commands character by character
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
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      className="hidden lg:block w-full max-w-lg mx-auto"
    >
      {/* Terminal window */}
      <div className="relative group">
        {/* Glow behind terminal */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/15 rounded-2xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        <div className="relative bg-[#0d0d0d]/90 backdrop-blur-xl border border-[#2a2a2a] group-hover:border-cyan-500/30 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl">

          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#161616] border-b border-[#222]">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-gray-500 font-mono">christian@artagdev — zsh</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-xs text-cyan-500/70 font-mono">live</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-5 font-mono text-sm space-y-1.5 min-h-[280px]">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.015] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

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
                      <span className="text-cyan-400">{line.prompt}</span>
                      <span className="text-gray-500">~</span>
                      <span className="text-indigo-400">$</span>
                      <span className="text-gray-100">
                        {typedCommand[i] ?? ""}
                        {typedCommand[i]?.length !== line.command.length && (
                          <span className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
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
                            : "text-gray-400"
                        }
                      >
                        {out}
                      </motion.div>
                    ))}
                  </div>
                )
              })}
            </AnimatePresence>

            {/* Blinking cursor at end */}
            {visibleLines.length === lines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 mt-1"
              >
                <span className="text-cyan-400">christian@artagdev</span>
                <span className="text-gray-500">~</span>
                <span className="text-indigo-400">$</span>
                <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5, duration: 0.5 }}
          className="absolute -bottom-4 -right-4 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-xl px-4 py-2 flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-cyan-300 font-mono font-medium">Available for hire</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
