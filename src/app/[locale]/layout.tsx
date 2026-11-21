import '../globals.css'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import ThemeProvider from '@/components/theme-provider'
import { ViewModeProvider } from '@/contexts/ViewModeContext'
import { ModeMetaUpdater } from '@/components/ModeMetaUpdater'
import { ModeThemeApplier } from '@/components/ModeThemeApplier'
import { CosmicBar } from '@/components/CosmicBar'
import HeaderMain from '@/components/page_components/Headermain'
import FooterMain from '@/components/footers/FooterMain'
import { CommandPalette } from '@/components/CommandPalette'
import { GoogleTagManager } from '@/components/google/GoogleTagManager'
import GTMPageView from '@/components/google/GTMPageView'
import { MetaPixel } from '@/components/meta/MetaPixel'
import { TikTokPixel } from '@/components/tiktok/TikTokPixel'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { routing } from '@/i18n/routing'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = "https://www.artagdev.com.co"
  const isEs = locale === "es"

  const title = isEs
    ? "Christian Henao (Artag) — Desarrollador Full-Stack e IA"
    : "Christian Henao (Artag) — Full-Stack Developer & AI Engineer"
  const description = isEs
    ? "Construyo sistemas de IA aplicados: agentes multicanal, pipelines RAG y backends event-driven. Cuatro casos de estudio con arquitectura, trade-offs y límites reales."
    : "I build applied AI systems: multi-channel agents, RAG pipelines and event-driven backends. Four case studies with architecture, trade-offs and honest limits."

  return {
    metadataBase: new URL(baseUrl),
    title,
    alternates: {
      canonical: isEs ? `${baseUrl}/es` : baseUrl,
      languages: {
        en: baseUrl,
        es: `${baseUrl}/es`,
        "x-default": baseUrl,
      },
    },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: isEs ? "es_CO" : "en_US",
      url: isEs ? `${baseUrl}/es` : baseUrl,
      siteName: "Artag",
      images: [
        {
          url: `${baseUrl}/og-home.png`,
          width: 1200,
          height: 630,
          alt: "Christian Henao (Artag) — Full-Stack Developer & AI Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-home.png`],
    },
    icons: {
      icon: [
        { url: "/logosinfondo.png", type: "image/png" },
        { url: "/logosinfondo.ico", sizes: "any" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180" },
      ],
    },
    authors: [{ name: "Artag Dev", url: "https://www.artagdev.com.co" }],
    generator: "Next.js",
    applicationName: "Artag",
    referrer: "origin-when-cross-origin",
    creator: "Artag",
    publisher: "Artag",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    category: "technology",
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()
  const isEs = locale === "es"

  // Unified Global JSON-LD Graph: ProfessionalService + LocalBusiness (Pereira) + Person (AI Engineer)
  const globalJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": "https://www.artagdev.com.co/#organization",
        name: "Artag Dev",
        alternateName: isEs
          ? "Artag Dev Ingeniería de Software & IA"
          : "Artag Dev Software & AI Engineering",
        url: isEs
          ? "https://www.artagdev.com.co/es"
          : "https://www.artagdev.com.co",
        logo: "https://www.artagdev.com.co/logosinfondo.png",
        image: "https://www.artagdev.com.co/og-home.png",
        description: isEs
          ? "Desarrollo de software a la medida, ingeniería de IA (RAG y agentes), arquitectura de microservicios y ciberseguridad de aplicaciones en Pereira, Risaralda y Colombia."
          : "Custom software development, production AI engineering (RAG & autonomous agents), microservices architecture, and application cybersecurity from Pereira, Risaralda, Colombia.",
        telephone: "+573205711428",
        email: "info@artagdev.com.co",
        priceRange: "$$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pereira",
          addressRegion: "Risaralda",
          postalCode: "660001",
          addressCountry: "CO",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 4.8133,
          longitude: -75.6961,
        },
        areaServed: [
          { "@type": "City", name: "Pereira" },
          { "@type": "City", name: "Dosquebradas" },
          { "@type": "AdministrativeArea", name: "Risaralda" },
          { "@type": "Country", name: "Colombia" },
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        sameAs: [
          "https://github.com/Artag-Chris",
          "https://www.linkedin.com/in/artag/",
          "https://www.youtube.com/@Artag888",
          "https://www.instagram.com/artagdev/",
        ],
        knowsAbout: [
          "AI Engineering",
          "Retrieval-Augmented Generation (RAG)",
          "Microservices Architecture",
          "Application Cybersecurity",
          "Custom Software Development",
          "DevSecOps",
        ],
      },
      {
        "@type": "Person",
        "@id": "https://www.artagdev.com.co/#founder",
        name: "Christian - Artag Dev",
        jobTitle: "AI Engineer & Distributed Systems Architect",
        worksFor: { "@id": "https://www.artagdev.com.co/#organization" },
        url: "https://www.artagdev.com.co/",
        image: "https://www.artagdev.com.co/logosinfondo.png",
        sameAs: [
          "https://github.com/Artag-Chris",
          "https://www.linkedin.com/in/artag/",
          "https://www.youtube.com/@Artag888",
          "https://www.instagram.com/artagdev/",
        ],
        knowsAbout: [
          "LLM Systems",
          "pgvector",
          "Node.js",
          "Python",
          "Redis",
          "HMAC-SHA256",
          "Kubernetes",
        ],
      },
    ],
  }

  return (
    <html lang={locale} className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased`}>
        {/* Zero-image tactile grain overlay (Master Spec §1.2) */}
        <div className="tactile-grain-overlay" aria-hidden="true" />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ViewModeProvider>
              <ModeMetaUpdater />
              <ModeThemeApplier />
              <HeaderMain />
              <CommandPalette />
              <CosmicBar />
              <SpeedInsights />
              <GoogleTagManager />
              <GTMPageView />
              <MetaPixel />
              <TikTokPixel />
              {children}
              <FooterMain />
            </ViewModeProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

// Theme color for mobile browsers + consistent status bar
export const viewport: Viewport = {
  themeColor: "#0B0C0E",
  width: "device-width",
  initialScale: 1,
}
