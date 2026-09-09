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

  return {
    title:
      locale === "es"
        ? "Artag | Desarrollador Full-Stack & Arquitecto de Software"
        : "Artag | Full-Stack Developer & Software Architect",
    alternates: {
      canonical: locale === "es" ? `${baseUrl}/es` : baseUrl,
      languages: {
        en: baseUrl,
        es: `${baseUrl}/es`,
      },
    },
    description:
      locale === "es"
        ? "Arquitecto de software full-stack. Especialista en sistemas escalables, migraciones sin downtime y automatización de procesos. 32K+ usuarios, 99.99% uptime."
        : "Full-stack software architect. Specialist in scalable systems, zero-downtime migrations, and process automation. 32K+ users, 99.99% uptime.",
    openGraph: {
      title:
        locale === "es"
          ? "Artag | Desarrollador Full-Stack & Arquitecto de Software"
          : "Artag | Full-Stack Developer & Software Architect",
      description:
        locale === "es"
          ? "Arquitecto de software full-stack. Especialista en sistemas escalables, migraciones sin downtime y automatización de procesos. 32K+ usuarios, 99.99% uptime."
          : "Full-stack software architect. Specialist in scalable systems, zero-downtime migrations, and process automation. 32K+ users, 99.99% uptime.",
      type: "website",
      locale: locale === "es" ? "es_CO" : "en_US",
      url: locale === "es" ? `${baseUrl}/es` : baseUrl,
      siteName: "Artag",
      images: [
        {
          url: `${baseUrl}/og-home.png`,
          width: 1200,
          height: 630,
          alt: "Artag — Full-Stack Developer & Software Architect",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        locale === "es"
          ? "Artag | Desarrollador Full-Stack & Arquitecto de Software"
          : "Artag | Full-Stack Developer & Software Architect",
      description:
        locale === "es"
          ? "Arquitecto de software full-stack. Especialista en sistemas escalables, migraciones sin downtime y automatización de procesos."
          : "Full-stack software architect. Specialist in scalable systems, zero-downtime migrations, and process automation.",
      images: [`${baseUrl}/og-home.png`],
      site: "@artagdev",
      creator: "@artagdev",
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
      ? "Servicios de desarrollo de software full-stack y arquitectura digital"
      : "Full-stack software development and digital architecture services",
    sameAs: [
      "https://linkedin.com/in/artag",
      "https://github.com/artag",
      "https://twitter.com/artagdev",
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
    name: "Artag Dev",
    url: "https://www.artagdev.com.co",
    image: "https://www.artagdev.com.co/logosinfondo.png",
    jobTitle: isEs
      ? "Arquitecto de Software Full-Stack"
      : "Full-Stack Software Architect",
    description: isEs
      ? "Especialista en sistemas escalables, migraciones sin downtime y automatización empresarial"
      : "Specialist in scalable systems, zero-downtime migrations, and enterprise automation",
    sameAs: [
      "https://linkedin.com/in/artag",
      "https://github.com/artag",
      "https://twitter.com/artagdev",
    ],
    knowsAbout: isEs
      ? [
          "Desarrollo Full-Stack",
          "Arquitectura de Microservicios",
          "Automatización de Procesos",
          "Aplicaciones Web en Tiempo Real",
          "Despliegue sin Downtime",
          "Integración de Pagos",
          "Infraestructura Cloud",
          "Optimización de Bases de Datos",
        ]
      : [
          "Full-Stack Development",
          "Microservices Architecture",
          "Process Automation",
          "Real-Time Web Applications",
          "Zero-Downtime Deployment",
          "Payment Integration",
          "Cloud Infrastructure",
          "Database Optimization",
        ],
    worksFor: {
      "@type": "Organization",
      name: "Artag",
    },
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
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
