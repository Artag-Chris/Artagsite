"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

export function FAQ() {
  const t = useTranslations("faq")
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const faqItems: FAQItem[] = [
    { question: t("items.0.q"), answer: t("items.0.a") },
    { question: t("items.1.q"), answer: t("items.1.a") },
    { question: t("items.2.q"), answer: t("items.2.a") },
    { question: t("items.3.q"), answer: t("items.3.a") },
    { question: t("items.4.q"), answer: t("items.4.a") },
    { question: t("items.5.q"), answer: t("items.5.a") },
  ]

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {t("title")}<span className="text-blue-400">{t("titleAccent")}</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full text-left px-4 sm:px-6 py-4 rounded-xl bg-[#111111] border border-white/5 hover:border-white/10 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-white text-sm sm:text-base leading-tight">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown className="w-5 h-5 text-zinc-500 transition-colors" />
                  </motion.div>
                </div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  expandedIndex === index
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-6 py-4 bg-[#0a0a0a] border border-t-0 border-white/5 rounded-b-xl">
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
        suppressHydrationWarning
      />
    </section>
  )
}
