"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { X } from "lucide-react"

export type LegalDoc = "privacy" | "terms"

interface LegalSection {
  heading: string
  body: string
}

/**
 * Accessible legal modal built on the native <dialog> element:
 * focus is trapped by the browser, Esc closes it, and focus returns to the
 * trigger on close. Copy lives in the `legal` i18n namespace.
 */
export function LegalDialog({
  doc,
  onClose,
}: {
  doc: LegalDoc | null
  onClose: () => void
}) {
  const t = useTranslations("legal")
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (doc && !dialog.open) dialog.showModal()
    if (!doc && dialog.open) dialog.close()
  }, [doc])

  const sections = doc ? (t.raw(`${doc}.sections`) as LegalSection[]) : []

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself) closes it.
        if (e.target === ref.current) onClose()
      }}
      aria-labelledby="legal-title"
      className="m-auto w-[min(42rem,calc(100vw-2rem))] max-h-[85vh] rounded-2xl border border-white/10 bg-zinc-950 p-0 text-zinc-300 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {doc && (
        <div className="flex max-h-[85vh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-4">
            <div>
              <h2 id="legal-title" className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {t(`${doc}.title`)}
              </h2>
              <p className="mt-1 text-xs text-zinc-400">{t("updated")}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"
              aria-label={t("close")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-5 overflow-y-auto px-6 py-5 text-sm leading-relaxed">
            <p>{t(`${doc}.intro`)}</p>
            {sections.map((section) => (
              <section key={section.heading}>
                <h3 className="mb-1 font-semibold text-white">{section.heading}</h3>
                <p className="text-zinc-400">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      )}
    </dialog>
  )
}
