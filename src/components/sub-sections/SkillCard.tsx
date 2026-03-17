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
        y: -8,
        transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
      }}
      className="group"
    >
      <div
        className="relative bg-black border border-gray-700 backdrop-blur-sm overflow-hidden h-auto min-h-[160px] cursor-pointer transition-all duration-300 hover:border-cyan-500/50 active:scale-95 rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onCardClick(skill)}
      >
        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
        />

        {/* Border gradient accent */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Click indicator badge - Top right */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-md bg-cyan-500/20 border border-cyan-500/50 text-xs text-cyan-400 transition-all duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          Click
        </div>

        <div className="relative p-6 flex flex-col z-10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`relative p-2.5 rounded-lg bg-gray-900/80 group-hover:bg-black transition-all duration-300 ${isHovered ? "shadow-lg shadow-cyan-500/20" : ""}`}
            >
              <Icon className={`h-6 w-6 ${skill.color} transition-transform duration-300 group-hover:scale-110`} />
              <div
                className={`absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${skill.color.replace("text-", "bg-")}`}
              />
            </div>
            <h3 className="font-semibold text-lg text-white group-hover:text-cyan-400 transition-colors duration-300" style={{ fontFamily: 'var(--font-body)' }}>
              {skill.name}
            </h3>
          </div>

          {/* Mobile - Always show description */}
          <div className="md:hidden flex-1">
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{skill.description}</p>
          </div>

          {/* Desktop - Expandable description on hover */}
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={isHovered ? { 
              height: "auto", 
              opacity: 1,
              marginTop: 8
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
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">{skill.description}</p>
          </motion.div>

          {/* Top right gradient accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}
