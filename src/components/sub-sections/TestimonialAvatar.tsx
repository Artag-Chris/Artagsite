"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TestimonialAvatarProps {
  name: string
  linkedinUrl: string
  linkedinId?: string
  size?: "sm" | "md" | "lg"
}

function TestimonialAvatar({
  name,
  linkedinUrl,
  linkedinId,
  size = "md",
}: TestimonialAvatarProps) {
  const [imageError, setImageError] = useState(false)

  // Get initials from name
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()

  // Size mappings
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-base",
    lg: "w-16 h-16 text-lg",
  }

  const linkedinPhotoUrl = linkedinId
    ? `https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADoDDoDoCgAAAA/profile-displayphoto-shrink_${size === "lg" ? "400_400" : size === "sm" ? "100_100" : "200_200"}/0/1234567890?e=1234567890&v=beta&t=ABC123`
    : undefined

  return (
    <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`${sizeClasses[size]} rounded-lg overflow-hidden border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 flex items-center justify-center cursor-pointer relative group`}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 -z-10"></div>

        {/* LinkedIn photo if available and loaded successfully */}
        {!imageError && linkedinId && (
          <img
            src={linkedinPhotoUrl}
            alt={name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        )}

        {/* Initials fallback */}
        {imageError || !linkedinId ? (
          <div className="w-full h-full flex items-center justify-center font-bold text-cyan-400 bg-gradient-to-br from-cyan-500/30 to-indigo-500/20">
            {initials}
          </div>
        ) : null}

        {/* LinkedIn icon on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-indigo-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur -z-10"></div>
      </motion.div>
    </Link>
  )
}

export default TestimonialAvatar
