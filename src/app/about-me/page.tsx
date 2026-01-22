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

      {/* Interactive Timeline - Full Width */}
      <DeveloperJourneyTimeline/>
    </main>
  )
}
