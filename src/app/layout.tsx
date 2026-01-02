import './globals.css'
import '@/styles/n8n-chat-custom.css'
import '@n8n/chat/style.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { GoogleTagManager } from '@/components/google/GoogleTagManager'
import GTMPageView from '@/components/google/GTMPageView'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // Main title (50-60 characters)
  title: "Artag | Software and App Development in Pereira",
  // Alternates for SEO
  alternates: {
    canonical: "https://www.artagdev.com.co",
  },
  // Optimized description (150-160 characters)
  description:
    "Innovative digital solutions in Pereira. Software development, mobile apps, and UI/UX design for companies looking to stand out in the digital world.",
  // Relevant keywords
  keywords: [
    "software development",
    "mobile apps",
    "Pereira",
    "front-end",
    "back-end",
    "API",
    "databases",
    "UI/UX design",
    "graphic design",
    "software architecture",
    "Artag",
    "digital solutions",
  ],
  // Open Graph for social media
  openGraph: {
    type: "website",
    locale: "en", // Keep as is if your primary audience is Spanish-speaking
    url: "https://www.artagdev.com.co",
    title: "Artag | Digital Solutions in Pereira",
    description:
      "Software development, mobile applications, and digital design in Pereira. Innovation and technology for your business.",
    siteName: "Artag",
    images: [
      {
        url: "/logo.png", // Place this image in /public
        width: 1200,
        height: 630,
        alt: "Artag software development in Pereira",
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Artag | Software Development in Pereira",
    description:
      "Intelligent mobile applications and custom software from Pereira, Colombia.",
    images: ["/twitter-artag.png"], // Place this image in /public
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
  authors: [{ name: "Artag", url: "https://www.artagdev.com.co" }],
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
  // Google Search Console verification (optional)
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
  return (
    <html lang="es">
      <body className={inter.className}>
        <SpeedInsights />
        <GoogleTagManager />
        <GTMPageView />
        {children}
      </body>
    </html>
  )
}