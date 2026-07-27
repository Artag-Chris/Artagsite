"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What exactly do you do?",
    answer:
      "I help people connect the tools they already use. WhatsApp to Slack, spreadsheets to web apps, manual processes to automated workflows. If you have services that don't talk to each other, I make them talk. I also build custom tools and dashboards when off-the-shelf solutions don't cut it.",
  },
  {
    question: "I'm not technical — can I still work with you?",
    answer:
      "Absolutely. Most of my clients aren't developers. You tell me what's broken or what's slowing you down, and I figure out the best way to fix it. I handle all the technical stuff — you just see things working.",
  },
  {
    question: "What integrations do you work with?",
    answer:
      "WhatsApp Business API, Discord, Instagram, Slack, email services, Google Sheets, CRMs, payment processors, databases, custom APIs — basically anything with a webhook or an API. I've built microservices architecture connecting 12+ services.",
  },
  {
    question: "How does pricing work?",
    answer:
      "It depends on the project. Simple automations can be quick and affordable. Bigger systems with multiple integrations take more planning. I'm transparent about costs before we start — no surprises. Let's chat about what you need and I'll give you a real number.",
  },
  {
    question: "Can you build a full app, not just automations?",
    answer:
      "Yes. I build web apps, dashboards, internal tools, and client-facing products. React, Next.js, Node.js, databases — the full stack. Some people come to me for an automation and end up with a whole system. That's totally fine.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send me a message here or reach out on WhatsApp/Discord. Tell me what you're trying to do, and I'll let you know if I can help. Usually we hop on a quick call, I ask a few questions, and we go from there. No formal proposals unless you want one.",
  },
]

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Frequently Asked <span className="text-blue-400">Questions</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Answers to common questions about working with me.
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
