"use client"
import { ArrowLeft, BookOpen, Search, X } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { currentStudies, StudyIcon, getCategoriesWithCounts } from "@/data/currentstudies/currentStudiesData"

gsap.registerPlugin(ScrollTrigger)

export default function CurrentStudiesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<"active" | "completed" | "all">("active")
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrar estudios
  const filteredStudies = currentStudies.filter((study) => {
    // 1. Por status
    if (activeFilter !== "all" && study.status !== activeFilter) return false

    // 2. Por búsqueda (título + skills + descripción + categoría + provider)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return (
        study.title.toLowerCase().includes(query) ||
        study.category.toLowerCase().includes(query) ||
        study.provider.toLowerCase().includes(query) ||
        study.skills.some((skill) => skill.toLowerCase().includes(query)) ||
        study.description.toLowerCase().includes(query)
      )
    }
    return true
  })

  const categoriesWithCounts = getCategoriesWithCounts()

  useGSAP(
    () => {
      // Subtle entrance animation for study icons - SIN FLOATING
      gsap.utils.toArray(".study-icon").forEach((icon, index) => {
        gsap.from(icon as Element, {
          scale: 0.95,
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: icon as Element,
            start: "top 85%",
          },
          delay: index * 0.08,
        })
      })

      // Subtle hover scale effect
      const iconElements = document.querySelectorAll(".study-icon") as NodeListOf<HTMLElement>
      iconElements.forEach((iconElement) => {
        iconElement.addEventListener("mouseenter", () => {
          gsap.to(iconElement, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        iconElement.addEventListener("mouseleave", () => {
          gsap.to(iconElement, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Title animation
      gsap.from(".page-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })

      // Stats animation
      gsap.from(".study-stat", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      })

      // Search input animation
      gsap.from(".search-container", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
      })

      // Category widget animation
      gsap.from(".category-widget", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      })

      // Tabs animation
      gsap.from(".tabs-container", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.5,
      })

      // Background particles animation
      gsap.utils.toArray(".particle").forEach((particle) => {
        gsap.to(particle as Element, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          opacity: "random(0.3, 0.8)",
          duration: "random(15, 25)",
          ease: "none",
          repeat: -1,
          yoyo: true,
        })
      })
    },
    { scope: containerRef },
  )

  const totalStudies = currentStudies.length
  const activeStudies = currentStudies.filter((study) => study.status === "active").length
  const completedStudies = currentStudies.filter((study) => study.status === "completed").length
  const confidentStudies = currentStudies.filter(
    (study) => study.confidence === "confident" || study.confidence === "expert",
  ).length

  return (
    <main ref={containerRef} className="bg-zinc-900 min-h-screen relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Back button */}
        <Link
          href="/#about"
          className="inline-flex items-center text-blue-500 hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="page-title text-4xl md:text-6xl font-bold mb-6">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Learning Journey
            </span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            Continuously learning and expanding my skills through focused study programs and courses. Here's what I'm
            currently working on and how confident I feel about each technology.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
            <div className="study-stat text-center">
              <div className="text-3xl font-bold text-blue-400">{totalStudies}</div>
              <div className="text-sm text-zinc-400">Total Studies</div>
            </div>
            <div className="study-stat text-center">
              <div className="text-3xl font-bold text-emerald-400">{confidentStudies}</div>
              <div className="text-sm text-zinc-400">Confident In</div>
            </div>
            <div className="study-stat text-center">
              <div className="text-3xl font-bold text-blue-400">{activeStudies}</div>
              <div className="text-sm text-zinc-400">Active Studies</div>
            </div>
            <div className="study-stat text-center">
              <div className="text-3xl font-bold text-indigo-400">{completedStudies}</div>
              <div className="text-sm text-zinc-400">Completed</div>
            </div>
          </div>

          {/* Confidence Legend */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">🌱</span>
              <span className="text-orange-400">Beginner</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">📚</span>
              <span className="text-yellow-400">Intermediate</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">💪</span>
              <span className="text-blue-400">Confident</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">🚀</span>
              <span className="text-emerald-400">Expert</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown Widget */}
        <div className="category-widget max-w-4xl mx-auto mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm">
          <div className="text-sm font-semibold text-blue-300 mb-4">📚 Category Breakdown</div>
          <div className="flex flex-wrap gap-4">
            {categoriesWithCounts.map(([category, count]) => (
              <div
                key={category}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-blue-300">{category}</span>
                <span className="text-xs text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded-full">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar + Tabs Container */}
        <div className="search-container max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-8 border-b border-zinc-700">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search studies, skills, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="tabs-container flex gap-2">
            <button
              onClick={() => setActiveFilter("active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === "active"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                  : "text-zinc-400 bg-zinc-800/30 hover:bg-zinc-700/50"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter("completed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === "completed"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                  : "text-zinc-400 bg-zinc-800/30 hover:bg-zinc-700/50"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                  : "text-zinc-400 bg-zinc-800/30 hover:bg-zinc-700/50"
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Studies Grid */}
        {filteredStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
            {filteredStudies.map((study, index) => (
              <StudyIcon key={study.id} study={study} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 max-w-4xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No studies found</h3>
            <p className="text-zinc-400 mb-6">
              Try adjusting your search or filter. Remember, you can search by study name, skills, categories, and more!
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveFilter("all")
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-500 hover:to-cyan-400 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-400/20 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Learning Never Stops</h3>
          <p className="text-zinc-300 max-w-md mx-auto">
            Knowledge is power, and I'm committed to staying at the forefront of technology through continuous learning
            and hands-on practice.
          </p>
        </div>
      </div>
    </main>
  )
}
