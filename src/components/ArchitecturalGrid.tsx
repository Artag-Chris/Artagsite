import type { ReactNode } from "react"

/**
 * ArchitecturalGrid — 1px shared hairline grid primitives (Master Spec §2.2).
 *
 * Uses a top/left hairline on the outer container and right/bottom hairlines
 * on every cell so adjacent cells never produce double 2px seams, and keeps
 * strictly orthogonal 0px geometry.
 */

export function ArchitecturalSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={`border-t border-[var(--border-hairline)] bg-[var(--bg-primary)] py-16 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <header className="mb-10 border-b border-[var(--border-hairline)] pb-8">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-signal)]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export function ArchitecturalGrid({
  columns = 3,
  children,
  className = "",
}: {
  columns?: 1 | 2 | 3 | 4
  children: ReactNode
  className?: string
}) {
  const colClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 md:grid-cols-3"

  return (
    <div
      className={`grid ${colClass} border-t border-l border-[var(--border-hairline)] bg-[var(--bg-secondary)] ${className}`}
    >
      {children}
    </div>
  )
}

export function ArchitecturalCell({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
}) {
  return (
    <div
      className={`border-r border-b border-[var(--border-hairline)] p-6 transition-colors ${
        interactive ? "hover:bg-[var(--bg-tertiary)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}
