import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import {navLinks} from "@/data/navlinks";
import ResourcesPage from "@/components/sub-sections/resources-page";


export default function PrivateServersPage() {

    return (
        <main className="bg-zinc-900 min-h-screen">
            {/* Cosmic Navbar */}
            <CosmicNavbar links={navLinks} currentPath="/private-servers" />

            <div className="container mx-auto px-4 py-10">
                <div className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400">
                    <ResourcesPage />
                </div>
            </div>
        </main>
    )
}
