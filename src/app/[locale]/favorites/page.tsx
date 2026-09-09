import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import {navLinks} from "@/data/navlinks";
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
      ? "Juegos Favoritos — Mis Picks Personales | Artag"
      : "Favorite Games — My Personal Picks | Artag",
    description: es
      ? "Los juegos que más me han marcado como desarrollador y persona. Desde títulos indie hasta clásicos que definieron mi pasión por la tecnología."
      : "The games that shaped me as a developer and person. From indie titles to classics that defined my passion for technology.",
    keywords: [
      "favorite games",
      "gaming developer",
      "indie games",
      "video games colombia",
      "developer hobbies",
      "juegos favoritos",
      "desarrollador gamer",
      "juegos indie",
    ],
    alternates: {
      canonical: es ? `${baseUrl}/es/favorites` : `${baseUrl}/favorites`,
      languages: { en: `${baseUrl}/favorites`, es: `${baseUrl}/es/favorites` },
    },
    openGraph: {
      title: es
        ? "Juegos Favoritos | Artag"
        : "Favorite Games | Artag",
      description: es
        ? "Los juegos que más me han marcado como desarrollador y persona."
        : "The games that shaped me as a developer and person.",
      url: es ? `${baseUrl}/es/favorites` : `${baseUrl}/favorites`,
      type: "website",
      siteName: "Artag",
      locale: es ? "es_CO" : "en_US",
      images: [{ url: `${baseUrl}/og-favorites.png`, width: 1200, height: 630, alt: "Artag — Favorite Games" }],
    },
    twitter: {
      card: "summary_large_image",
      title: es ? "Juegos Favoritos | Artag" : "Favorite Games | Artag",
      description: es
        ? "Los juegos que más me han marcado como desarrollador y persona."
        : "The games that shaped me as a developer and person.",
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
        <main className="bg-zinc-900 min-h-screen">
            {/* Cosmic Navbar */}
            <CosmicNavbar links={links} currentPath="/favorites" />

            <div className="container mx-auto px-4 py-10">
                {/* Botón de regresar */}
            
                <div className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400">
                    <FavoriteGamesPage />
                </div>
            </div>
        </main>
    )
}
