import type { Metadata } from "next"
import CosmicNavbar from "@/components/compontents/cosmic-navbar"
import CurrentStudiesPage from "@/components/sub-sections/current-studies-page"
import { navLinks } from "@/data/navlinks"

export const metadata: Metadata = {
  title: "Learning Journey | Artag",
  description:
    "Current studies and learning journey of a full-stack developer: architecture, mobile, DevOps, system design, security and more.",
  alternates: { canonical: "/currentStudies" },
  openGraph: {
    title: "Learning Journey | Artag",
    description: "What I am currently studying and how confident I feel about each technology.",
    url: "/currentStudies",
    type: "website",
  },
}

export default function Page() {
  return (
    <>
      <CosmicNavbar links={navLinks} currentPath="/currentStudies" />
      <div className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400">
        <CurrentStudiesPage />
      </div>
    </>
  )
}
