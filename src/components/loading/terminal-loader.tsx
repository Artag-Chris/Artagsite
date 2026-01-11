"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TerminalLoaderProps {
  onLoadingComplete?: () => void
  minDisplayTime?: number
}

export default function TerminalLoader({ onLoadingComplete, minDisplayTime = 2000 }: TerminalLoaderProps) {
  const [lines, setLines] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(true)

  const commands = [
    "$ initializing artag.system...",
    "$ loading emotional_design.module",
    "$ compiling impact.engine",
    "$ ready to create experiences",
  ]

  useEffect(() => {
    let currentLine = 0

    const addLine = () => {
      if (currentLine < commands.length) {
        setLines((prev) => [...prev, commands[currentLine]])
        currentLine++
        setTimeout(addLine, 400)
      } else {
        setTimeout(() => {
          setIsVisible(false)
          setTimeout(() => {
            if (onLoadingComplete) onLoadingComplete()
          }, 600)
        }, 400)
      }
    }

    setTimeout(addLine, 300)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #000000 0%, #0a0a14 50%, #000000 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(8px)",
            transition: { duration: 0.6, ease: "easeOut" },
          }}
        >
          {/* Scanline effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)",
            }}
            animate={{
              opacity: [0.1, 0.05, 0.1],
            }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Terminal window */}
          <motion.div
            className="relative w-full max-w-2xl mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Window header */}
            <div className="bg-gray-900/50 border border-indigo-500/20 rounded-t-lg px-4 py-3 flex items-center gap-2 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-indigo-500/60" />
              </div>
              <span className="text-xs text-gray-500 ml-4 font-mono">artag@terminal</span>
            </div>

            {/* Terminal content */}
            <div className="bg-black/80 border-x border-b border-indigo-500/20 rounded-b-lg p-6 backdrop-blur-sm">
              <div className="font-mono text-sm space-y-3">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-indigo-400">›</span>
                    <span className="text-gray-300">{line}</span>
                    {i === lines.length - 1 && (
                      <motion.span
                        className="inline-block w-2 h-4 bg-indigo-400 ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress indicator */}
              <motion.div
                className="mt-6 h-1 bg-gray-900 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: minDisplayTime / 1000,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-indigo-500/5 blur-3xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
