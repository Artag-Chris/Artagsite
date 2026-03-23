"use client"

import React from "react"
import { motion } from "framer-motion"
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
  // Relationship badge colors
  const relationshipColors = {
    colleague: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    manager: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    mentee: "bg-green-500/20 text-green-300 border-green-500/30",
    friend: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    client: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={onHover}
      onHoverEnd={onHoverEnd}
      className="h-full"
    >
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Testimonial Card */}
      <motion.div
        className="group relative h-full bg-gradient-to-br from-[#141414]/80 to-[#0a0a0a]/80 backdrop-blur-xl border border-[#262626] rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-2xl flex flex-col"
        animate={{
          y: isHovered ? -5 : 0,
          borderColor: isHovered ? "rgba(6, 182, 212, 0.3)" : "rgba(38, 38, 38, 1)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] rounded-2xl pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.1 }}
            className="mb-4"
          >
            <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 border border-cyan-500/30">
              <Quote className="w-5 h-5 text-cyan-400" />
            </div>
          </motion.div>

          {/* Testimonial Text */}
          <motion.p
            className="text-gray-200 text-base sm:text-lg leading-relaxed mb-6 flex-grow italic"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.2 }}
            style={{ fontFamily: "var(--font-body)" }}
          >
            "{testimonial.text}"
          </motion.p>

          {/* Author Info */}
          <motion.div
            className="flex items-start gap-4 pt-4 border-t border-[#262626]/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.3 }}
          >
            {/* Avatar */}
            <TestimonialAvatar
              name={testimonial.name}
              linkedinUrl={testimonial.linkedinUrl}
              linkedinId={testimonial.avatar.linkedinId}
              size="md"
            />

            {/* Name, Title, and Relationship */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-base truncate">
                {testimonial.name}
              </p>
              <p className="text-gray-400 text-sm mb-2 truncate">
                {testimonial.title}
              </p>
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${
                  relationshipColors[testimonial.relationship]
                }`}
              >
                {testimonial.relationship.charAt(0).toUpperCase() +
                  testimonial.relationship.slice(1)}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -ml-12 -mb-12"></div>
      </motion.div>
    </motion.div>
  )
}

export default TestimonialCard
