import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getLocale } from "next-intl/server"
import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import {navLinks} from "@/data/navlinks";
import ResourcesPage from "@/components/sub-sections/resources-page";


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
