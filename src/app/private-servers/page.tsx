import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CosmicNavbar from "@/components/compontents/cosmic-navbar";
import {navLinks} from "@/data/navlinks";
import ResourcesPage from "@/components/sub-sections/resources-page";


export default function PrivateServersPage() {

    return (
        <main className="bg-zinc-950 min-h-screen">
            {/* Cosmic Navbar */}
            <CosmicNavbar links={navLinks} currentPath="/private-servers" />

            <div className="mt-32 md:mt-40">
                <ResourcesPage />
            </div>
        </main>
    )
}
