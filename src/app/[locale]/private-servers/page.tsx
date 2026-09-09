import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getLocale } from "next-intl/server"
import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import {navLinks} from "@/data/navlinks";
import ResourcesPage from "@/components/sub-sections/resources-page";

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
      ? "Servidores Privados — Recursos y Guías | Artag"
      : "Private Servers — Resources & Guides | Artag",
    description: es
      ? "Guías, tutoriales y recursos para configurar y administrar servidores privados de videojuegos. Experiencia real en infraestructura de gaming."
      : "Guides, tutorials and resources for setting up and managing private game servers. Real experience in gaming infrastructure.",
    keywords: [
      "private servers",
      "game server hosting",
      "server administration",
      "gaming infrastructure",
      "servidores privados",
      "administración de servidores",
      "hosting gaming",
    ],
    alternates: {
      canonical: es ? `${baseUrl}/es/private-servers` : `${baseUrl}/private-servers`,
      languages: { en: `${baseUrl}/private-servers`, es: `${baseUrl}/es/private-servers` },
    },
    openGraph: {
      title: es
        ? "Servidores Privados | Artag"
        : "Private Servers | Artag",
      description: es
        ? "Guías y recursos para servidores privados de videojuegos."
        : "Guides and resources for private game servers.",
      url: es ? `${baseUrl}/es/private-servers` : `${baseUrl}/private-servers`,
      type: "website",
      siteName: "Artag",
      locale: es ? "es_CO" : "en_US",
      images: [{ url: `${baseUrl}/og-servers.png`, width: 1200, height: 630, alt: "Artag — Private Servers" }],
    },
    twitter: {
      card: "summary_large_image",
      title: es ? "Servidores Privados | Artag" : "Private Servers | Artag",
      description: es
        ? "Guías y recursos para servidores privados de videojuegos."
        : "Guides and resources for private game servers.",
      images: [`${baseUrl}/og-servers.png`],
      site: "@artagdev",
      creator: "@artagdev",
    },
    robots: { index: true, follow: true },
  }
}

export default async function PrivateServersPage() {
    const locale = await getLocale()
    const links = navLinks[locale as "en" | "es"] ?? navLinks.en

    return (
        <main className="bg-zinc-900 min-h-screen">
            {/* Cosmic Navbar */}
            <CosmicNavbar links={links} currentPath="/private-servers" />

            <div className="container mx-auto px-4 py-10 pt-32 md:pt-40">
                <div className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400">
                    <ResourcesPage />
                </div>
            </div>
        </main>
    )
}
