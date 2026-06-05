# Artag Dev — Portfolio

A personal portfolio and digital presence built for **Christian (Artag Dev)**, a Colombian full-stack developer and software architect. This site is more than a showcase — it's a space to connect with other developers, share what I build, talk about technology, and offer help where I can.

Whether you're here to see my work, discuss an idea, or just geek out about architecture and automation — you're welcome.

## Built With

- **Next.js 15** — App Router, Server Components by default, Route Handlers
- **React 19** — latest stable
- **TypeScript** — strict mode
- **Tailwind CSS 3** — utility-first styling with custom design system
- **Framer Motion 12** — page and component animations
- **GSAP** — scroll-driven and timeline animations
- **shadcn/ui** — accessible primitives (new-york style, neutral base)
- **styled-components** — SSR-enabled via Next.js compiler
- **next-themes** — dark mode (wired at the root level)

### Infrastructure & Tooling

- **Vercel** — deployment, Speed Insights
- **Google Tag Manager / GA4** — analytics
- **Meta Pixel & TikTok Pixel** — conversion tracking
- **n8n** — chat widget with AI assistant
- **nodemailer + Gmail SMTP** — contact form backend
- **Zod** — form validation with strict schema enforcement

## Architecture Highlights

- **Server-first architecture** — components default to server-rendered; `"use client"` is scoped to interactive islands (forms, animations, analytics)
- **Static generation** — all pages pre-rendered at build time for maximum performance
- **Route-based code splitting** — each page loads only its own bundle
- **Dynamic imports** — heavy libraries (n8n chat, 3D loaders) are lazy-loaded
- **Content-Security-Policy** — auto-generated from a centralized analytics domain list
- **Semantic HTML + JSON-LD** — structured data for search engines and AI crawlers (Organization, Person, FAQ schemas)
- **Custom 404, error, and loading states** — every route has fallback UI

## Content

All copy, projects, skills, and social data live in `src/data/`. There's no CMS — content is hand-written and version-controlled alongside the code.

## Contact

- Website: [artagdev.com.co](https://www.artagdev.com.co)
- Email: artagdev@gmail.com
- LinkedIn: [linkedin.com/in/artag](https://www.linkedin.com/in/artag/)
- GitHub: [github.com/Artag-Chris](https://github.com/Artag-Chris)
