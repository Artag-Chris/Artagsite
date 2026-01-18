"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (you can remove this in production and use real loading detection)
    const timer = setTimeout(() => {
      setLoading(false)
      // Call the callback after loading completes
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative w-64 h-64">
            {/* Circuit Background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <CircuitPattern />
            </svg>

            {/* Center Logo */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-bold text-xl">AD</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Circuit Pattern Component
const CircuitPattern = () => {
  // Define the colors for the transition
  const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"]

  return (
    <>
      {/* Circuit Lines */}
      {[...Array(8)].map((_, i) => (
        <motion.path
          key={`circuit-line-${i}`}
          d={getRandomCircuitPath()}
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, stroke: colors[0] }}
          animate={{
            pathLength: 1,
            stroke: [colors[0], colors[1], colors[2], colors[3], "#10B981"],
          }}
          transition={{
            pathLength: { delay: i * 0.1, duration: 1.5, ease: "easeInOut" },
            stroke: { delay: i * 0.1, duration: 2.5, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Circuit Nodes */}
      {[...Array(12)].map((_, i) => {
        const x = 20 + Math.random() * 160
        const y = 20 + Math.random() * 160
        const size = 2 + Math.random() * 4

        return (
          <motion.circle
            key={`circuit-node-${i}`}
            cx={x}
            cy={y}
            r={size}
            initial={{ scale: 0, fill: colors[0] }}
            animate={{
              scale: [0, 1.2, 1],
              fill: [colors[0], colors[1], colors[2], colors[3], "#10B981"],
            }}
            transition={{
              scale: { delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeInOut" },
              fill: { delay: 0.5 + i * 0.1, duration: 2.5, ease: "easeInOut" },
            }}
          />
        )
      })}

      {/* Pulse Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.circle
          key={`pulse-ring-${i}`}
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke="#10B981"
          strokeWidth="1"
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{
            scale: [0.5, 1.8],
            opacity: [0.8, 0],
            strokeWidth: [1, 0.2],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: i * 0.4,
            duration: 2,
            ease: "easeOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </>
  )
}

// Helper function to generate random circuit paths
function getRandomCircuitPath() {
  const startX = Math.random() * 50
  const startY = Math.random() * 200
  let path = `M ${startX},${startY} `

  let currentX = startX
  let currentY = startY

  // Generate a series of line segments with 90-degree turns
  const segments = 3 + Math.floor(Math.random() * 5)

  for (let i = 0; i < segments; i++) {
    // Decide whether to go horizontal or vertical
    if (Math.random() > 0.5) {
      // Horizontal line
      const newX = currentX + (Math.random() * 100 - 20)
      path += `H ${newX} `
      currentX = newX
    } else {
      // Vertical line
      const newY = currentY + (Math.random() * 100 - 50)
      path += `V ${newY} `
      currentY = newY
    }

    // Add some curves occasionally
    if (Math.random() > 0.7) {
      const cpX = currentX + (Math.random() * 40 - 20)
      const cpY = currentY + (Math.random() * 40 - 20)
      const endX = currentX + (Math.random() * 80 - 40)
      const endY = currentY + (Math.random() * 80 - 40)
      path += `Q ${cpX},${cpY} ${endX},${endY} `
      currentX = endX
      currentY = endY
    }
  }

  return path
}

export default LoadingScreen
