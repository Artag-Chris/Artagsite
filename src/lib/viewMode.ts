export type ViewMode = 'b2b' | 'dev' | 'personal'

export const VIEW_MODE_STORAGE_KEY = 'artag:viewMode'
export const DEFAULT_VIEW_MODE: ViewMode = 'dev'

const VALID_MODES: readonly ViewMode[] = ['b2b', 'dev', 'personal']

export function isValidViewMode(value: unknown): value is ViewMode {
  return typeof value === 'string' && (VALID_MODES as readonly string[]).includes(value)
}

export function loadViewMode(storage: { getItem(key: string): string | null } | null): ViewMode {
  if (!storage) return DEFAULT_VIEW_MODE
  try {
    const raw = storage.getItem(VIEW_MODE_STORAGE_KEY)
    if (isValidViewMode(raw)) return raw
  } catch {
    // storage may throw (private mode, disabled cookies): fall back to default.
  }
  return DEFAULT_VIEW_MODE
}

export function saveViewMode(
  storage: { setItem(key: string, value: string): void } | null,
  mode: ViewMode
): void {
  if (!storage) return
  if (!isValidViewMode(mode)) return
  try {
    storage.setItem(VIEW_MODE_STORAGE_KEY, mode)
  } catch {
    // ignore write failures (private mode, quota)
  }
}
