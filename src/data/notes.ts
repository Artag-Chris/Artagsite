import notesEn from "./notes.en.json"
import notesEs from "./notes.es.json"

export interface NoteSection {
  heading: string
  body: string
  list?: string[]
  code?: string
}

export interface Note {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified: string
  readingTime: number
  tags: string[]
  intro: string
  sections: NoteSection[]
  relatedProject?: string
}

export const notesByLocale: Record<"en" | "es", Note[]> = {
  en: notesEn as Note[],
  es: notesEs as Note[],
}

export function getNoteBySlug(slug: string, locale: "en" | "es"): Note | undefined {
  return notesByLocale[locale].find((note) => note.slug === slug)
}
