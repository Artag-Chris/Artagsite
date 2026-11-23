import type { Metadata } from "next"
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
      ? "Mis Juegos — Biblioteca Steam, Epic & GOG | Artag"
      : "My Games — Steam, Epic & GOG Library | Artag",
    description: es
      ? "Mi biblioteca de videojuegos sincronizada con Steam, Epic Games y GOG. Explora los juegos que me marcaron como desarrollador y persona."
      : "My video game library live-synced across Steam, Epic Games, and GOG. Explore the games that shaped me as a developer and person.",
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
      languages: {
        en: `${baseUrl}/favorites`,
        es: `${baseUrl}/es/favorites`,
        "x-default": `${baseUrl}/favorites`,
      },
    },
    openGraph: {
      title: es
        ? "Mis Juegos | Artag"
        : "My Games | Artag",
      description: es
        ? "Mi biblioteca de juegos sincronizada con Steam, Epic Games y GOG."
        : "My game library live-synced across Steam, Epic Games, and GOG.",
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
        ? "Mi biblioteca de juegos sincronizada con Steam, Epic Games y GOG."
        : "My game library live-synced across Steam, Epic Games, and GOG.",
      images: [`${baseUrl}/og-favorites.png`],
      site: "@artagdev",
      creator: "@artagdev",
    },
    robots: { index: true, follow: true },
  }
}

export default async function Page() {

    return (
        <main className="bg-zinc-950 min-h-screen">

            <div className="container mx-auto px-4 py-10">
                <FavoriteGamesPage />
            </div>
        </main>
    )
}