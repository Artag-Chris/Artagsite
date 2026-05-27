import { Award, BookOpen, ExternalLink, Star } from "lucide-react"
import {
  courseCertifications,
  getCourseStats,
} from "@/data/currentstudies/courseCertificationsData"

export function CourseCertifications() {
  const stats = getCourseStats()
  const hasHours = stats.totalHours > 0

  return (
    <section
      id="certifications"
      aria-labelledby="course-certs-heading"
      className="max-w-5xl mx-auto mt-16 mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-800/40 border border-zinc-700/60 scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-2">
        <Award className="h-6 w-6 text-cyan-400" />
        <h2
          id="course-certs-heading"
          className="text-2xl md:text-3xl font-bold text-white"
        >
          Online Courses &amp; Certifications
        </h2>
      </div>

      <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
        Trained primarily through{" "}
        <a
          href="https://fernando-herrera.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-300 hover:text-cyan-200 font-medium underline underline-offset-2 decoration-cyan-500/40"
        >
          Fernando Herrera (DevTalles)
        </a>{" "}
        — top-5 Spanish-speaking instructor on Udemy, 4.8+ avg rating, 19+ years
        in production. Every certificate below is publicly verifiable on Udemy.
      </p>

      <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-zinc-700/60">
        <div>
          <div className="text-2xl font-bold text-cyan-300">{stats.total}</div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider">
            Certifications
          </div>
        </div>
        {hasHours && (
          <div>
            <div className="text-2xl font-bold text-cyan-300">
              {stats.totalHours}+
            </div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              Hours studied
            </div>
          </div>
        )}
        <div>
          <div className="text-2xl font-bold text-cyan-300 flex items-center gap-1">
            4.8
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider">
            Instructor rating
          </div>
        </div>
      </div>

      <ul className="space-y-3">
        {courseCertifications.map((course) => (
          <li
            key={course.id}
            className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/40 hover:border-cyan-500/40 hover:bg-zinc-800/60 transition-colors"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-cyan-300" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="text-base font-semibold text-white">
                  {course.title}
                </h3>
                <span className="text-xs text-zinc-500">
                  · {course.instructor} · {course.platform} · {course.year}
                  {course.hours ? ` · ${course.hours}h` : ""}
                </span>
              </div>
              {course.reinforces && (
                <p className="text-xs text-zinc-400 mt-1">
                  <span className="text-cyan-400/80">→</span>{" "}
                  {course.reinforces}
                </p>
              )}
            </div>

            <a
              href={course.certUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-200 text-xs font-medium transition-colors"
              aria-label={`Verify certificate for ${course.title}`}
            >
              <ExternalLink className="h-3 w-3" />
              Verify cert
            </a>
          </li>
        ))}
      </ul>

      <p className="text-xs text-zinc-500 mt-6 italic">
        More certifications from Fernando Herrera and other platforms — listed
        here as the strongest signals; full transcript available on request.
      </p>
    </section>
  )
}
