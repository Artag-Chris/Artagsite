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
  const es = locale === "es"
  const baseUrl = "https://www.artagdev.com.co"

  return {
    title: es
      ? "Sobre Mí | Artag — Trayectoria de Desarrollador Full-Stack"
      : "About Me | Artag — Full-Stack Developer Journey",
    description: es
      ? "La historia detrás de Artag Dev: desarrollador autodidacta, emprendedor y solucionador de problemas. Desde la primera línea de código hasta construir para miles de usuarios."
      : "The story behind Artag Dev: self-taught developer, entrepreneur, and problem-solver. From first line of code to building for thousands of users.",
    keywords: [
      "about artag",
      "full-stack developer colombia",
      "self-taught developer story",
      "developer journey",
      "sobre mí desarrollador",
      "historia desarrollador",
      "desarrollador autodidacta colombia",
    ],
    alternates: {
      canonical: es ? `${baseUrl}/es/about-me` : `${baseUrl}/about-me`,
      languages: { en: `${baseUrl}/about-me`, es: `${baseUrl}/es/about-me` },
    },
    openGraph: {
      title: es
        ? "Sobre Mí | Artag — Trayectoria de Desarrollador"
        : "About Me | Artag — Developer Journey",
      description: es
        ? "La historia detrás de Artag Dev: desarrollador autodidacta construyendo para miles de usuarios."
        : "The story behind Artag Dev: self-taught developer building for thousands of users.",
      url: es ? `${baseUrl}/es/about-me` : `${baseUrl}/about-me`,
      type: "website",
      siteName: "Artag",
      locale: es ? "es_CO" : "en_US",
      images: [{ url: `${baseUrl}/og-about.png`, width: 1200, height: 630, alt: "Artag — About Me" }],
    },
    twitter: {
      card: "summary_large_image",
      title: es
        ? "Sobre Mí | Artag — Trayectoria de Desarrollador"
        : "About Me | Artag — Developer Journey",
      description: es
        ? "La historia detrás de Artag Dev: desarrollador autodidacta construyendo para miles de usuarios."
        : "The story behind Artag Dev: self-taught developer building for thousands of users.",
      images: [`${baseUrl}/og-about.png`],
      site: "@artagdev",
      creator: "@artagdev",
    },
    robots: { index: true, follow: true },
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
