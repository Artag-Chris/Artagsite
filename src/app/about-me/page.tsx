"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CosmicNavbar from "@/components/compontents/cosmic-navbar"
import { navLinks } from "@/data/navlinks"
import DeveloperJourneyTimeline from "@/components/timeline/developer-journey-timeline"


export default function AboutMePage() {
  return (
    <main className="bg-zinc-950 min-h-screen">
      {/* Cosmic Navbar */}
      <CosmicNavbar links={navLinks} currentPath="/about-me" />

      {/* Intro section */}
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
           Witness my evolution: from exploration and loss to resilient coding career. Where personal growth and family inspiration fuel professional development against all odds.
          </p>
          <br />
          <p className="text-white">
            Navigate my life story through this interactive journey: GSAP-powered animations bring to life how career shifts, personal challenges, and family milestones shaped my path. Each scroll-triggered revelation shows the profound connection between life experiences and professional growth.
          </p>
        </div>
      </div>

      {/* Interactive Timeline - Full Width */}
      <DeveloperJourneyTimeline/>
    </main>
  )
}
