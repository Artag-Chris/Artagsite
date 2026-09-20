"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  Gamepad2,
  Ghost,
  Joystick,
  Rocket,
  Shield,
  Swords,
  Trophy,
  type LucideIcon,
} from "lucide-react"

const TOTAL_MESSAGES = 4
const LOADER_MESSAGE_MS = 1600

/**
 * Fixed positions so the SSR and hydration renders match exactly.
 * Each icon gently floats and pulses while the library loads.
 */
const ORBITING_ICONS: {
  Icon: LucideIcon
  size: number
  delay: number
  duration: number
  className: string
}[] = [
  { Icon: Trophy, size: 20, delay: 0.2, duration: 9, className: "top-[12%] left-[14%]" },
  { Icon: Rocket, size: 16, delay: 1.1, duration: 7, className: "top-[24%] right-[12%]" },
  { Icon: Swords, size: 18, delay: 0.6, duration: 8, className: "bottom-[26%] left-[16%]" },
  { Icon: Ghost, size: 20, delay: 1.7, duration: 10, className: "top-[52%] right-[17%]" },
  { Icon: Shield, size: 14, delay: 2.3, duration: 7.5, className: "bottom-[13%] right-[28%]" },
  { Icon: Joystick, size: 18, delay: 0.4, duration: 11, className: "bottom-[44%] left-[6%]" },
]

export default function GamesLoader() {
  const t = useTranslations("games.library")
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % TOTAL_MESSAGES)
    }, LOADER_MESSAGE_MS)
    return () => window.clearInterval(id)
  }, [])

  const messages = [t("loadingM1"), t("loadingM2"), t("loadingM3"), t("loadingM4")]

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={t("loading")}
      className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden md:min-h-[600px]"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl motion-safe:animate-pulse" />
        <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      {/* Floating accents */}
      {ORBITING_ICONS.map(({ Icon, size, delay, duration, className }) => (
        <motion.span
          key={className}
          aria-hidden
          className={`absolute ${className} text-cyan-400/25`}
          animate={{ opacity: [0.15, 0.65, 0.15], y: [0, -12, 0] }}
          transition={{ duration, delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Icon className="h-auto w-auto" style={{ width: size, height: size }} />
        </motion.span>
      ))}

      {/* Ringed gamepad */}
      <motion.div
        className="relative h-28 w-28"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30 border-t-cyan-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border-2 border-indigo-500/20 border-b-indigo-400/70"
          animate={{ rotate: -360 }}
          transition={{ duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Gamepad2 className="h-12 w-12 text-cyan-400 drop-shadow-[0_0_14px_rgba(6,182,212,0.55)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rotating status */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex min-h-6 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-sm text-zinc-300"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-cyan-400/70"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Indeterminate progress sweep */}
      <div className="mt-8 h-1 w-56 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500"
          animate={{ x: ["-110%", "340%"] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <span className="sr-only">{t("loading")}</span>
    </div>
  )
}