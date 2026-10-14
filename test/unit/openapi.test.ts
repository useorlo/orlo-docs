/** API reference regression tests: shared fields, examples, recursive contracts, and safe reference resolution. */
import { describe, expect, it } from 'vitest'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { parseApiSpec, apiSpecToPlainText } from '../../server/utils/openapi-parser'
import { resolveLocalReferences, mediaExamples, schemaFields } from '../../server/utils/api-schema'

const fixture = {
  openapi: '3.0.3', info: { title: 'Example', version: '1' },
  paths: { '/items/{id}': {
    parameters: [{ $ref: '#/components/parameters/Id' }, { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } }],
    post: { parameters: [{ name: 'limit', in: 'query', description: 'Override', schema: { type: 'integer', default: 5 } }],
      requestBody: { $ref: '#/components/requestBodies/Create' }, responses: { '201': { $ref: '#/components/responses/Created' }, '204': { description: 'No body' } } },
  } },
  components: {
    parameters: { Id: { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } } },
    schemas: { Item: { type: 'object', required: ['name'], properties: { name: { type: 'string' }, count: { type: 'integer', example: 0 }, active: { type: 'boolean', example: false }, child: { $ref: '#/components/schemas/Item' } } } },
    requestBodies: { Create: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' }, examples: { sample: { $ref: '#/components/examples/Sample' } } } } } },
    responses: { Created: { description: 'Created', headers: { 'X-Trace': { schema: { type: 'string' }, description: 'Trace ID' } }, content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' }, example: null } } } },
    examples: { Sample: { summary: 'Small item', value: { name: 'Support', active: false, count: 0, $ref: 'literal payload value' } } },
  },
}

describe('OpenAPI contracts', () => {
  it('resolves shared parameters, request bodies, response schemas, headers and named examples', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'orlo-spec-'))
    try {
      await writeFile(join(dir, 'spec.json'), JSON.stringify(fixture))
      const spec = await parseApiSpec(join(dir, 'spec.json'))
      const endpoint = spec.groups[0].endpoints[0]
      expect(endpoint.parameters).toHaveLength(2)
      expect(endpoint.parameters[0]).toMatchObject({ name: 'id', location: 'path', required: true, type: 'string (uuid)' })
      expect(endpoint.parameters[1]).toMatchObject({ description: 'Override', example: 5 })
      expect(endpoint.requestBody?.schema?.properties?.name.type).toBe('string')
      expect(endpoint.requestBody?.examples?.[0]).toMatchObject({ name: 'Small item', value: { active: false, count: 0, $ref: 'literal payload value' } })
      expect(endpoint.responses[0].description).toBe('Created')
      expect(endpoint.responses[0].examples?.[0].value).toBeNull()
      expect(endpoint.responses[0].headers?.[0].name).toBe('X-Trace')
      expect(endpoint.responses[1].schema).toBeUndefined()
      expect(endpoint.responses[1].examples).toEqual([])
      expect(JSON.stringify(spec).length).toBeLessThan(20000)
      const plain = apiSpecToPlainText(spec)
      expect(plain).toContain('`name`: string (required)')
      expect(plain).toContain('"active": false')
      expect(plain).toContain('Header: X-Trace')
      expect(spec.rawSpec).toBe(JSON.stringify(fixture))
    } finally { await rm(dir, { recursive: true, force: true }) }
  })
  it('keeps falsy values and distinguishes schema-generated examples', () => {
    for (const value of [false, 0, '', null]) expect(mediaExamples({ example: value }, 'response')[0].value).toBe(value)
    expect(mediaExamples({ schema: { type: 'boolean' } }, 'response')[0]).toMatchObject({ value: false, generated: true })
    expect(mediaExamples({ schema: { type: 'object', additionalProperties: true } }, 'response')).toEqual([])
  })
  it('handles pointer escaping, cycles, unresolved references and external references without network access', () => {
    const root = { components: { schemas: { 'a/b~c': { type: 'string' } } } }
    expect(resolveLocalReferences({ $ref: '#/components/schemas/a~1b~0c' }, root)).toEqual({ type: 'string' })
    expect(() => resolveLocalReferences({ $ref: '#/missing' }, root)).toThrow('Unresolved')
    expect(resolveLocalReferences({ $ref: 'https://example.com/schema' }, root).reference).toBe('https://example.com/schema')
    expect(() => resolveLocalReferences({ $ref: '#/__proto__/polluted' }, root)).toThrow('Unresolved')
  })
  it('describes nested required fields, arrays and composition without exposing write-only response fields', () => {
    const schema = { allOf: [{ type: 'object', properties: { credentials: { type: 'array', items: { type: 'object', required: ['id'], properties: { id: { type: 'string' }, secret: { type: 'string', writeOnly: true } } } } } }] }
    expect(schemaFields(schema)).toContainEqual(expect.objectContaining({ name: 'credentials[].id', required: true }))
    expect(schemaFields(schema).some(f => f.name.endsWith('secret'))).toBe(false)
    expect(schemaFields(schema, 'request').some(f => f.name.endsWith('secret'))).toBe(true)
  })
})

// The public contract must remain useful in both the page and machine-readable text.
describe('Orlo public API reference', () => {
  it('renders real parameter names, nested fields, and examples from the shipped specification', async () => {
    const spec = await parseApiSpec(join(process.cwd(), 'content/platform-api/openapi.json'))
    const endpoints = spec.groups.flatMap(g => g.endpoints)
    expect(endpoints.length).toBeGreaterThan(90)
    for (const endpoint of endpoints) {
      for (const param of endpoint.parameters) {
        expect(param.name, endpoint.path).toBeTruthy()
        expect(param.location, endpoint.path).toBeTruthy()
      }
    }
    const document = endpoints.find(e => e.method === 'get' && e.path === '/v1/tasks/{taskId}/documents/{id}')!
    expect(document.parameters.map(p => p.name)).toEqual(['taskId', 'id'])
    expect(schemaFields(document.responses[0].schema).map(f => f.name)).toContain('chunk_count')
    expect(document.responses[0].examples?.[0].value).toMatchObject({ status: 'ready', name: 'Support handbook.md' })
    const run = endpoints.find(e => e.method === 'post' && e.path === '/v1/tasks/{taskId}/run')!
    expect(run.requestBody?.examples?.[0].value).toMatchObject({ input: { ticket: 'I cannot sign in' } })
    const result = run.responses.find(r => r.statusCode === '200')!
    expect(schemaFields(result.schema).map(f => f.name)).toContain('validation.valid')
    expect(result.examples?.[0].value).toMatchObject({ validation: { valid: true } })
    const credentials = endpoints.find(e => e.method === 'get' && e.path === '/v1/credentials')!
    expect(schemaFields(credentials.responses[0].schema).some(f => /api_key|encrypted/i.test(f.name))).toBe(false)
    const plain = apiSpecToPlainText(spec)
    expect(plain).toContain('`validation.valid`')
    expect(plain).toContain('Support handbook.md')
  })
})
