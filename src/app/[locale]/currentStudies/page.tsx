import type { Metadata } from "next"
import { getLocale } from "next-intl/server"
import CosmicNavbar from "@/components/compontents/cosmic-navbar"
import CurrentStudiesPage from "@/components/sub-sections/current-studies-page"
import { navLinks } from "@/data/navlinks"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const es = locale === "es"

  return {
    title: es
      ? "Trayectoria de Aprendizaje — Habilidades y Estudios Actuales de Desarrollador Full-Stack | Artag"
      : "Learning Journey — Full-Stack Developer Skills & Current Studies | Artag",
    description: es
      ? "Trayectoria de aprendizaje continuo de un desarrollador full-stack colombiano: arquitectura de software, microservicios, React Native, Docker, Kubernetes, GraphQL, TypeScript avanzado, serverless, escalabilidad de sistemas y ciberseguridad."
      : "Continuous learning journey of a Colombian full-stack developer: software architecture, microservices, React Native, Docker, Kubernetes, GraphQL, advanced TypeScript, serverless, system scalability and cybersecurity.",
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
    alternates: { canonical: es ? "/es/currentStudies" : "/currentStudies" },
    openGraph: {
      title: es
        ? "Trayectoria de Aprendizaje — Estudios Actuales de Desarrollador Full-Stack | Artag"
        : "Learning Journey — Full-Stack Developer Current Studies | Artag",
      description: es
        ? "Lo que un desarrollador full-stack senior estudia actualmente: arquitectura, microservicios, React Native, Docker, GraphQL, TypeScript, serverless y más."
        : "What a senior full-stack developer is currently studying: architecture, microservices, React Native, Docker, GraphQL, TypeScript, serverless and more.",
      url: es ? "/es/currentStudies" : "/currentStudies",
      type: "website",
      siteName: "Artag",
      locale: es ? "es_CO" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: es
        ? "Trayectoria de Aprendizaje — Desarrollador Full-Stack | Artag"
        : "Learning Journey — Full-Stack Developer | Artag",
      description: es
        ? "Arquitectura de software, React Native, Docker, GraphQL, TypeScript avanzado y más — mira lo que estoy estudiando actualmente."
        : "Software architecture, React Native, Docker, GraphQL, advanced TypeScript and more — see what I'm currently studying.",
    },
    robots: { index: true, follow: true },
  }
}

export default async function Page() {
  const locale = await getLocale()
  const links = navLinks[locale as "en" | "es"] ?? navLinks.en

  return (
    <>
      <CosmicNavbar links={links} currentPath="/currentStudies" />
      <div className="prose prose-lg prose-invert max-w-none prose-headings:text-emerald-400 prose-a:text-emerald-400">
        <CurrentStudiesPage />
      </div>
    </>
  )
}
