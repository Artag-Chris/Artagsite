import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { projectsByLocale } from '@/data/proyectData'
import { ArchitectureDiagram } from '@/components/labs/ArchitectureDiagram'
import { PrivateServicesMap } from '@/components/labs/PrivateServicesMap'
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
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-indigo-400/70">
            {t('badge')}
          </span>
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            {t('title')}
            <span className="text-cyan-400">{t('titleAccent')}</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">{t('description')}</p>
        </header>

        <section className="mb-12">
          <ArchitectureDiagram
            title={t('diagramTitle')}
            nodes={atiendeNodes}
          />
          <p className="mt-3 text-xs text-zinc-500">{t('privateNote')}</p>
        </section>

        <section className="mb-12 grid gap-4 sm:grid-cols-2">
          <Link
            href="/currentStudies"
            className="group rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 transition-colors hover:border-cyan-500/25"
          >
            <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-cyan-200" style={{ fontFamily: 'var(--font-display)' }}>
              {t('studiesTitle')}
            </h3>
            <p className="text-sm text-zinc-400">{t('studiesDescription')}</p>
            <span className="mt-3 inline-block text-xs text-zinc-500">{t('studiesCta')} →</span>
          </Link>
          <Link
            href="/privateservers"
            className="group rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 transition-colors hover:border-cyan-500/25"
          >
            <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-cyan-200" style={{ fontFamily: 'var(--font-display)' }}>
              {t('serversTitle')}
            </h3>
            <p className="text-sm text-zinc-400">{t('serversDescription')}</p>
            <span className="mt-3 inline-block text-xs text-zinc-500">{t('serversCta')} →</span>
          </Link>
        </section>

        <section className="mb-12">
          <PrivateServicesMap title={t('privateMapTitle')} note={t('privateMapNote')} />
        </section>

        <section className="space-y-8">
          {projects.map((project) => (
            <article key={project.id} className="rounded-2xl border border-white/[0.07] bg-zinc-900/50 p-6 sm:p-8">
              <h2 className="mb-4 text-2xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                {project.title}
              </h2>

              <div className="mb-4">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-amber-400/80">
                  {t('starSituation')}
                </h3>
                <p className="leading-7 text-zinc-400">{project.caseStudy.problem}</p>
              </div>

              <div className="mb-4">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-cyan-400/80">
                  {t('starArchitecture')}
                </h3>
                <ul className="space-y-1 text-sm text-zinc-400">
                  {project.caseStudy.architecture.map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-mono text-xs text-cyan-400">{String(i + 1).padStart(2, '0')}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                {project.caseStudy.decisions.length > 0 && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {project.caseStudy.decisions.map((d, i) => (
                      <div key={i} className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
                        <div className="text-xs font-semibold text-cyan-300">{d.title}</div>
                        <div className="text-xs text-zinc-500">{d.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-widest text-cyan-400/80">
                  {t('starResults')}
                </h3>
                <ul className="space-y-1 text-sm text-zinc-400">
                  {project.caseStudy.results.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="text-sm text-zinc-500 hover:text-zinc-300"
              >
                {t('readCaseStudy')} →
              </Link>
            </article>
          ))}
        </section>

        <div className="mt-8 text-center">
          <Link href="/projects" className="text-sm text-zinc-500 hover:text-zinc-300">
            ← {t('backToProjects')}
          </Link>
        </div>
      </div>
    </main>
  )
}
