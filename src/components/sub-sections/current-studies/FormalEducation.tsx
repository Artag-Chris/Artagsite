import { Award, FileText, GraduationCap, Palette } from "lucide-react"

export function FormalEducation() {
  return (
    <section
      aria-labelledby="formal-education-heading"
      className="max-w-5xl mx-auto mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="h-6 w-6 text-amber-400" />
        <h2
          id="formal-education-heading"
          className="text-2xl md:text-3xl font-bold text-white"
        >
          Formal Education
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="relative p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30 hover:border-amber-400/60 transition-colors">
          <div className="absolute -top-3 -right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-zinc-900 text-xs font-bold shadow-lg shadow-amber-500/30">
            <Award className="h-3 w-3" />
            5.0 / 5.0
          </div>

          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <GraduationCap className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Misión TIC 2022 — Software Development
              </h3>
              <p className="text-sm text-amber-300/90 font-medium">
                Universidad Autónoma de Bucaramanga (UNAB)
              </p>
              <p className="text-xs text-zinc-400">Colombia · 2021 – 2022</p>
            </div>
          </div>

          <ul className="text-sm text-zinc-300 space-y-2 mb-4">
            <li className="flex gap-2">
              <span className="text-amber-400" aria-hidden>
                •
              </span>
              <span>
                Full government scholarship —{" "}
                <span className="text-amber-300">
                  Programa Misión TIC 2022, Ministerio TIC de Colombia
                </span>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-400" aria-hidden>
                •
              </span>
              <span>
                <span className="text-amber-300 font-semibold">5.0 / 5.0</span> in
                every semester (Colombian grading scale, top mark)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-400" aria-hidden>
                •
              </span>
              <span>
                Web application development — fundamentals, JavaScript /
                TypeScript, frontend &amp; backend
              </span>
            </li>
          </ul>

          <a
            href="/Certificado_Mision_Tic_2022.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-sm font-medium transition-colors"
          >
            <FileText className="h-4 w-4" />
            View official certificate (PDF)
          </a>
        </article>

        <article className="relative p-6 rounded-2xl bg-zinc-800/40 border border-zinc-700/60">
          <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-600">
            Program cancelled
          </div>

          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center shrink-0">
              <Palette className="h-6 w-6 text-pink-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Web Design
              </h3>
              <p className="text-sm text-pink-300/90 font-medium">
                SENA — Servicio Nacional de Aprendizaje
              </p>
              <p className="text-xs text-zinc-400">Colombia · 2023</p>
            </div>
          </div>

          <p className="text-sm text-zinc-300 mb-2">
            Enrolled out of personal interest in the aesthetic side of the craft
            — visual design, UI fundamentals, layout.
          </p>
          <p className="text-sm text-zinc-400">
            The program was cancelled by SENA due to a platform migration and
            low enrolment. The interest stuck — visible across my UI work.
          </p>
        </article>
      </div>
    </section>
  )
}
