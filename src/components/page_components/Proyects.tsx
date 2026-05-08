"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Filter, Search, X } from "lucide-react"
import { projectsData } from "@/data/proyectData"
import { EnhancedProjectCard } from "../compontents/EnhancedProjectCard"
import { ProjectModal } from "../sub-sections/ProjectModal"
import { useInViewOnReady } from "@/hooks/useInViewOnReady"

type CategoryFilter = "all" | "personal" | "client" | "featured"

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState(projectsData[0])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { ref: headerInViewRef, isReady: headerReady } = useInViewOnReady<HTMLDivElement>({ amount: 0.3 })

  const filteredProjects = useMemo(() => {
    let results = projectsData

    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter((project) => project.category === selectedCategory)
    }

    // Filter by search query (name or tech)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter((project) => {
        const matchesName = project.title.toLowerCase().includes(query) ||
                           project.description.toLowerCase().includes(query)
        const matchesTech = project.tech.some(t => t.toLowerCase().includes(query))
        return matchesName || matchesTech
      })
    }

    return results
  }, [selectedCategory, searchQuery])

  const handleProjectClick = (project: typeof projectsData[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <section
      id="projects"
      className="relative w-screen -mx-[calc((100vw-100%)/2)] bg-gradient-to-b from-black via-[#0a0a0a] to-black py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-1/4 w-1/2 h-1/3 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute bottom-1/4 left-0 w-2/5 h-2/5 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerInViewRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-cyan-500/70 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Featured <span className="text-cyan-400 drop-shadow-lg" style={{ textShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}>Projects</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Explore a curated selection of my work. From personal projects to enterprise solutions, each showcasing expertise in automation, architecture, and modern development.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <div className="relative group max-w-md mx-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur"></div>
            <div className="relative flex items-center bg-[#0a0a0a] border border-[#262626] rounded-lg">
              <Search className="absolute left-4 h-5 w-5 text-cyan-500/50" />
              <input
                type="text"
                placeholder="Search projects by name or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white placeholder:text-gray-600 pl-12 pr-10 py-3 focus:outline-none text-sm sm:text-base"
              />
              {searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 p-1 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12 sm:mb-16"
        >
          <Filter className="h-4 w-4 text-cyan-500/60" />
          {(["all", "personal", "client", "featured"] as const).map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/50"
                  : "bg-[#141414] border border-[#262626] text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
            </motion.button>
          ))}
        </motion.div>

        {/* Results count */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6 text-sm text-gray-400"
          >
            Found <span className="text-cyan-400 font-semibold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? "s" : ""}
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="cursor-pointer h-full"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <EnhancedProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="space-y-3">
              <Search className="h-12 w-12 mx-auto text-gray-600" />
              <p className="text-gray-400 text-lg">
                {searchQuery
                  ? `No projects found matching "${searchQuery}"`
                  : "No projects found in this category."}
              </p>
              {searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-cyan-100 transition-colors text-sm"
                >
                  Clear filters
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { label: "Projects", value: projectsData.length.toString() },
            { label: "Live", value: projectsData.filter(p => p.status === "live").length.toString() },
            { label: "Personal", value: projectsData.filter(p => p.category === "personal").length.toString() },
            { label: "Clients", value: projectsData.filter(p => p.category === "client").length.toString() },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-center"
            >
              <motion.div
                className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}

export default Projects
