interface CacheEntry<T = unknown> {
  expiresAt: number | null
  value: T
}

const globalCache = globalThis as typeof globalThis & {
  __nuxtKrKvCache?: Map<string, CacheEntry>
}

const cache = globalCache.__nuxtKrKvCache ??= new Map<string, CacheEntry>()

function isExpired(entry: CacheEntry | undefined) {
  return entry?.expiresAt !== null && entry?.expiresAt !== undefined && entry.expiresAt <= Date.now()
}

export const kv = {
  async get<T>(key: string): Promise<T | null> {
    const entry = cache.get(key)
    if (!entry) {
      return null
    }

    if (isExpired(entry)) {
      cache.delete(key)
      return null
    }

    return entry.value as T
  },
  async set<T>(key: string, value: T, options?: { ttl?: number }) {
    cache.set(key, {
      value,
      expiresAt: options?.ttl ? Date.now() + (options.ttl * 1000) : null
    })

    return value
  }
}
