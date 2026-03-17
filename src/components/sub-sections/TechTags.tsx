"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

interface TechTagsProps {
  techTags?: {
    [category: string]: string[]
  }
  allTech?: string[]
  onTagClick?: (tech: string) => void
}

export const TechTags: React.FC<TechTagsProps> = ({ techTags, allTech = [], onTagClick }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  // If no organized tags, group technologies by common categories
  const organizedTags = techTags || organizeTechByCategory(allTech)

  if (!organizedTags || Object.keys(organizedTags).length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Technology Stack</h3>
      
      <div className="space-y-3">
        {Object.entries(organizedTags).map(([category, technologies], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            {/* Category Header */}
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="flex items-center justify-between w-full p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors group"
            >
              <span className="text-sm font-semibold text-cyan-300">{category}</span>
              <motion.div
                animate={{ rotate: expandedCategory === category ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-cyan-400"
              >
                ▼
              </motion.div>
            </button>

            {/* Technologies Grid */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: expandedCategory === category ? 1 : 0,
                height: expandedCategory === category ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-3 bg-[#0a0a0a]/50 rounded-lg border border-[#262626]">
                {technologies.map((tech, i) => (
                  <motion.button
                    key={tech}
                    onClick={() => onTagClick?.(tech)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-200 hover:from-cyan-500/30 hover:to-indigo-500/30 hover:border-cyan-500/50 transition-all"
                  >
                    {tech}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* All Technologies at a glance */}
      <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 border border-indigo-500/10">
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">All Technologies</p>
        <div className="flex flex-wrap gap-1.5">
          {Object.values(organizedTags)
            .flat()
            .map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-xs bg-[#141414] border border-[#262626] text-gray-300"
              >
                {tech}
              </span>
            ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to organize technologies by category
function organizeTechByCategory(technologies: string[]): { [key: string]: string[] } {
  const categoryMap: { [key: string]: string[] } = {
    "Frontend": [],
    "Backend": [],
    "Database": [],
    "DevOps": [],
    "Tools": [],
  }

  const frontendTechs = ["React", "Next.js", "Vue", "Angular", "TailwindCSS", "Sass", "CSS", "HTML", "JavaScript", "TypeScript", "Framer Motion", "Chakra UI"]
  const backendTechs = ["Node.js", "Express", "Django", "Flask", "Python", "PHP", "Java", "C#", ".NET", "NestJS", "GraphQL"]
  const dbTechs = ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis", "DynamoDB", "Cassandra", "Elasticsearch"]
  const devOpsTechs = ["Docker", "AWS", "GCP", "Azure", "Kubernetes", "CI/CD", "GitHub Actions", "Jenkins"]
  const toolsTechs = ["Git", "Webpack", "Vite", "ESLint", "Jest", "Cypress", "Stripe", "Socket.io"]

  technologies.forEach((tech) => {
    if (frontendTechs.includes(tech)) categoryMap["Frontend"].push(tech)
    else if (backendTechs.includes(tech)) categoryMap["Backend"].push(tech)
    else if (dbTechs.includes(tech)) categoryMap["Database"].push(tech)
    else if (devOpsTechs.includes(tech)) categoryMap["DevOps"].push(tech)
    else if (toolsTechs.includes(tech)) categoryMap["Tools"].push(tech)
    else categoryMap["Tools"].push(tech)
  })

  // Remove empty categories
  return Object.fromEntries(
    Object.entries(categoryMap).filter(([_, techs]) => techs.length > 0)
  )
}

export default TechTags
