/** Content-owned redirects preserve published page and Markdown URLs after a move. */
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const localPath = /^\/(?:[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*)?$/

export function parseContentRedirects(source: string): ReadonlyMap<string, string> {
  const value: unknown = JSON.parse(source)
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Redirects must be a path map')
  const entries = Object.entries(value)
  for (const [from, to] of entries) {
    if (!localPath.test(from) || typeof to !== 'string' || !localPath.test(to) || from === to) {
      throw new Error('Redirects must use distinct local page paths')
    }
  }
  const redirects = new Map(entries as Array<[string, string]>)
  for (const to of redirects.values()) {
    if (redirects.has(to)) throw new Error('Redirects must point directly to their final page')
  }
  return redirects
}

export function contentRedirectTarget(url: URL, redirects: ReadonlyMap<string, string>): string | null {
  let path: string
  try { path = decodeURIComponent(url.pathname).replace(/\/$/, '') || '/' }
  catch { return null }
  const rawPrefix = '/api/content/raw'
  const raw = path.startsWith(rawPrefix + '/')
  if (raw) path = path.slice(rawPrefix.length)
  const markdown = !raw && path.endsWith('.md')
  if (markdown) path = path.slice(0, -3)
  const destination = redirects.get(path)
  if (!destination) return null
  const page = destination === '/' && (raw || markdown) ? '/home' : destination
  return (raw ? rawPrefix : '') + page + (markdown ? '.md' : '') + url.search
}

/** Check for changes at most once per five seconds; ordinary page requests reuse the map. */
export function createContentRedirectLoader() {
  let cache: { dir: string, checked: number, mtime: number, value: ReadonlyMap<string, string> } | undefined
  return async (dir: string): Promise<ReadonlyMap<string, string>> => {
    const now = Date.now()
    if (cache?.dir === dir && now - cache.checked < 5000) return cache.value
    const previous = cache?.dir === dir ? cache : undefined
    try {
      const file = join(dir, '_redirects.json')
      const info = await stat(file)
      if (previous?.mtime === info.mtimeMs) { previous.checked = now; return previous.value }
      const value = parseContentRedirects(await readFile(file, 'utf8'))
      cache = { dir, checked: now, mtime: info.mtimeMs, value }
      return value
    }
    catch (error) {
      // A malformed optional map must not take down the documentation itself.
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') console.warn('[content-redirects] Could not load the redirect map')
      cache = { dir, checked: now, mtime: -1, value: new Map() }
      return cache.value
    }
  }
}
