import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { ViewModeSetter } from '@/components/ViewModeSetter'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function B2BRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ViewModeSetter mode="b2b" />
}
