"use client"

import { motion } from "framer-motion"
import type { UseCase } from "@/data/skillsData"
import { ArrowRight } from "lucide-react"

interface UseCaseCardProps {
  useCase: UseCase
  index: number
  isCarousel?: boolean
  onSelect?: (useCase: UseCase) => void
}

export function UseCaseCard({ useCase, index, isCarousel = false, onSelect }: UseCaseCardProps) {
  const Icon = useCase.icon

  const cardWidthClass = isCarousel ? "w-[85vw] sm:w-[70vw] md:w-[400px] lg:w-[440px] flex-shrink-0" : "w-full"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className={`${cardWidthClass} group h-fit`}
      style={isCarousel ? { scrollSnapAlign: "center" } : undefined}
    >
      <motion.div
        layoutId={`usecase-card-${useCase.id}`}
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        onClick={() => onSelect?.(useCase)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Top accent gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card background with layered depth */}
        <div className="absolute inset-0 bg-[#0e1420] border border-white/[0.06] rounded-2xl group-hover:border-white/[0.12] transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl pointer-events-none" />

        {/* Subtle glow on hover */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-5 sm:p-6">
          {/* Icon + Title row */}
          <div className="flex items-start gap-4 mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] flex-shrink-0 group-hover:border-white/[0.1] transition-all duration-300">
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${useCase.iconColor}`} />
              </div>
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <h3
                className="font-bold text-base sm:text-lg text-white/90 group-hover:text-white transition-colors duration-300 line-clamp-2 leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {useCase.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-400/80 text-sm leading-relaxed line-clamp-3 mb-5">
            {useCase.problem}
          </p>

          {/* Primary metric — featured */}
          {useCase.metrics.length > 0 && (
            <div className="mb-5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] group-hover:border-white/[0.08] transition-all duration-300">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-white/90 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {useCase.metrics[0].value}
                </span>
              </div>
              <p className="text-zinc-500 text-xs mt-1.5 font-medium">{useCase.metrics[0].label}</p>
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {useCase.techStack.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-zinc-400 font-medium tracking-wide uppercase"
              >
                {tech}
              </span>
            ))}
            {useCase.techStack.length > 3 && (
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] text-zinc-600 font-medium">
                +{useCase.techStack.length - 3}
              </span>
            )}
          </div>

          {/* CTA row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-600 font-mono uppercase tracking-widest">
              Use Case
            </span>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 group-hover:text-blue-400 transition-colors duration-300">
              <span className="font-medium">Explore</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
