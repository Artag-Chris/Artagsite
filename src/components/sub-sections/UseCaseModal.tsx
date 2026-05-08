"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useEffect, useRef } from "react"
import type { UseCase } from "@/data/skillsData"

interface UseCaseModalProps {
  useCase: UseCase | null
  isOpen: boolean
  onClose: () => void
}

export function UseCaseModal({ useCase, isOpen, onClose }: UseCaseModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!useCase) return null

  const Icon = useCase.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 backdrop-blur-xl z-40"
            aria-hidden="true"
          />

          {/* Centering wrapper — clicks on empty area close the modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            onClick={handleBackdropClick}
          >
            {/* Modal — shares layoutId with the source card so Framer morphs
                position/size/rounded corners between them. */}
            <motion.div
              ref={modalRef}
              layoutId={`usecase-card-${useCase.id}`}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] shadow-2xl pointer-events-auto"
            >
            {/* Inner content fades in AFTER the layout morph completes,
                and fades out fast on close so the morph back is clean. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              {/* Header with close button */}
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 sm:p-8 bg-gradient-to-b from-[#141414] to-[#141414]/80 border-b border-[#262626]">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="relative p-3 rounded-xl bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#404040] flex-shrink-0"
                  >
                    <Icon className={`h-6 w-6 ${useCase.iconColor}`} />
                  </motion.div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl sm:text-3xl font-bold text-white line-clamp-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {useCase.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-cyan-500/70 text-xs sm:text-sm font-mono mt-2 uppercase tracking-widest"
                    >
                      Use Case Overview
                    </motion.p>
                  </div>
                </div>

                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  onClick={onClose}
                  className="flex-shrink-0 p-2 rounded-lg bg-black/50 hover:bg-black/80 text-gray-400 hover:text-cyan-400 transition-all duration-200 border border-[#262626] hover:border-cyan-500/40"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                {/* Problem Statement */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xs sm:text-sm font-mono text-cyan-500/60 mb-3 uppercase tracking-wider">
                    Problem
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{useCase.problem}</p>
                </motion.div>

                {/* Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className="text-xs sm:text-sm font-mono text-cyan-500/60 mb-3 uppercase tracking-wider">
                    Solution
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{useCase.solution}</p>
                </motion.div>

                {/* Capabilities */}
                {useCase.capabilities.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-cyan-500/60 mb-3 uppercase tracking-wider">
                      Key Capabilities
                    </h3>
                    <ul className="space-y-2">
                      {useCase.capabilities.map((capability, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          className="flex gap-3 text-sm sm:text-base text-gray-200"
                        >
                          <span className="text-cyan-400 font-bold flex-shrink-0 mt-1">✓</span>
                          <span>{capability}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Metrics */}
                {useCase.metrics.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-cyan-500/60 mb-4 uppercase tracking-wider">
                      Impact Metrics
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {useCase.metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 + idx * 0.05 }}
                          className="p-4 rounded-lg bg-black/50 border border-[#262626] hover:border-cyan-500/40 transition-colors"
                        >
                          <p className="text-cyan-400 font-bold text-lg sm:text-xl">{metric.value}</p>
                          <p className="text-gray-400 text-xs sm:text-sm mt-1">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tech Stack */}
                {useCase.techStack.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-cyan-500/60 mb-3 uppercase tracking-wider">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {useCase.techStack.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                          className="px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/25 text-xs sm:text-sm text-cyan-300 font-medium"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Process */}
                {useCase.process && useCase.process.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-cyan-500/60 mb-3 uppercase tracking-wider">
                      Process
                    </h3>
                    <ol className="space-y-2">
                      {useCase.process.map((step, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + idx * 0.05 }}
                          className="flex gap-3 text-sm sm:text-base text-gray-200"
                        >
                          <span className="text-cyan-400 font-bold flex-shrink-0">{idx + 1}.</span>
                          <span>{step}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                )}

                {/* Example */}
                {useCase.example && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-cyan-500/60 mb-3 uppercase tracking-wider">
                      Real-World Example
                    </h3>
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed italic">{useCase.example}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
