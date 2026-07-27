"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import type { Skill } from "@/data/skillsData"

export function SkillCard({ skill, index, onCardClick }: { skill: Skill; index: number; onCardClick: (skill: Skill) => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="group h-full"
    >
      <div
        className="relative h-full overflow-hidden cursor-pointer rounded-xl transition-all duration-200 bg-[#111111] border border-white/5 group-hover:border-white/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onCardClick(skill)}
      >
        <div className="relative p-6 flex flex-col z-10 h-full min-h-[180px]">
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`relative p-3 rounded-lg bg-white/5 border border-white/5 flex-shrink-0 transition-all duration-200`}
            >
              <Icon className={`h-7 w-7 ${skill.color} transition-transform duration-200 group-hover:scale-110`} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 
                className="font-bold text-lg text-white transition-colors duration-200 truncate" 
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {skill.name}
              </h3>
              <p className="text-zinc-600 text-xs font-medium mt-0.5">Technology</p>
            </div>
          </div>

          <div className="flex-1">
            <div className="md:hidden">
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">{skill.description}</p>
            </div>

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
                duration: 0.2,
                ease: [0, 0, 0.2, 1],
                opacity: { duration: 0.15, delay: isHovered ? 0.05 : 0 }
              }}
              className="hidden md:block overflow-hidden"
            >
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-5">{skill.description}</p>
            </motion.div>
          </div>

          <motion.div
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4"
          />
        </div>
      </div>
    </motion.div>
  )
}
