/** Redirect compatibility: preserve reader and agent URLs without allowing external destinations. */
import { describe, expect, it } from 'vitest'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { contentRedirectTarget, createContentRedirectLoader, parseContentRedirects } from '../../server/utils/content-redirects'

const redirects = parseContentRedirects('{"/guides/intro":"/start/first-task"}')
const target = (path: string) => contentRedirectTarget(new URL(path, 'https://docs.useorlo.com'), redirects)

describe('content redirects', () => {
  it('preserves queries and supports page, trailing slash, and Markdown entry points', () => {
    expect(target('/guides/intro/?from=email')).toBe('/start/first-task?from=email')
    expect(target('/guides/intro.md')).toBe('/start/first-task.md')
    expect(target('/api/content/raw/guides/intro?download=1')).toBe('/api/content/raw/start/first-task?download=1')
    expect(target('/start/first-task')).toBeNull()
    expect(target('/guides/%')).toBeNull()
  })
  it('refuses external paths, header injection, loops, and chains', () => {
    for (const value of [
      { '/old': 'https://example.com' }, { '/old': '//example.com' },
      { '/old': '/new\r\nLocation:evil' }, { '/old': '/old' },
      { '/old': '/next', '/next': '/final' }, { '/old': '/../private' },
    ]) expect(() => parseContentRedirects(JSON.stringify(value))).toThrow()
  })
  it('allows sites without a map and loads a site-specific map from content', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'content-redirects-'))
    try {
      expect((await createContentRedirectLoader()(dir)).size).toBe(0)
      await writeFile(join(dir, '_redirects.json'), '{"/old":"/start"}')
      expect((await createContentRedirectLoader()(dir)).get('/old')).toBe('/start')
    }
    finally { await rm(dir, { recursive: true, force: true }) }
  })
})
