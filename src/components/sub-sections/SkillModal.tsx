"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { Skill } from "@/data/skillsData"

interface SkillModalProps {
  skill: Skill | null
  isOpen: boolean
  onClose: () => void
}

export function SkillModal({ skill, isOpen, onClose }: SkillModalProps) {
  if (!skill) return null

  const Icon = skill.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 transition-colors duration-200 cursor-pointer"
              >
                <X className="h-5 w-5 text-zinc-300" />
              </button>

              {/* Content */}
              <div className="relative p-8 z-10">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-zinc-800/80 shadow-lg shadow-emerald-500/20`}>
                    <Icon className={`h-8 w-8 ${skill.color}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{skill.name}</h2>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-zinc-300 text-base leading-relaxed">{skill.description}</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-tr-full pointer-events-none" />
              </div>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
