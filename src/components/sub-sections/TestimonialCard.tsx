"use client"

import React from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Quote } from "lucide-react"
import TestimonialAvatar from "./TestimonialAvatar"
import { Testimonial } from "@/data/contactData"

interface TestimonialCardProps {
  testimonial: Testimonial
  isHovered?: boolean
  onHover?: () => void
  onHoverEnd?: () => void
  delay?: number
}

function TestimonialCard({
  testimonial,
  isHovered = false,
  onHover,
  onHoverEnd,
  delay = 0,
}: TestimonialCardProps) {
  const t = useTranslations("testimonials.relationship")
  const relationshipColors = {
    colleague: "bg-blue-500/10 text-blue-400/80 border-blue-500/20",
    manager: "bg-purple-500/10 text-purple-400/80 border-purple-500/20",
    mentee: "bg-green-500/10 text-green-400/80 border-green-500/20",
    friend: "bg-pink-500/10 text-pink-400/80 border-pink-500/20",
    client: "bg-amber-500/10 text-amber-400/80 border-amber-500/20",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onHoverStart={onHover}
      onHoverEnd={onHoverEnd}
      className="h-full"
    >
      <motion.div
        className="group relative h-full bg-[#111111]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 sm:p-8 transition-all duration-200 hover:border-white/10 flex flex-col"
        animate={{
          y: isHovered ? -3 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.1 }}
            className="mb-4"
          >
            <div className="inline-flex p-2 rounded-lg bg-white/5 border border-white/5">
              <Quote className="w-5 h-5 text-zinc-500" />
            </div>
          </motion.div>

          <motion.p
            className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-6 flex-grow italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
            style={{ fontFamily: "var(--font-body)" }}
          >
            &ldquo;{testimonial.text}&rdquo;
          </motion.p>

          <motion.div
            className="flex items-start gap-4 pt-4 border-t border-white/5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.3 }}
          >
            <TestimonialAvatar
              name={testimonial.name}
              linkedinUrl={testimonial.linkedinUrl}
              linkedinId={testimonial.avatar.linkedinId}
              size="md"
            />

            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-base truncate">
                {testimonial.name}
              </p>
              <p className="text-zinc-500 text-sm mb-2 truncate">
                {testimonial.title}
              </p>
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${
                  relationshipColors[testimonial.relationship]
                }`}
              >
                {t(testimonial.relationship)}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TestimonialCard
