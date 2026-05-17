"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 gap-6 px-4">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
        >
          <AlertTriangle className="w-16 h-16 text-red-400" />
        </motion.div>

        <h2 className="text-2xl font-display font-bold text-zinc-100 text-center">
          Something went wrong
        </h2>

        <p className="text-zinc-400 text-center max-w-md">
          An unexpected error occurred. Please try again.
        </p>

        <motion.button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </motion.button>
      </motion.div>
    </div>
  )
}
