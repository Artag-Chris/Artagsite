const PARTICLES = [
  { left: 8, top: 14, delay: 0, duration: 18 },
  { left: 22, top: 72, delay: 3, duration: 22 },
  { left: 38, top: 28, delay: 1, duration: 20 },
  { left: 52, top: 84, delay: 4, duration: 24 },
  { left: 67, top: 18, delay: 2, duration: 19 },
  { left: 78, top: 62, delay: 5, duration: 23 },
  { left: 89, top: 36, delay: 1.5, duration: 21 },
  { left: 14, top: 48, delay: 3.5, duration: 25 },
] as const

export function StudyParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full motion-safe:animate-study-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
