"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MinimalTechLoaderProps {
  onLoadingComplete?: () => void
  minDisplayTime?: number
}

export default function MinimalTechLoader({ onLoadingComplete, minDisplayTime = 1800 }: MinimalTechLoaderProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  const phrases = [
    { text: "Initializing", subtext: "System startup" },
    { text: "Crafting", subtext: "User experience" },
    { text: "Ready", subtext: "Let's create" },
  ]

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => {
        if (prev < phrases.length - 1) return prev + 1
        clearInterval(phraseInterval)
        return prev
      })
    }, 500)

    // Smooth progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 100 / (minDisplayTime / 50)
      })
    }, 50)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        if (onLoadingComplete) onLoadingComplete()
      }, 800)
    }, minDisplayTime)

    return () => {
      clearInterval(phraseInterval)
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [minDisplayTime, onLoadingComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 50% 50%, #0f0f1a 0%, #000000 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
              }}
            >
              <motion.div
                className="w-full h-full"
                animate={{
                  backgroundPosition: ["0px 0px", "50px 50px"],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          </div>

          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Animated logo/icon */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Outer ring */}
                <motion.div
                  className="w-24 h-24 rounded-full border-2 border-indigo-500/30 absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Inner ring */}
                <motion.div
                  className="w-20 h-20 rounded-full border-2 border-purple-500/40 absolute inset-2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Center */}
                <div className="w-24 h-24 rounded-full flex items-center justify-center">
                  <motion.div
                    className="text-3xl font-bold bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    A
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Typing text */}
            <div className="flex flex-col items-center gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhrase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-white font-medium tracking-wide">{phrases[currentPhrase].text}</span>
                    <motion.span
                      className="w-0.5 h-5 bg-indigo-400"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.7, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">{phrases[currentPhrase].subtext}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="w-80 flex flex-col gap-2">
              <div className="relative h-1 bg-gray-900 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-600">
                <span>Loading</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
