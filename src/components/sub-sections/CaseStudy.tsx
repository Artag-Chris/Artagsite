"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Lightbulb, Target } from "lucide-react"

interface CaseStudy {
  problem: string
  solution: string
  results: string[]
  keyLearnings?: string[]
  challenges?: string[]
}

interface CaseStudyProps {
  caseStudy: CaseStudy
}

export const CaseStudyComponent: React.FC<CaseStudyProps> = ({ caseStudy }) => {
  const [expandedSection, setExpandedSection] = useState<"problem" | "solution" | "results" | "learnings" | "challenges" | null>(
    "problem"
  )

  const sections = [
    {
      id: "problem" as const,
      title: "Problem",
      icon: AlertCircle,
      content: caseStudy.problem,
      color: "from-red-500/20 to-red-500/5 border-red-500/20",
      iconColor: "text-red-400",
    },
    {
      id: "solution" as const,
      title: "Solution",
      icon: Target,
      content: caseStudy.solution,
      color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
      iconColor: "text-cyan-400",
    },
  ]

  const listSections = [
    {
      id: "results" as const,
      title: "Results",
      icon: CheckCircle2,
      items: caseStudy.results,
      color: "from-green-500/20 to-green-500/5 border-green-500/20",
      iconColor: "text-green-400",
    },
    {
      id: "learnings" as const,
      title: "Key Learnings",
      icon: Lightbulb,
      items: caseStudy.keyLearnings || [],
      color: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      id: "challenges" as const,
      title: "Challenges",
      icon: AlertCircle,
      items: caseStudy.challenges || [],
      color: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
      iconColor: "text-orange-400",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Case Study</h3>

      {/* Problem & Solution */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-3"
      >
        {sections.map((section, idx) => {
          const Icon = section.icon
          return (
            <motion.button
              key={section.id}
              variants={itemVariants}
              onClick={() =>
                setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )
              }
              className={`w-full p-4 rounded-lg bg-gradient-to-r ${section.color} border text-left hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 ${section.iconColor} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{section.title}</h4>
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity:
                        expandedSection === section.id ? 1 : 0.7,
                      height: expandedSection === section.id ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`text-sm leading-relaxed ${
                      expandedSection === section.id
                        ? "text-gray-300"
                        : "text-gray-400 line-clamp-1"
                    }`}
                  >
                    {section.content}
                  </motion.p>
                </div>
                <motion.div
                  animate={{
                    rotate: expandedSection === section.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-400"
                >
                  ▼
                </motion.div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Results, Learnings, Challenges */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-3"
      >
        {listSections
          .filter((section) => section.items.length > 0)
          .map((section, idx) => {
            const Icon = section.icon
            return (
              <motion.button
                key={section.id}
                variants={itemVariants}
                onClick={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id
                  )
                }
                className={`w-full p-4 rounded-lg bg-gradient-to-r ${section.color} border text-left hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${section.iconColor}`} />
                    <h4 className="font-semibold text-white">
                      {section.title}
                    </h4>
                    <span className="text-xs text-gray-400 ml-1">
                      ({section.items.length})
                    </span>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedSection === section.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                  >
                    ▼
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: expandedSection === section.id ? 1 : 0,
                    height: expandedSection === section.id ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 mt-3 pt-3 border-t border-white/10">
                    {section.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <CheckCircle2 className={`h-4 w-4 ${section.iconColor} flex-shrink-0 mt-0.5`} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.button>
            )
          })}
      </motion.div>
    </div>
  )
}

export default CaseStudyComponent
