/** Verify the public API viewer receives the spec format and renders resolved fields and examples. */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { prepareSite, startServer, type RunningServer, type Site } from './harness'
let site: Site
let server: RunningServer
beforeAll(async () => {
  site = await prepareSite('edge-site')
  writeFileSync(join(site.contentDir, 'guides/contract.json'), JSON.stringify({
    openapi: '3.0.3', info: { title: 'Contract', version: '1' },
    paths: { '/items/{itemId}': { post: { parameters: [{ $ref: '#/components/parameters/Id' }],
      requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' }, example: { label: 'New item' } } } },
      responses: { 200: { description: 'Saved', content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' }, example: { label: 'Saved item' } } } } },
    } } }, components: { parameters: { Id: { name: 'itemId', in: 'path', required: true, schema: { type: 'string' } } }, schemas: { Item: { type: 'object', properties: { label: { type: 'string', description: 'Visible label' } } } } },
  }))
  server = await startServer({ site })
})
afterAll(async () => { await server?.stop(); site?.cleanup() })
it('preserves the format for the correct download label and filename', async () => {
  const data = await (await fetch(server.url + '/api/content/guides/contract')).json()
  expect(data.spec.format).toBe('openapi')
  expect(JSON.parse(data.rawSpec).openapi).toBe('3.0.3')
})
it('server-renders names, fields, and both request and response examples', async () => {
  const html = await (await fetch(server.url + '/guides/contract')).text()
  expect(html).toContain('Download OpenAPI Spec')
  expect(html).not.toContain('Download Postman Collection')
  for (const text of ['itemId', 'Visible label', 'New item', 'Saved item', 'Copy example', 'Find an endpoint']) expect(html).toContain(text)
})
