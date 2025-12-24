"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypingEmotionalLoaderProps {
  onLoadingComplete?: () => void
  minDisplayTime?: number
}

export default function TypingEmotionalLoader({
  onLoadingComplete,
  minDisplayTime = 1800,
}: TypingEmotionalLoaderProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const phrases = ["Designing emotion…", "Engineering impact…", "Loading your experience…"]

  useEffect(() => {
    // Cycle through phrases faster
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => {
        if (prev < phrases.length - 1) return prev + 1
        clearInterval(phraseInterval)
        return prev
      })
    }, 500)

    // Exit animation
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete()
      }, 600)
    }, minDisplayTime)

    return () => {
      clearInterval(phraseInterval)
      clearTimeout(timer)
    }
  }, [minDisplayTime, onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, #0a0a0f, #0f0f1a, #0a0a0f)",
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          {/* Grain/noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 2 === 0 ? "#6366f1" : "#8b5cf6",
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo/Brand */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Artag
              </div>
            </motion.div>

            {/* Typing phrases */}
            <div className="h-16 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-2xl text-gray-300 font-light tracking-wide">{phrases[currentPhrase]}</span>
                  <motion.span
                    className="w-0.5 h-7 bg-indigo-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicator */}
            <div className="w-64 relative">
              <div className="h-[1px] w-full bg-gray-800 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: minDisplayTime / 1000,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-indigo-500/20 blur-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-indigo-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-purple-500/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
