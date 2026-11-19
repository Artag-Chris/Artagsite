import { Award, Briefcase, GraduationCap } from "lucide-react"

// Tab metadata only. All copy lives in the i18n dictionaries under
// `about.timeline.*` so /es renders fully translated.
export type AboutTabId = "experience" | "education" | "achievements"

export interface TabItem {
  id: AboutTabId
  icon: React.ElementType
}

export const tabs: TabItem[] = [
  { id: "experience", icon: Briefcase },
  { id: "education", icon: GraduationCap },
  { id: "achievements", icon: Award },
]

export interface TimelineEntry {
  role: string
  org: string
  period: string
  description: string
}

export interface AchievementEntry {
  title: string
  description: string
}
