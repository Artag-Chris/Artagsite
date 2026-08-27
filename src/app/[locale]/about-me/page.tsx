import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import CosmicNavbar from "@/components/compontents/cosmic-navbar"
import { navLinks } from "@/data/navlinks"
import DeveloperJourneyTimeline from "@/components/timeline/developer-journey-timeline"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title:
      locale === "es"
        ? "Sobre Mí | Artag — Trayectoria de Desarrollador Full-Stack"
        : "About Me | Artag — Full-Stack Developer Journey",
    description:
      locale === "es"
        ? "La historia detrás de Artag Dev: desarrollador autodidacta, emprendedor y solucionador de problemas. Desde la primera línea de código hasta construir para miles de usuarios."
        : "The story behind Artag Dev: self-taught developer, entrepreneur, and problem-solver. From first line of code to building for thousands of users.",
  }
}

export default async function AboutMePage() {
  const locale = await getLocale()
  const links = navLinks[locale as "en" | "es"] ?? navLinks.en

  return (
    <main className="bg-zinc-950 min-h-screen">
      {/* Cosmic Navbar */}
      <CosmicNavbar links={links} currentPath="/about-me" />

      {/* Interactive Timeline - Full Width */}
      <DeveloperJourneyTimeline/>
    </main>
  )
}
