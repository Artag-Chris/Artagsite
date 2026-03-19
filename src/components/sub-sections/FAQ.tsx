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
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in full-stack development with TypeScript, React, Node.js, and Next.js. For backend systems: PostgreSQL, MongoDB, GraphQL, and microservices architecture. For automation: n8n, Zapier, and custom integrations. Cloud infrastructure: AWS (EC2, Lambda, RDS, S3). Real-time systems: WebSockets, Socket.io. I also work with Docker, Kubernetes, and DevOps tooling.",
  },
  {
    question: "What's your experience with zero-downtime deployments?",
    answer:
      "I've led database migrations for 32,000+ users with a 0.004% error rate and zero downtime. This involved blue-green deployments, careful data validation, and rollback strategies. I specialize in planning and executing critical infrastructure changes while maintaining system availability.",
  },
  {
    question: "Can you handle payment integrations?",
    answer:
      "Yes. I've built multi-gateway payment systems handling $2M+ daily transaction volume. Experience includes Stripe, PayPal, custom payment processors, PCI compliance, secure data handling, webhook management, and reconciliation systems. I focus on reliability, security, and fraud prevention.",
  },
  {
    question: "Do you offer nearshore development?",
    answer:
      "Yes. I'm based in Colombia (Pereira, Risaralda) and offer nearshore development services. I work with startups, mid-market companies, and enterprises across North America, Latin America, and globally. Flexible engagement formats: full-time, part-time, contract, or strategic advisory.",
  },
  {
    question: "What's your approach to system architecture?",
    answer:
      "I design systems with scalability, maintainability, and business goals in mind. I use microservices for complex systems, evaluate trade-offs between different architectural patterns, and ensure systems can handle 100K+ concurrent users. I focus on clear documentation, monitoring, and operational simplicity.",
  },
  {
    question: "How do you handle real-time features?",
    answer:
      "I've built real-time web applications with <100ms latency using WebSockets, Socket.io, and server-sent events. I design efficient data synchronization, handle connection management, and optimize for performance and scalability.",
  },
  {
    question: "What process automation tools do you use?",
    answer:
      "Primarily n8n for enterprise automation workflows. I've automated 50+ business processes with <0.1% error rates. I also work with Zapier, Make, and custom automation solutions. My focus is on reliable, maintainable workflows that integrate with existing systems.",
  },
  {
    question: "Can you help optimize performance?",
    answer:
      "Yes. I've achieved 40-60% performance improvements across projects. This includes database query optimization, caching strategies, code splitting, load balancing, CDN implementation, and infrastructure optimization. I focus on identifying bottlenecks and delivering measurable improvements.",
  },
]

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-black via-[#0a0a0a]/50 to-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Frequently Asked <span className="text-cyan-400">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Answers to common questions about services, technologies, and capabilities.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full text-left px-4 sm:px-6 py-4 rounded-xl bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#262626] hover:border-cyan-500/40 transition-all duration-300 group-hover:from-[#0f0f0f] group-hover:to-[#1a1a1a]"
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
                    <ChevronDown className="w-5 h-5 text-cyan-400/60 group-hover:text-cyan-400 transition-colors" />
                  </motion.div>
                </div>
              </button>

              {/* Answer */}
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
                <div className="px-4 sm:px-6 py-4 bg-black/40 border border-t-0 border-[#262626] rounded-b-xl">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Schema Markup */}
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
