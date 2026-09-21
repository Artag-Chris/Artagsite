import { Award, BookOpen, Clock, ExternalLink, Star } from "lucide-react"
import { getTranslations } from "next-intl/server"
import {
  courseCertifications,
  getCourseStats,
  pendingCourses,
} from "@/data/currentstudies/courseCertificationsData"

export async function CourseCertifications() {
  const t = await getTranslations("studies")
  const stats = getCourseStats()
  const hasHours = stats.totalHours > 0

  return (
    <section
      id="certifications"
      aria-labelledby="course-certs-heading"
      className="max-w-5xl mx-auto mt-16 mb-12 scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-2">
        <Award className="h-6 w-6 text-cyan-400" />
        <h2
          id="course-certs-heading"
          className="text-2xl md:text-3xl font-bold text-white tracking-tight"
        >
          {t("coursesTitle")}
        </h2>
      </div>

      <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
        {t("coursesIntroStart")}
        <a
          href="https://fernando-herrera.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-300 hover:text-cyan-200 font-medium underline underline-offset-2 decoration-cyan-500/40"
        >
          {t("coursesInstructor")}
        </a>
        {t("coursesIntroEnd")}
      </p>

      <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-zinc-700/60">
        <div>
          <div className="text-2xl font-bold text-cyan-300 tabular-nums">{stats.total}</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider">
            {t("certCount")}
          </div>
        </div>
        {hasHours && (
          <div>
            <div className="text-2xl font-bold text-cyan-300 tabular-nums">
              {stats.totalHours}+
            </div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">
              {t("hoursStudied")}
            </div>
          </div>
        )}
        <div>
          <div className="text-2xl font-bold text-cyan-300 flex items-center gap-1 tabular-nums">
            4.8
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider">
            {t("instructorRating")}
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
                <span className="text-xs text-zinc-400">
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
              {t("verifyCert")}
            </a>
          </li>
        ))}
      </ul>

      <p className="text-xs text-zinc-400 mt-6 italic">
        {t("coursesFooter")}
      </p>

      <div className="mt-10 pt-8 border-t border-zinc-700/60">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg md:text-xl font-bold text-white">
            {t("pendingCoursesTitle")}
          </h3>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          {t("pendingCoursesIntro")}
        </p>

        <ul className="space-y-3">
          {pendingCourses.map((course) => (
            <li
              key={course.id}
              className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl bg-zinc-800/20 border border-dashed border-zinc-700/60 hover:border-cyan-500/30 hover:bg-zinc-800/40 transition-colors"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-300" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h4 className="text-base font-semibold text-white">
                    {course.title}
                  </h4>
                  <span className="text-xs text-zinc-400">
                    · {course.instructor} · {course.platform} · {course.topic}
                  </span>
                </div>
              </div>

              <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-medium">
                <Clock className="h-3 w-3" />
                {t("plannedBadge", { year: course.year })}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
