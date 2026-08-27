"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

interface CityLoaderProps {
  onLoadingComplete?: () => void
  minDisplayTime?: number
}

export default function CityLoader({ onLoadingComplete, minDisplayTime = 3000 }: CityLoaderProps) {
  const t = useTranslations("loaders.city")
  const [colorPhase, setColorPhase] = useState(0)
  const [showBlimp, setShowBlimp] = useState(false)
  const [showMotorcycle, setShowMotorcycle] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Store random values in a ref to maintain consistency between renders
  const starsRef = useRef<Array<{ width: number; height: number; left: number; top: number; delay: number }>>([])

  // Optimized color palette - fewer transitions for faster loading
  const skyColors = [
    "linear-gradient(to top, #1a1a2e, #16213e, #0f3460)",
    "linear-gradient(to top, #0f3460, #16213e, #1a1a2e)",
    "linear-gradient(to top, #16213e, #0f3460, #533483)",
  ]

  const neonColors = [
    ["#10b981", "#34d399", "#6ee7b7"], // Emerald theme
    ["#3b82f6", "#60a5fa", "#93c5fd"], // Blue theme
    ["#8b5cf6", "#a78bfa", "#c4b5fd"], // Purple theme
  ]

  // Initialize stars only once on client-side - reduced count for performance
  useEffect(() => {
    setIsClient(true)

    if (starsRef.current.length === 0) {
      const stars = Array.from({ length: 50 }).map(() => ({
        width: Math.random() * 2 + 1,
        height: Math.random() * 2 + 1,
        left: Math.random() * 100,
        top: Math.random() * 60,
        delay: Math.random() * 2,
      }))
      starsRef.current = stars
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, minDisplayTime)

    return () => clearTimeout(timer)
  }, [minDisplayTime, onLoadingComplete])

  useEffect(() => {
    // Faster color transitions
    const colorInterval = setInterval(() => {
      setColorPhase((prev) => {
        if (prev < skyColors.length - 1) return prev + 1
        clearInterval(colorInterval)
        return prev
      })
    }, 600)

    // Show elements earlier
    setTimeout(() => setShowBlimp(true), 800)
    setTimeout(() => setShowMotorcycle(true), 1200)

    return () => clearInterval(colorInterval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 overflow-hidden z-50"
          style={{
            background: skyColors[colorPhase],
            transition: "background 0.6s ease-in-out",
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1, ease: "easeInOut" },
          }}
        >
          {/* Optimized stars */}
          {isClient && (
            <div className="absolute inset-0">
              {starsRef.current.map((star, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${star.width}px`,
                    height: `${star.height}px`,
                    left: `${star.left}%`,
                    top: `${star.top}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0.4, 0.8] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: star.delay,
                  }}
                />
              ))}
            </div>
          )}

          {/* Optimized Blimp */}
          {isClient && showBlimp && (
            <motion.div
              className="absolute"
              initial={{ right: "-15%", top: "15%" }}
              animate={{ right: "110%" }}
              transition={{ duration: 12, ease: "linear" }}
            >
              <svg width="100" height="35" viewBox="0 0 100 35">
                <motion.ellipse
                  cx="50"
                  cy="17"
                  rx="40"
                  ry="12"
                  fill="#2d1b46"
                  stroke={neonColors[colorPhase][0]}
                  strokeWidth="1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.rect
                  x="8"
                  y="15"
                  width="16"
                  height="8"
                  fill="#2d1b46"
                  stroke={neonColors[colorPhase][1]}
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </svg>
            </motion.div>
          )}

          {/* Optimized City skyline */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg width="100%" height="50vh" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMax meet">
              {/* Simplified buildings */}
              {[
                { width: 100, height: 300, x: 100, delay: 0.1, windows: 6 },
                { width: 120, height: 350, x: 220, delay: 0.2, windows: 8 },
                { width: 80, height: 250, x: 360, delay: 0.3, windows: 5 },
                { width: 140, height: 380, x: 460, delay: 0.1, windows: 10 },
                { width: 90, height: 280, x: 620, delay: 0.2, windows: 6 },
                { width: 110, height: 320, x: 730, delay: 0.3, windows: 7 },
                { width: 130, height: 360, x: 860, delay: 0.1, windows: 9 },
                { width: 100, height: 290, x: 1010, delay: 0.2, windows: 6 },
              ].map((building, i) => (
                <g key={i}>
                  <motion.rect
                    x={building.x}
                    width={building.width}
                    height={building.height}
                    y={500 - building.height}
                    fill="#1a1a2e"
                    stroke={neonColors[colorPhase][i % 3]}
                    strokeWidth="2"
                    initial={{ y: 500, opacity: 0 }}
                    animate={{ y: 500 - building.height, opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: building.delay,
                      ease: "easeOut",
                    }}
                  />

                  {/* Simplified windows */}
                  {isClient &&
                    Array.from({ length: building.windows }).map((_, j) => {
                      const windowWidth = building.width * 0.15
                      const windowHeight = 12
                      const windowX = building.x + (j % 3) * (building.width / 3) + building.width * 0.1
                      const windowY = 500 - building.height + 30 + Math.floor(j / 3) * 35

                      return (
                        <motion.rect
                          key={`window-${i}-${j}`}
                          x={windowX}
                          y={windowY}
                          width={windowWidth}
                          height={windowHeight}
                          fill={neonColors[colorPhase][j % 3]}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.8, 0.4, 0.8] }}
                          transition={{
                            duration: 1.5,
                            delay: building.delay + 0.5 + j * 0.05,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        />
                      )
                    })}
                </g>
              ))}

              {/* Simplified motorcycle */}
              {isClient && showMotorcycle && (
                <motion.g initial={{ x: -80 }} animate={{ x: 1300 }} transition={{ duration: 4, ease: "linear" }}>
                  <motion.rect
                    x="40"
                    y="470"
                    width="30"
                    height="8"
                    fill="#1a1a2e"
                    stroke={neonColors[colorPhase][0]}
                    strokeWidth="2"
                    rx="4"
                  />
                  <circle
                    cx="30"
                    cy="480"
                    r="8"
                    fill="transparent"
                    stroke={neonColors[colorPhase][1]}
                    strokeWidth="2"
                  />
                  <circle
                    cx="70"
                    cy="480"
                    r="8"
                    fill="transparent"
                    stroke={neonColors[colorPhase][2]}
                    strokeWidth="2"
                  />
                  {/* Light beam */}
                  <motion.path
                    d="M20 475 L5 470 L5 485 L20 480"
                    fill={neonColors[colorPhase][0]}
                    opacity="0.6"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.g>
              )}
            </svg>
          </div>

          {/* Loading text with progress indicator */}
          <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center">
            <motion.div
              className="text-2xl font-bold tracking-wider mb-4"
              style={{ color: neonColors[colorPhase][0] }}
              animate={{
                color: [neonColors[colorPhase][0], neonColors[colorPhase][1], neonColors[colorPhase][2]],
                textShadow: [
                  `0 0 5px ${neonColors[colorPhase][0]}`,
                  `0 0 10px ${neonColors[colorPhase][1]}`,
                  `0 0 15px ${neonColors[colorPhase][2]}`,
                ],
              }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              {t("brand")}
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: minDisplayTime / 1000, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              className="text-emerald-400 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t("loading")}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
