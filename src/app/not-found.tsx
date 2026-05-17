"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 gap-6 px-4">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          className="text-8xl font-display font-bold text-cyan-400"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.span>

        <h2 className="text-2xl font-display font-bold text-zinc-100 text-center">
          Page not found
        </h2>

        <p className="text-zinc-400 text-center max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            Go home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
