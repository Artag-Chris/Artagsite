import type { Metadata } from "next"
import CosmicNavbar from "@/components/compontents/cosmic-navbar"
import CurrentStudiesPage from "@/components/sub-sections/current-studies-page"
import { navLinks } from "@/data/navlinks"

export const metadata: Metadata = {
  title: "Learning Journey — Full-Stack Developer Skills & Current Studies | Artag",
  description:
    "Continuous learning journey of a Colombian full-stack developer: software architecture, microservices, React Native, Docker, Kubernetes, GraphQL, advanced TypeScript, serverless, system scalability and cybersecurity.",
  keywords: [
    "full-stack developer",
    "colombian full-stack developer",
    "latam full-stack developer",
    "software architecture patterns",
    "microservices",
    "react native developer",
    "docker kubernetes",
    "graphql apollo",
    "advanced typescript",
    "serverless edge functions",
    "system scalability",
    "cybersecurity owasp",
    "continuous learning developer",
    "remote full-stack developer",
    "hire developer colombia",
  ],
  alternates: { canonical: "/currentStudies" },
  openGraph: {
    title: "Learning Journey — Full-Stack Developer Current Studies | Artag",
    description:
      "What a senior full-stack developer is currently studying: architecture, microservices, React Native, Docker, GraphQL, TypeScript, serverless and more.",
    url: "/currentStudies",
    type: "website",
    siteName: "Artag",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Journey — Full-Stack Developer | Artag",
    description:
      "Software architecture, React Native, Docker, GraphQL, advanced TypeScript and more — see what I'm currently studying.",
  },
  robots: { index: true, follow: true },
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
