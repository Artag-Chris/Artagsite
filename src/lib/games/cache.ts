/**
 * Tiny in-memory TTL cache with in-flight deduplication.
 * Same pattern as src/lib/rateLimit.ts — lives only as long as the server instance,
 * which is fine for per-instance dedupe. DO NOT rely on it as a shared store across
 * serverless instances (swap for Upstash/Redis if cross-instance consistency is needed).
 */

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

const store = new Map<string, CacheEntry<unknown>>()
const inflight = new Map<string, Promise<unknown>>()

/**
 * Runs `fn` and caches the result for `ttlMs`.
 * Concurrent calls with the same key share a single in-flight promise.
 */
export function withCache<T>(key: string, fn: () => Promise<T>, ttlMs = 15 * 60 * 1000): Promise<T> {
  const now = Date.now()
  const hit = store.get(key)
  if (hit && hit.expiresAt > now) {
    return Promise.resolve(hit.value as T)
  }

  const running = inflight.get(key)
  if (running) {
    return running as Promise<T>
  }

  const task = fn()
    .then((value) => {
      store.set(key, { value, expiresAt: now + ttlMs })
      return value
    })
    .finally(() => {
      inflight.delete(key)
    })

  inflight.set(key, task)
  return task
}

export function getCache<T>(key: string): T | undefined {
  const hit = store.get(key)
  if (!hit || hit.expiresAt <= Date.now()) return undefined
  return hit.value as T
}

export function setCache<T>(key: string, value: T, ttlMs = 15 * 60 * 1000): void {
  store.set(key, { value, expiresAt: Date.now() + ttlMs })
}

export function clearCache(): void {
  store.clear()
  inflight.clear()
}