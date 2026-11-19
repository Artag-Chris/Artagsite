"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// More realistic lightning paths with branches
const mainLightningPaths = [
  "M50,0 C50,0 45,30 55,50 C60,60 40,70 45,90 C47,100 30,120 35,150 C37,165 25,180 20,200",
  "M70,0 C70,0 80,40 65,70 C55,90 70,110 60,140 C55,160 65,180 55,200",
  "M30,0 C30,0 20,30 35,60 C45,80 30,100 40,130 C45,150 35,170 45,200",
  "M90,0 C90,0 100,30 85,60 C75,80 90,110 80,150 C75,180 90,190 85,200",
]

// Branch paths that connect to main lightning
const branchPaths = [
  "M0,0 C5,10 15,15 25,10",
  "M0,0 C10,5 20,0 25,-10",
  "M0,0 C-5,10 -15,15 -25,20",
  "M0,0 C-10,5 -20,0 -30,-5",
  "M0,0 C5,15 15,20 10,30",
  "M0,0 C-5,15 -15,20 -10,30",
]

interface LightningBranch {
  pathIndex: number
  position: { x: number; y: number }
  scale: number
  rotation: number
  delay: number
}

// Lightning bolt component with branches
const LightningBolt = ({ delay = 0, position = { x: 50, y: 0 }, scale = 1, opacity = 1 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [mainPathIndex, setMainPathIndex] = useState(0)
  const [branches, setBranches] = useState<LightningBranch[]>([])

  // Generate random branches
  const generateBranches = () => {
    const numBranches = 3 + Math.floor(Math.random() * 5) // 3-7 branches
    const newBranches = []

    for (let i = 0; i < numBranches; i++) {
      newBranches.push({
        pathIndex: Math.floor(Math.random() * branchPaths.length),
        position: {
          x: Math.random() * 100, // percentage along main bolt
          y: Math.random() * 100, // percentage along main bolt
        },
        scale: 0.3 + Math.random() * 0.7, // 0.3-1.0
        rotation: Math.random() * 360, // 0-360 degrees
        delay: Math.random() * 0.2, // 0-0.2s delay
      })
    }

    setBranches(newBranches)
  }

  useEffect(() => {
    // Set random main path
    setMainPathIndex(Math.floor(Math.random() * mainLightningPaths.length))

    // Initial delay before starting
    const initialTimeout = setTimeout(() => {
      // Show lightning at random intervals
      const interval = setInterval(
        () => {
          // Only show lightning sometimes (20% chance)
          if (Math.random() < 0.2) {
            setIsVisible(true)
            generateBranches()

            // Hide after a short duration
            setTimeout(
              () => {
                setIsVisible(false)
              },
              300 + Math.random() * 400,
            ) // 300-700ms flash duration
          }
        },
        3000 + Math.random() * 7000,
      ) // 3-10 seconds between potential flashes

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(initialTimeout)
  }, [delay])

  if (!isVisible) return null

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `scale(${scale})`,
        zIndex: 0,
        width: "100px",
        height: "200px",
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, opacity, opacity * 0.8, opacity, 0],
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <svg
        width="100"
        height="200"
        viewBox="0 0 100 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Main lightning bolt */}
        <motion.path
          d={mainLightningPaths[mainPathIndex]}
          stroke="url(#lightning-gradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, strokeWidth: 1 }}
          animate={{
            pathLength: 1,
            strokeWidth: [1, 3, 2, 3, 1],
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Glow effect for main bolt */}
        <motion.path
          d={mainLightningPaths[mainPathIndex]}
          stroke="url(#lightning-gradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: [0.1, 0.3, 0.2, 0.3, 0.1] }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ filter: "blur(4px)" }}
        />

        {/* Branch lightning bolts */}
        {branches.map((branch: LightningBranch, index: number) => {
          // Calculate position along the main path
          const x = branch.position.x
          const y = branch.position.y

          return (
            <g key={index} transform={`translate(${x}, ${y}) scale(${branch.scale}) rotate(${branch.rotation})`}>
              <motion.path
                d={branchPaths[branch.pathIndex]}
                stroke="url(#lightning-gradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, delay: branch.delay, ease: "easeOut" }}
              />

              {/* Glow effect for branch */}
              <motion.path
                d={branchPaths[branch.pathIndex]}
                stroke="url(#lightning-gradient)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: 1, opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 0.2, delay: branch.delay, ease: "easeOut" }}
                style={{ filter: "blur(3px)" }}
              />
            </g>
          )
        })}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" /> {/* emerald-500 */}
            <stop offset="50%" stopColor="#34D399" /> {/* emerald-400 */}
            <stop offset="100%" stopColor="#6EE7B7" /> {/* emerald-300 */}
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

// Cloud component for lightning to come from
const Cloud = ({
  position,
  scale = 1,
  opacity = 0.15,
}: {
  position: { x: number; y: number }
  scale?: number
  opacity?: number
}) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M40,60 A30,30 0 1,1 100,60 A30,30 0 1,1 160,60 Q160,90 100,90 Q40,90 40,60"
          fill="url(#cloud-gradient)"
          style={{ filter: "blur(5px)" }}
        />
        <defs>
          <linearGradient id="cloud-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F766E" /> {/* teal-700 */}
            <stop offset="100%" stopColor="#0D9488" /> {/* teal-600 */}
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Enhanced lightning background with clouds
export const LightningBackground = () => {
  // Define fixed positions for lightning bolts and clouds
  const lightningPositions = [
    { x: 15, y: 0, scale: 1.2, opacity: 0.9 },
    { x: 85, y: 0, scale: 1, opacity: 0.8 },
    { x: 35, y: 0, scale: 0.8, opacity: 0.7 },
    { x: 65, y: 0, scale: 0.9, opacity: 0.8 },
    { x: 50, y: 0, scale: 1.3, opacity: 1 },
  ]

  const cloudPositions = [
    { x: 10, y: 0, scale: 1.2, opacity: 0.15 },
    { x: 80, y: 0, scale: 1, opacity: 0.12 },
    { x: 30, y: 0, scale: 0.8, opacity: 0.1 },
    { x: 60, y: 0, scale: 0.9, opacity: 0.13 },
    { x: 45, y: 0, scale: 1.3, opacity: 0.17 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient for storm effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-zinc-900/20"></div>

      {/* Clouds */}
      {cloudPositions.map((position, i) => (
        <Cloud key={`cloud-${i}`} position={position} scale={position.scale} opacity={position.opacity} />
      ))}

      {/* Lightning bolts */}
      {lightningPositions.map((position, i) => (
        <LightningBolt
          key={`lightning-${i}`}
          delay={i * 2000}
          position={position}
          scale={position.scale}
          opacity={position.opacity}
        />
      ))}
    </div>
  )
}
