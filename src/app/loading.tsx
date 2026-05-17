"use client"

import { motion } from "framer-motion"
import { Terminal } from "lucide-react"

const lines = [
  "> Initializing session...",
  "> Loading resources...",
  "> Ready",
]

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Terminal icon */}
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Terminal className="w-8 h-8 text-cyan-400" />
        </motion.div>

        {/* Typing lines */}
        <div className="font-mono text-sm space-y-2">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              className="text-zinc-400"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.3, duration: 0.3 }}
            >
              {line}
              {i === lines.length - 1 && (
                <motion.span
                  className="inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              )}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
