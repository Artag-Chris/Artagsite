"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import type { Skill } from "@/data/skillsData"

export function SkillCard({ skill, index, onCardClick }: { skill: Skill; index: number; onCardClick: (skill: Skill) => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{
        y: -12,
        transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
      }}
      className="group h-full"
    >
      <div
        className="relative h-full overflow-hidden cursor-pointer rounded-xl transition-all duration-300 active:scale-95 bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] group-hover:border-cyan-500/80 group-hover:from-[#0f0f0f] group-hover:to-[#1a1a1a]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onCardClick(skill)}
      >
        {/* Animated grid background overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          style={{
            backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Enhanced glow effect on hover - Multi-layered */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
        />

        {/* Corner accent light - Top right */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 -mr-12 -mt-12" />

        {/* Corner accent light - Bottom left */}
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/15 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -ml-8 -mb-8" />

        {/* Animated inner border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-px">
          <div className="absolute inset-0 rounded-xl bg-[#0a0a0a]" />
        </div>

        {/* Click indicator badge - Top right with animation */}
        <motion.div
          animate={isHovered ? { 
            opacity: 1,
            scale: 1,
            x: 0
          } : {
            opacity: 0,
            scale: 0.8,
            x: 8
          }}
          transition={{ duration: 0.3 }}
          className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-cyan-500/25 border border-cyan-500/60 text-xs text-cyan-300 font-semibold transition-all z-20 backdrop-blur-sm`}
        >
          Tap
        </motion.div>

        <div className="relative p-6 flex flex-col z-10 h-full min-h-[180px]">
          {/* Header: Icon + Title */}
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              animate={isHovered ? { 
                scale: 1.1,
                boxShadow: '0 0 24px rgba(6, 182, 212, 0.4)'
              } : {
                scale: 1,
                boxShadow: '0 0 0px rgba(6, 182, 212, 0)'
              }}
              transition={{ duration: 0.3 }}
              className={`relative p-3 rounded-lg bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#404040] group-hover:border-cyan-500/40 flex-shrink-0 transition-all duration-300`}
            >
              <Icon className={`h-7 w-7 ${skill.color} transition-transform duration-300 group-hover:scale-125 group-hover:drop-shadow-lg`} style={{
                filter: isHovered ? `drop-shadow(0 0 12px var(--${skill.color.replace('text-', '')}))` : 'none'
              }} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 
                className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors duration-300 truncate" 
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {skill.name}
              </h3>
              <p className="text-gray-500 text-xs font-medium mt-0.5">Technology</p>
            </div>
          </div>

          {/* Description - Always visible on mobile, expandable on desktop */}
          <div className="flex-1">
            {/* Mobile - Always show description */}
            <div className="md:hidden">
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{skill.description}</p>
            </div>

            {/* Desktop - Expandable description on hover */}
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={isHovered ? { 
                height: "auto", 
                opacity: 1,
                marginTop: 12
              } : {
                height: 0,
                opacity: 0,
                marginTop: 0
              }}
              transition={{ 
                duration: 0.3,
                ease: [0, 0, 0.2, 1],
                opacity: { duration: 0.25, delay: isHovered ? 0.05 : 0 }
              }}
              className="hidden md:block overflow-hidden"
            >
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-5">{skill.description}</p>
            </motion.div>
          </div>

          {/* Bottom gradient divider */}
          <motion.div
            animate={isHovered ? { 
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 4
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-4"
          />
        </div>
      </div>
    </motion.div>
  )
}
