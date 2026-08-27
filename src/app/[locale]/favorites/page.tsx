import { getLocale } from "next-intl/server"
import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import {navLinks} from "@/data/navlinks";
import FavoriteGamesPage from "@/components/sub-sections/FavoritesGames";


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
