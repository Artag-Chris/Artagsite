// Single source of truth for global navigation.
// Master Spec §2: exactly 3 primary routes, identical in header and footer,
// in every locale. Labels are resolved via the `nav` i18n namespace.

export type PrimaryNavId = "home" | "labs" | "aboutMe"

export interface PrimaryNavItem {
  id: PrimaryNavId
  href: "/" | "/labs" | "/about-me"
}

export const PRIMARY_NAV: readonly PrimaryNavItem[] = [
  { id: "home", href: "/" },
  { id: "labs", href: "/labs" },
  { id: "aboutMe", href: "/about-me" },
] as const

/**
 * Secondary routes that stay reachable (and indexed) but are not in the global
 * menu. Each one is linked from its "parent" primary route.
 */
export const SECONDARY_ROUTES = {
  labs: ["/projects", "/engineering-notes", "/currentStudies", "/private-servers"],
  aboutMe: ["/favorites", "/my-faith", "/personal"],
} as const

/** `pathname` comes from next-intl's usePathname (locale prefix already stripped). */
export function isNavActive(pathname: string, href: PrimaryNavItem["href"]): boolean {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}
