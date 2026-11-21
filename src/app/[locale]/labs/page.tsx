import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { projectsByLocale } from '@/data/projects'
import { ArchitectureDiagram } from '@/components/labs/ArchitectureDiagram'
import { InteractiveLabBoard } from '@/components/labs/InteractiveLabBoard'
import { Link } from '@/i18n/navigation'

const baseUrl = 'https://www.artagdev.com.co'

// Interactive architecture map for the flagship system (Atiende).
const atiendeNodes = [
  {
    id: 'inbound',
    label: 'Inbound pipeline',
    detail: 'Webhook verification, persistence, deduplication, enqueue',
    children: [
      { id: 'webhook', label: 'Meta webhook', detail: 'Signature verification + raw payload storage' },
      { id: 'dedupe', label: 'Deduplication', detail: 'Idempotent by message id' },
      { id: 'queue', label: 'BullMQ', detail: 'Asynchronous processing queue' },
    ],
  },
  {
    id: 'agent',
    label: 'Agent orchestration',
    detail: 'Tool-using agent grounded in catalog data',
    children: [
      { id: 'catalog', label: 'Catalog search (RAG)', detail: 'pgvector retrieval per tenant' },
      { id: 'orders', label: 'Order creation', detail: 'Conversational order flow' },
      { id: 'knowledge', label: 'Knowledge lookup', detail: 'Business FAQs and policies' },
      { id: 'escalate', label: 'Human escalation', detail: 'Handoff to the same dashboard' },
    ],
  },
  {
    id: 'router',
    label: 'LLM router',
    detail: 'Provider selection with circuit breaker and fallback',
    children: [
      { id: 'primary', label: 'Primary provider', detail: 'Groq / OpenAI' },
      { id: 'fallback', label: 'Fallback provider', detail: 'Secondary provider on failure' },
      { id: 'cache', label: 'Caching layers', detail: 'Prompt, exact and semantic caches' },
    ],
  },
  {
    id: 'delivery',
    label: 'Channel adapter',
    detail: 'Response delivery and dashboard sync',
    children: [
      { id: 'whatsapp', label: 'WhatsApp', detail: 'Meta Cloud API' },
      { id: 'instagram', label: 'Instagram DM', detail: 'Meta Graph API' },
      { id: 'messenger', label: 'Messenger', detail: 'Meta Graph API' },
    ],
  },
]

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === 'es'
  const title = isEs ? 'Laboratorio de arquitectura | Artag' : 'Architecture lab | Artag'
  const description = isEs
    ? 'Casos técnicos en formato STAR, diagramas interactivos de arquitectura y notas sobre los sistemas que construí.'
    : 'Technical case studies in STAR format, interactive architecture diagrams and notes on the systems I built.'
  const url = isEs ? `${baseUrl}/es/labs` : `${baseUrl}/labs`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/labs`,
        es: `${baseUrl}/es/labs`,
        'x-default': `${baseUrl}/labs`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: 'Artag',
      locale: isEs ? 'es_CO' : 'en_US',
      images: [{ url: `${baseUrl}/og-home.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-home.png`],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LabsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const isEs = locale === 'es'
  const t = await getTranslations({ locale, namespace: 'labs' })
  const projects = (projectsByLocale[locale as 'en' | 'es'] ?? projectsByLocale.en).filter(
    (p) => p.category === 'featured'
  )

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-[var(--border-hairline)] pb-10">
          <span className="mb-4 inline-block border border-[var(--border-hairline)] bg-[var(--bg-secondary)] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[var(--accent-signal)]">
            {t('badge')}
          </span>
          <h1
            className="mb-4 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.06] text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('title')}
            <span className="italic text-[var(--accent-signal)]">{t('titleAccent')}</span>
          </h1>
          <p className="max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
            {t('description')}
          </p>
        </header>

        {/* Interactive Lab Board: Systems & Harnesses | Infrastructure (13) | Studies */}
        <section className="mb-14">
          <InteractiveLabBoard
            projects={projects}
            privateMapTitle={t('privateMapTitle')}
            privateMapNote={t('privateMapNote')}
          />
        </section>

        {/* Flagship interactive architecture tree */}
        <section className="mb-14">
          <ArchitectureDiagram title={t('diagramTitle')} nodes={atiendeNodes} />
          <p className="mt-3 font-mono text-xs text-[var(--text-secondary)]">{t('privateNote')}</p>
        </section>

        {/* Secondary links kept reachable without polluting global navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-6 font-mono text-xs">
          <Link
            href="/projects"
            className="text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-colors"
          >
            {t('backToProjects')} →
          </Link>
          <Link
            href={isEs ? "/notas-ingenieria" : "/engineering-notes"}
            className="text-[var(--text-secondary)] hover:text-[var(--accent-signal)] transition-colors"
          >
            {isEs ? 'Leer notas de ingeniería' : 'Read engineering notes'} →
          </Link>
        </div>
      </div>
    </main>
  )
}
