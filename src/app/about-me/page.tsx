import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import CosmicNavbar from "@/components/compontents/cosmic-navbar"
import { navLinks } from "@/data/navlinks"
import DeveloperJourneyTimeline from "@/components/timeline/developer-journey-timeline"

export const metadata: Metadata = {
  title: "About Me | Artag — Full-Stack Developer Journey",
  description:
    "The story behind Artag Dev: self-taught developer, entrepreneur, and problem-solver. From first line of code to building for thousands of users.",
}

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
