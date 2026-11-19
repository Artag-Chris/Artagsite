import { Gamepad2, Heart, Settings } from "lucide-react"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import DeveloperJourneyTimeline from "@/components/timeline/developer-journey-timeline"
import { ArchitecturalCell, ArchitecturalGrid } from "@/components/ArchitecturalGrid"

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
      ? "Sobre Mí | Artag — Trayectoria de Desarrollador Full-Stack"
      : "About Me | Artag — Full-Stack Developer Journey",
    description: es
      ? "La historia detrás de Artag Dev: desarrollador autodidacta, emprendedor y solucionador de problemas. Desde la primera línea de código hasta construir para miles de usuarios."
      : "The story behind Artag Dev: self-taught developer, entrepreneur, and problem-solver. From first line of code to building for thousands of users.",
    keywords: [
      "about artag",
      "full-stack developer colombia",
      "self-taught developer story",
      "developer journey",
      "sobre mí desarrollador",
      "historia desarrollador",
      "desarrollador autodidacta colombia",
    ],
    alternates: {
      canonical: es ? `${baseUrl}/es/about-me` : `${baseUrl}/about-me`,
      languages: { en: `${baseUrl}/about-me`, es: `${baseUrl}/es/about-me` },
    },
    openGraph: {
      title: es
        ? "Sobre Mí | Artag — Trayectoria de Desarrollador"
        : "About Me | Artag — Developer Journey",
      description: es
        ? "La historia detrás de Artag Dev: desarrollador autodidacta construyendo para miles de usuarios."
        : "The story behind Artag Dev: self-taught developer building for thousands of users.",
      url: es ? `${baseUrl}/es/about-me` : `${baseUrl}/about-me`,
      type: "website",
      siteName: "Artag",
      locale: es ? "es_CO" : "en_US",
      images: [{ url: `${baseUrl}/og-about.png`, width: 1200, height: 630, alt: "Artag — About Me" }],
    },
    twitter: {
      card: "summary_large_image",
      title: es
        ? "Sobre Mí | Artag — Trayectoria de Desarrollador"
        : "About Me | Artag — Developer Journey",
      description: es
        ? "La historia detrás de Artag Dev: desarrollador autodidacta construyendo para miles de usuarios."
        : "The story behind Artag Dev: self-taught developer building for thousands of users.",
      images: [`${baseUrl}/og-about.png`],
      site: "@artagdev",
      creator: "@artagdev",
    },
    robots: { index: true, follow: true },
  }
}

export default async function AboutMePage() {
  const t = await getTranslations("aboutMePage")

  const beyond = [
    { href: "/favorites", icon: Gamepad2, title: t("gamesTitle"), description: t("gamesDescription") },
    { href: "/my-faith", icon: Heart, title: t("faithTitle"), description: t("faithDescription") },
    { href: "/personal", icon: Settings, title: t("setupTitle"), description: t("setupDescription") },
  ] as const

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen pt-14">
      {/* Interactive Timeline - Full Width */}
      <DeveloperJourneyTimeline/>

      {/* Secondary, contained section for personal interests (kept out of the global menu) */}
      <section aria-labelledby="beyond-code" className="border-t border-[var(--border-hairline)] bg-[var(--bg-primary)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 id="beyond-code" className="mb-2 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            {t("beyondTitle")}
          </h2>
          <p className="mb-8 max-w-2xl text-[var(--text-secondary)]">{t("beyondDescription")}</p>
          <ArchitecturalGrid columns={3}>
            {beyond.map(({ href, icon: Icon, title, description }) => (
              <ArchitecturalCell key={href} interactive>
                <Link href={href} className="group flex h-full flex-col">
                  <Icon className="mb-3 h-5 w-5 text-[var(--accent-signal)]" aria-hidden="true" />
                  <span className="mb-1 font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-signal)] transition-colors">{title}</span>
                  <span className="text-sm text-[var(--text-secondary)]">{description}</span>
                </Link>
              </ArchitecturalCell>
            ))}
          </ArchitecturalGrid>
        </div>
      </section>
    </main>
  )
}
