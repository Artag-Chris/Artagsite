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
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group"
    >
      <Card
        className="relative bg-zinc-900/50 border-zinc-800/50 backdrop-blur-sm overflow-hidden h-auto min-h-[160px] cursor-pointer transition-all duration-300 hover:border-emerald-500/50 active:scale-95"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onCardClick(skill)}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
        />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Click indicator badge - Top right */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/50 text-xs text-emerald-400 transition-all duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          Click
        </div>

        <CardContent className="relative p-6 flex flex-col z-10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`relative p-2.5 rounded-xl bg-zinc-800/80 group-hover:bg-zinc-800 transition-all duration-300 ${isHovered ? "shadow-lg shadow-emerald-500/20" : ""}`}
            >
              <Icon className={`h-6 w-6 ${skill.color} transition-transform duration-300 group-hover:scale-110`} />
              <div
                className={`absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${skill.color.replace("text-", "bg-")}`}
              />
            </div>
            <h3 className="font-semibold text-lg text-white group-hover:text-emerald-400 transition-colors duration-300">
              {skill.name}
            </h3>
          </div>

          {/* Mobile - Always show description */}
          <div className="md:hidden flex-1">
            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{skill.description}</p>
          </div>

          {/* Desktop - Expandable description on hover */}
          <div className={`hidden md:block transition-all duration-500 ease-in-out overflow-hidden ${
            isHovered ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}>
            <p className="text-zinc-300 text-sm leading-relaxed line-clamp-4">{skill.description}</p>
          </div>

          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  )
}
