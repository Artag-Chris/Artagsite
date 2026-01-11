"use client"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { currentStudies, StudyIcon } from "@/data/currentstudies/currentStudiesData"

gsap.registerPlugin(ScrollTrigger)

export default function CurrentStudiesPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Floating animation for study icons
      gsap.utils.toArray(".study-icon").forEach((icon, index) => {
        // Initial animation - icons appear with scale
        gsap.from(icon as Element, {
          scale: 0,
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: icon as Element,
            start: "top 85%",
          },
          delay: index * 0.1,
        })

        // Continuous floating animation
        gsap.to(icon as Element, {
          y: "random(-8, 8)",
          duration: "random(5, 8)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        })

        // Subtle hover scale effect
        const iconElement = icon as HTMLElement
        iconElement.addEventListener("mouseenter", () => {
          gsap.to(icon as Element, {
            scale: 1.02,
            y: -3,
            duration: 0.4,
            ease: "power2.out",
          })
        })

        iconElement.addEventListener("mouseleave", () => {
          gsap.to(icon as Element, {
            scale: 1,
            y: 0,
            duration: 0.4,
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
        <div className="text-center mb-16">
          <h1 className="page-title text-4xl md:text-6xl font-bold mb-6">
            Current{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Studies</span>
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
            Continuously learning and expanding my skills through focused study programs and courses. Here's what I'm
            currently working on and how confident I feel about each technology.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
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
          <div className="flex justify-center gap-6 mb-8">
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

        {/* Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {currentStudies.map((study, index) => (
            <StudyIcon key={study.id} study={study} index={index} />
          ))}
        </div>

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
