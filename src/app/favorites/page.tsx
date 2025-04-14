import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import {navLinks} from "@/data/navlinks";


export default function AboutMePage() {

    return (
        <main className="bg-zinc-900 min-h-screen">
            {/* Cosmic Navbar */}
            <CosmicNavbar links={navLinks} currentPath="/favorites" />

            <div className="container mx-auto px-4 py-10">
                {/* Botón de regresar */}
                <Link href="/#about" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                {/* Contenido de la sección */}
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                    My <span className="text-emerald-500">Journey</span>
                </h1>

                <div className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400">
                    <p className="lead text-xl text-zinc-300">
                        This page will contain more detailed information about your personal and professional journey.
                    </p>
                    <p>
                        mis juegos
                    </p>
                </div>
            </div>
        </main>
    )
}
