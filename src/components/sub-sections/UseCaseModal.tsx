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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            onClick={handleBackdropClick}
          >
            <motion.div
              ref={modalRef}
              layoutId={`usecase-card-${useCase.id}`}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111111] border border-white/5 shadow-2xl pointer-events-auto"
            >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 sm:p-8 bg-[#111111] border-b border-white/5">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="relative p-3 rounded-xl bg-white/5 border border-white/5 flex-shrink-0"
                  >
                    <Icon className={`h-6 w-6 ${useCase.iconColor}`} />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <motion.h2
                      initial={{ opacity: 0, x: -15 }}
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
                      className="text-zinc-500 text-xs sm:text-sm font-mono mt-2 uppercase tracking-widest"
                    >
                      Use Case Overview
                    </motion.p>
                  </div>
                </div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  onClick={onClose}
                  className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all duration-200 border border-white/5"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xs sm:text-sm font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                    Problem
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">{useCase.problem}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className="text-xs sm:text-sm font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                    Solution
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">{useCase.solution}</p>
                </motion.div>

                {useCase.capabilities.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                      Key Capabilities
                    </h3>
                    <ul className="space-y-2">
                      {useCase.capabilities.map((capability, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          className="flex gap-3 text-sm sm:text-base text-zinc-200"
                        >
                          <span className="text-blue-400 font-bold flex-shrink-0 mt-1">✓</span>
                          <span>{capability}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {useCase.metrics.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-zinc-500 mb-4 uppercase tracking-wider">
                      Impact Metrics
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {useCase.metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 + idx * 0.05 }}
                          className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                           <p className="text-blue-400 font-bold text-lg sm:text-xl">{metric.value}</p>
                          <p className="text-zinc-500 text-xs sm:text-sm mt-1">{metric.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {useCase.techStack.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {useCase.techStack.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                           className="px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-blue-300 font-medium"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {useCase.process && useCase.process.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                      Process
                    </h3>
                    <ol className="space-y-2">
                      {useCase.process.map((step, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.45 + idx * 0.05 }}
                          className="flex gap-3 text-sm sm:text-base text-zinc-200"
                        >
                           <span className="text-blue-400 font-bold flex-shrink-0">{idx + 1}.</span>
                          <span>{step}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                )}

                {useCase.example && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-xs sm:text-sm font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                      Real-World Example
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-200 leading-relaxed italic">{useCase.example}</p>
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
