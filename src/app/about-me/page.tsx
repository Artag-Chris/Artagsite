"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CosmicNavbar from "@/components/compontents/cosmic-navbar"
import { navLinks } from "@/data/navlinks"
import DeveloperJourneyTimeline from "@/components/timeline/developer-journey-timeline"


export default function AboutMePage() {
  return (
    <main className="bg-zinc-900 min-h-screen">
      {/* Cosmic Navbar */}
      <CosmicNavbar links={navLinks} currentPath="/about-me" />

      <div className="container mx-auto px-4 py-10">
        {/* Botón de regresar */}
        <Link href="/#about" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Contenido de la sección */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          My <span className="text-emerald-500">Journey</span>
        </h1>

        <div className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400 mb-16">
          <p className="lead text-xl text-zinc-300">
            Explore the timeline of my development career, from my first coding experiences to my current professional
            endeavors.
          </p>
          <p className="text-white">
            This interactive journey highlights the key milestones, challenges, and achievements that have shaped me as
            a developer and person.
          </p>
        </div>

        {/* Interactive Timeline */}
        <DeveloperJourneyTimeline />
      </div>
    </main>
  )
}
