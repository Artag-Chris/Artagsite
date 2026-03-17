"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Star, GitFork, Eye } from "lucide-react"

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
  language?: string
  description?: string
  lastUpdate?: string
}

interface GitHubStatsProps {
  repo: string // Format: "username/repo"
}

export const GitHubStats: React.FC<GitHubStatsProps> = ({ repo }) => {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            // Si tienes un GitHub token en variables de entorno, úsalo aquí
            ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
              Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            }),
          },
        })

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const data = await response.json()

        setStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          watchers: data.watchers_count || 0,
          language: data.language || undefined,
          description: data.description || undefined,
          lastUpdate: data.updated_at ? new Date(data.updated_at).toLocaleDateString() : undefined,
        })
        setError(null)
      } catch (err) {
        console.error("Error fetching GitHub data:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub data")
        // Set default values on error
        setStats({
          stars: 0,
          forks: 0,
          watchers: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    if (repo) {
      fetchGitHubData()
    }
  }, [repo])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 rounded-lg bg-[#141414] border border-[#262626] animate-pulse"
      >
        <div className="flex items-center gap-2 mb-3">
          <Github className="h-5 w-5 text-gray-600" />
          <div className="h-4 w-32 bg-gray-700 rounded" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-gray-700 rounded" />
          ))}
        </div>
      </motion.div>
    )
  }

  if (error || !stats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400"
      >
        Could not load GitHub stats
      </motion.div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const statItems = [
    { icon: Star, label: "Stars", value: stats.stars, color: "text-yellow-400" },
    { icon: GitFork, label: "Forks", value: stats.forks, color: "text-cyan-400" },
    { icon: Eye, label: "Watchers", value: stats.watchers, color: "text-indigo-400" },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Github className="h-5 w-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-white">Repository Stats</h3>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {statItems.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="p-3 rounded-lg bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] text-center hover:border-cyan-500/30 transition-colors"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-2 flex justify-center"
              >
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </motion.div>
              <motion.div
                className="text-xl sm:text-2xl font-bold text-white mb-0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
              >
                {formatNumber(stat.value)}
              </motion.div>
              <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Additional Info */}
      <motion.div
        variants={itemVariants}
        className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-xs sm:text-sm space-y-2"
      >
        {stats.language && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Main Language</span>
            <span className="text-cyan-300 font-medium">{stats.language}</span>
          </div>
        )}
        {stats.lastUpdate && (
          <div className="flex justify-between items-center pt-2 border-t border-cyan-500/10">
            <span className="text-gray-400">Last Updated</span>
            <span className="text-indigo-300 font-medium">{stats.lastUpdate}</span>
          </div>
        )}
      </motion.div>

      {/* Repository Link */}
      <motion.a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white transition-colors text-sm font-medium"
      >
        <Github className="h-4 w-4" />
        View on GitHub
      </motion.a>
    </motion.div>
  )
}

// Helper function to format large numbers
function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k"
  }
  return num.toString()
}

export default GitHubStats
