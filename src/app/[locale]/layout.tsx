import '../globals.css'
import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import ThemeProvider from '@/components/theme-provider'
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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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

  // Organization Schema Markup for Google Knowledge Panel (locale-aware)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Artag",
    url: "https://www.artagdev.com.co",
    logo: "https://www.artagdev.com.co/logosinfondo.png",
    description: isEs
      ? "Desarrollo full-stack y sistemas de IA aplicados"
      : "Full-stack development and applied AI systems",
    sameAs: [
      "https://github.com/Artag-Chris",
      "https://www.linkedin.com/in/artag/",
      "https://www.youtube.com/@Artag888",
      "https://www.instagram.com/artagdev/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Developer",
      url: "https://www.artagdev.com.co",
    },
  }

  // Person Schema Markup for Professional Profile (locale-aware)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Christian Henao",
    alternateName: "Artag",
    url: "https://www.artagdev.com.co",
    image: "https://www.artagdev.com.co/logosinfondo.png",
    jobTitle: isEs
      ? "Desarrollador Full-Stack e Ingeniero de IA"
      : "Full-Stack Developer & AI Engineer",
    description: isEs
      ? "Desarrollador full-stack e ingeniero de IA. Construye agentes multicanal, pipelines RAG y backends event-driven con control de costos y supervisión humana."
      : "Full-stack developer and AI engineer building multi-channel agents, RAG pipelines and event-driven backends with cost control and human oversight.",
    sameAs: [
      "https://github.com/Artag-Chris",
      "https://www.linkedin.com/in/artag/",
      "https://www.youtube.com/@Artag888",
      "https://www.instagram.com/artagdev/",
    ],
    knowsAbout: isEs
      ? [
          "Desarrollo Full-Stack",
          "Ingeniería de IA aplicada",
          "RAG y recuperación semántica",
          "Agentes multicanal",
          "Arquitectura event-driven",
          "NestJS",
          "TypeScript",
          "Rust",
          "Redis y BullMQ",
          "PostgreSQL y pgvector",
          "Control de costos de LLM",
          "Seguridad y fiabilidad",
        ]
      : [
          "Full-Stack Development",
          "Applied AI Engineering",
          "RAG and semantic retrieval",
          "Multi-channel agents",
          "Event-driven architecture",
          "NestJS",
          "TypeScript",
          "Rust",
          "Redis and BullMQ",
          "PostgreSQL and pgvector",
          "LLM cost control",
          "Security and reliability",
        ],
    worksFor: {
      "@type": "Organization",
      name: "Artag",
    },
  }

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        {/* Structured data rendered as early as possible in DOM (before child content) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SpeedInsights />
            <GoogleTagManager />
            <GTMPageView />
            <MetaPixel />
            <TikTokPixel />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

// Theme color for mobile browsers + consistent status bar
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}
