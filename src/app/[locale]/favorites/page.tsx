import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import { navLinks } from "@/data/navlinks";
import FavoriteGamesPage from "@/components/sub-sections/FavoritesGames";

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
      ? "Mis Juegos — Librería Steam & Picks Personales | Artag"
      : "My Games — Steam Library & Personal Picks | Artag",
    description: es
      ? "Mi librería de juegos sincronizada con Steam, más mis picks curados en Epic Games y GOG. Explorá los juegos que me marcaron como desarrollador y persona."
      : "My game library, live-synced from Steam, plus curated picks from Epic Games and GOG. Explore the games that shaped me as a developer and person.",
    keywords: [
      "steam library",
      "gaming developer",
      "indie games",
      "video games colombia",
      "developer hobbies",
      "biblioteca steam",
      "desarrollador gamer",
      "juegos indie",
      "libreria de juegos",
    ],
    alternates: {
      canonical: es ? `${baseUrl}/es/favorites` : `${baseUrl}/favorites`,
      languages: { en: `${baseUrl}/favorites`, es: `${baseUrl}/es/favorites` },
    },
    openGraph: {
      title: es
        ? "Mis Juegos | Artag"
        : "My Games | Artag",
      description: es
        ? "Mi librería de juegos sincronizada con Steam y mis picks curados."
        : "My Steam library and curated game picks.",
      url: es ? `${baseUrl}/es/favorites` : `${baseUrl}/favorites`,
      type: "website",
      siteName: "Artag",
      locale: es ? "es_CO" : "en_US",
      images: [{ url: `${baseUrl}/og-favorites.png`, width: 1200, height: 630, alt: "Artag — My Games" }],
    },
    twitter: {
      card: "summary_large_image",
      title: es ? "Mis Juegos | Artag" : "My Games | Artag",
      description: es
        ? "Mi librería de juegos sincronizada con Steam y mis picks curados."
        : "My Steam library and curated game picks.",
      images: [`${baseUrl}/og-favorites.png`],
      site: "@artagdev",
      creator: "@artagdev",
    },
    robots: { index: true, follow: true },
  }
}

export default async function Page() {
    const locale = await getLocale()
    const links = navLinks[locale as "en" | "es"] ?? navLinks.en

    return (
        <main className="bg-zinc-950 min-h-screen">
            {/* Cosmic Navbar */}
            <CosmicNavbar links={links} currentPath="/favorites" />

            <div className="container mx-auto px-4 py-10">
                <FavoriteGamesPage />
            </div>
        </main>
    )
}