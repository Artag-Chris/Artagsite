# Artag Portfolio - SEO Implementation Guide
**Quick Start Guide for Fixing Critical SEO Issues**

---

## Table of Contents
1. [File 1: Create robots.txt](#1-create-robotstxt)
2. [File 2: Create sitemap.ts](#2-create-sitemapsts)
3. [File 3: Create Organization Schema](#3-create-organization-schema)
4. [File 4: Create Person Schema](#4-create-person-schema)
5. [File 5: Update Root Layout](#5-update-root-layout)
6. [File 6: Update Sub-page Metadata](#6-update-sub-page-metadata)
7. [File 7: Update Middleware (HSTS)](#7-update-middleware-hsts)

---

## 1. Create robots.txt

**File Path:** `public/robots.txt`

**Action:** Create new file with this content:

```
# Artag Portfolio - robots.txt
# Generated: 2026-03-17
# Allows all public content, restricts API and private routes

User-agent: *
Allow: /
Allow: /api/contact
Disallow: /private-servers
Disallow: /.next/
Disallow: /_next/
Disallow: /node_modules/
Disallow: *?fbclid=
Disallow: *?utm_source=
Disallow: *?utm_medium=
Disallow: *?utm_campaign=
Disallow: *?utm_content=
Disallow: *?utm_term=

# Google-specific
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Bing-specific
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Bad bot blocking
User-agent: MJ12bot
User-agent: AhrefsBot
User-agent: SemrushBot
User-agent: DotBot
Disallow: /

# Sitemap location
Sitemap: https://www.artagdev.com.co/sitemap.xml
Sitemap: https://www.artagdev.com.co/sitemap-index.xml
```

**Verification:** 
- Visit: https://www.artagdev.com.co/robots.txt
- Should display the file content

---

## 2. Create sitemap.ts

**File Path:** `src/app/sitemap.ts`

**Action:** Create new file with this content:

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.artagdev.com.co'
  const now = new Date()

  // Static routes with SEO priorities
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-me`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/currentStudies`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/my-faith`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  return routes
}
```

**Verification:**
- Visit: https://www.artagdev.com.co/sitemap.xml
- Should display XML sitemap with all routes

---

## 3. Create Organization Schema

**File Path:** `src/lib/schema/organizationSchema.ts`

**Action:** Create new file with this content:

```typescript
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.artagdev.com.co/#organization',
    name: 'Artag',
    url: 'https://www.artagdev.com.co',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.artagdev.com.co/logosinfondo.png',
      width: 256,
      height: 256,
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://www.artagdev.com.co/og-image.png',
      width: 1200,
      height: 630,
    },
    description: 'Full-stack developer specializing in web and mobile applications. Crafting elegant digital experiences with modern technologies.',
    founder: {
      '@type': 'Person',
      name: 'Artag',
      url: 'https://www.artagdev.com.co',
    },
    foundingDate: '2020-01-01',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pereira',
      addressLocality: 'Pereira',
      addressRegion: 'Risaralda',
      postalCode: '660001',
      addressCountry: 'CO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+57-300-XXXXXXX',
      contactType: 'Customer Support',
      email: 'info@artagdev.com.co',
      availableLanguage: ['es', 'en'],
    },
    sameAs: [
      'https://twitter.com/artagdev',
      'https://github.com/artagdev',
      'https://www.linkedin.com/in/artagdev',
    ],
    serviceArea: {
      '@type': 'City',
      name: 'Pereira',
    },
  }
}
```

---

## 4. Create Person Schema

**File Path:** `src/lib/schema/personSchema.ts`

**Action:** Create new file with this content:

```typescript
export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.artagdev.com.co/#person',
    name: 'Artag',
    url: 'https://www.artagdev.com.co',
    image: 'https://www.artagdev.com.co/logosinfondo.png',
    jobTitle: 'Full-Stack Developer',
    description: 'Experienced full-stack developer creating innovative digital solutions',
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://www.artagdev.com.co/#organization',
      name: 'Artag',
    },
    email: 'contact@artagdev.com.co',
    telephone: '+57-300-XXXXXXX',
    sameAs: [
      'https://twitter.com/artagdev',
      'https://github.com/artagdev',
      'https://www.linkedin.com/in/artagdev',
    ],
    knowsLanguage: ['es', 'en'],
    knowsAbout: [
      'Web Development',
      'Mobile App Development',
      'UI/UX Design',
      'React.js',
      'Node.js',
      'TypeScript',
      'Next.js',
      'JavaScript',
      'Full-Stack Development',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional Certificate',
      name: 'Full-Stack Developer',
    },
  }
}
```

---

## 5. Create LocalBusiness Schema

**File Path:** `src/lib/schema/localBusinessSchema.ts`

**Action:** Create new file with this content:

```typescript
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.artagdev.com.co/#localbusiness',
    name: 'Artag',
    image: 'https://www.artagdev.com.co/logosinfondo.png',
    description: 'Full-stack software developer offering web development, mobile applications, and digital solutions in Pereira, Colombia.',
    url: 'https://www.artagdev.com.co',
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pereira',
      addressLocality: 'Pereira',
      addressRegion: 'Risaralda',
      postalCode: '660001',
      addressCountry: 'CO',
    },
    email: 'contact@artagdev.com.co',
    telephone: '+57-300-XXXXXXX',
    openingHours: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
      timezone: 'America/Bogota',
    },
    areaServed: {
      '@type': 'City',
      name: 'Pereira',
    },
    serviceType: [
      'Web Development',
      'Mobile App Development',
      'UI/UX Design',
      'API Development',
    ],
  }
}
```

---

## 6. Update Root Layout

**File Path:** `src/app/layout.tsx`

**Action:** Add schema markup to your existing layout. Replace the entire file with:

```typescript
import './globals.css'
import '@/styles/n8n-chat-custom.css'
import '@n8n/chat/style.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { GoogleTagManager } from '@/components/google/GoogleTagManager'
import GTMPageView from '@/components/google/GTMPageView'
import { MetaPixel } from '@/components/meta/MetaPixel'
import { TikTokPixel } from '@/components/tiktok/TikTokPixel'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getOrganizationSchema } from '@/lib/schema/organizationSchema'

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
    "Full-stack developer specializing 
