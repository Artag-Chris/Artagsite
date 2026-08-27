"use client"

import { useLocale } from "next-intl"
import { Languages } from "lucide-react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const otherLocale = routing.locales.find((l) => l !== locale) ?? "en"

  const switchLocale = () => {
    router.replace(pathname, { locale: otherLocale })
  }

  return (
    <button
      onClick={switchLocale}
      aria-label={`Switch language to ${otherLocale === "es" ? "Español" : "English"}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${
        locale === "en"
          ? "text-zinc-400 border-white/10 hover:text-white hover:border-white/20 hover:bg-white/5"
          : "text-zinc-400 border-white/10 hover:text-white hover:border-white/20 hover:bg-white/5"
      } ${className}`}
    >
      <Languages className="w-3.5 h-3.5" />
      {otherLocale}
    </button>
  )
}

export default LanguageSwitcher
