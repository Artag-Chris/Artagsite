import './globals.css'
import '@/styles/n8n-chat-custom.css'
import '@n8n/chat/style.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { GoogleTagManager } from '@/components/google/GoogleTagManager'
import GTMPageView from '@/components/google/GTMPageView'
import { MetaPixel } from '@/components/meta/MetaPixel'
import { TikTokPixel } from '@/components/tiktok/TikTokPixel'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Main title (50-60 characters) - AI-optimized with keywords
  title: "Artag | Full-Stack Developer & Software Architect",
  // Alternates for SEO
  alternates: {
    canonical: "https://www.artagdev.com.co",
  },
  // Optimized description (150-160 characters) - With concrete metrics for AI extraction
  description:
    "Full-stack software architect. Specialist in scalable systems, zero-downtime migrations, and process automation. 32K+ users, 99.99% uptime.",
  // Enhanced keywords - More specific, intent-driven
  keywords: [
    "full-stack developer",
    "software architect",
    "custom software development",
    "nearshore developer",
    "microservices architecture",
    "real-time web applications",
    "process automation",
    "n8n automation",
    "zero-downtime deployment",
    "payment gateway integration",
    "Node.js developer",
    "React developer",
    "TypeScript developer",
    "AWS cloud architecture",
    "database migrations",
    "web developer",
    "app developer",
    "Pereira Colombia",
    "software developer portfolio",
    "Artag Dev",
  ],
  // Open Graph for social media
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.artagdev.com.co",
    title: "Artag | Software Architecture & Development",
    description:
      "Full-stack architect specializing in scalable systems, zero-downtime migrations, and enterprise automation.",
    siteName: "Artag",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Artag - Software architecture and full-stack development",
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Artag | Full-Stack Software Developer & Architect",
    description:
      "Scalable systems, real-time features, and process automation. Nearshore software development.",
    images: ["/twitter-image.png"],
    site: "@artagdev",
    creator: "@artagdev",
  },
  // Icons
  icons: {
    icon: [
      { url: "/logosinfondo.ico", sizes: "any" },
      { url: "/logosinfondo.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
  },
  // Contact information and branding
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
  // Google Search Console verification
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Organization Schema Markup for Google Knowledge Panel
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Artag",
    url: "https://www.artagdev.com.co",
    logo: "https://www.artagdev.com.co/logosinfondo.png",
    description: "Full-stack software development and digital architecture services",
    sameAs: [
      "https://linkedin.com/in/artag",
      "https://github.com/artag",
      "https://twitter.com/artagdev",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://www.artagdev.com.co",
    },
    areaServed: ["CO", "US", "MX", "AR"],
    serviceType: [
      "Custom Software Development",
      "Web Application Development",
      "Mobile App Development",
      "Process Automation",
      "System Architecture",
      "Cloud Infrastructure",
    ],
  }

  // Person Schema Markup for Professional Profile
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Artag Dev",
    url: "https://www.artagdev.com.co",
    image: "https://www.artagdev.com.co/logosinfondo.png",
    jobTitle: "Full-Stack Software Architect",
    description: "Specialist in scalable systems, zero-downtime migrations, and enterprise automation",
    sameAs: [
      "https://linkedin.com/in/artag",
      "https://github.com/artag",
      "https://twitter.com/artagdev",
    ],
    knowsAbout: [
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
    <html lang="en">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          suppressHydrationWarning
        />
        {/* Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          suppressHydrationWarning
        />
      </head>
      <body className={inter.className}>
        <SpeedInsights />
        <GoogleTagManager />
        <GTMPageView />
        <MetaPixel />
        <TikTokPixel />
        {children}
      </body>
    </html>
  )
}