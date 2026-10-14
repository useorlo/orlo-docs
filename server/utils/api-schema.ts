/** Resolve local OpenAPI references and present schema fields without fetching remote content. */
export type Schema = Record<string, any>
export interface SchemaField { name: string; type: string; required: boolean; description: string }
export interface SchemaExample { name: string; value: unknown; description?: string; generated?: boolean }

export function resolveLocalReferences(value: unknown, root: Schema, refs: string[] = [], depth = 0): any {
  if (depth > 40) return { description: 'Schema nesting limit reached.' }
  if (!value || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map(v => resolveLocalReferences(v, root, refs, depth + 1))
  const node = value as Schema
  if (typeof node.$ref === 'string') {
    const ref = node.$ref
    if (!ref.startsWith('#/')) return { description: `External reference: ${ref}`, reference: ref }
    if (refs.includes(ref)) return { description: `Recursive reference: ${ref.split('/').at(-1)}`, reference: ref }
    let target: any = root
    for (const part of ref.slice(2).split('/')) {
      const key = decodeURIComponent(part).replace(/~1/g, '/').replace(/~0/g, '~')
      if (!target || typeof target !== 'object' || !Object.hasOwn(target, key)) throw new Error(`Unresolved OpenAPI reference: ${ref}`)
      target = target[key]
    }
    const siblings = Object.fromEntries(Object.entries(node).filter(([key]) => key !== '$ref'))
    return { ...resolveLocalReferences(target, root, [...refs, ref], depth + 1), ...resolveLocalReferences(siblings, root, refs, depth + 1) }
  }
  // Example values are data, not schemas: a payload can legitimately contain a literal $ref field.
  return Object.fromEntries(Object.entries(node).map(([key, val]) => [key,
    ['example', 'value', 'default', 'enum', 'const'].includes(key) ? val : resolveLocalReferences(val, root, refs, depth + 1),
  ]))
}

export function schemaType(schema: Schema = {}): string {
  const choices = schema.oneOf ?? schema.anyOf
  if (choices) return choices.map(schemaType).join(' | ') + (schema.nullable ? ' | null' : '')
  if (schema.allOf) return schema.allOf.map(schemaType).join(' & ') + (schema.nullable ? ' | null' : '')
  const type = Array.isArray(schema.type) ? schema.type.join(' | ') : schema.type
  if (type === 'array') return `array<${schemaType(schema.items)}>`
  return `${type ?? (schema.properties ? 'object' : 'any')}${schema.format ? ` (${schema.format})` : ''}${schema.nullable ? ' | null' : ''}`
}

/** Flatten nested object fields for readable tables, retaining array and union branches. */
export function schemaFields(schema?: Schema, direction: 'request' | 'response' = 'response'): SchemaField[] {
  const rows: SchemaField[] = []
  function walk(node: Schema, prefix: string, depth: number) {
    if (depth > 12 || rows.length >= 200) return
    for (const [name, child] of Object.entries(node.properties ?? {}) as [string, Schema][]) {
      if (rows.length >= 200) return
      if ((direction === 'request' && child.readOnly) || (direction === 'response' && child.writeOnly)) continue
      const field = prefix ? `${prefix}.${name}` : name
      const notes = [child.description, child.enum ? `Allowed: ${child.enum.map((v: unknown) => JSON.stringify(v)).join(', ')}.` : '',
        Object.hasOwn(child, 'default') ? `Default: ${JSON.stringify(child.default)}.` : '',
        child.minimum !== undefined ? `Minimum: ${child.minimum}.` : '', child.maximum !== undefined ? `Maximum: ${child.maximum}.` : '']
      rows.push({ name: field, type: schemaType(child), required: node.required?.includes(name) ?? false, description: notes.filter(Boolean).join(' ') })
      walk(child, field, depth + 1)
    }
    if (node.items) walk(node.items, `${prefix || 'items'}[]`, depth + 1)
    for (const branch of node.allOf ?? []) walk(branch, prefix, depth + 1)
    for (const [i, branch] of (node.oneOf ?? node.anyOf ?? []).entries()) walk(branch, `${prefix ? prefix + ' ' : ''}(option ${i + 1})`, depth + 1)
  }
  if (schema) walk(schema, '', 0)
  return rows
}

/** Fallback examples illustrate the declared shape; they are not captured API responses. */
export function schemaExample(schema?: Schema, direction: 'request' | 'response' = 'response', depth = 0): unknown {
  if (!schema || depth > 12 || schema.reference) return undefined
  for (const key of ['example', 'default', 'const']) if (Object.hasOwn(schema, key)) return schema[key]
  if (schema.examples?.length) return schema.examples[0]
  if (schema.enum?.length) return schema.enum[0]
  if (schema.oneOf || schema.anyOf) return schemaExample((schema.oneOf ?? schema.anyOf)[0], direction, depth + 1)
  if (schema.allOf) {
    const parts = schema.allOf.map((s: Schema) => schemaExample(s, direction, depth + 1))
    return parts.every((p: unknown) => p && typeof p === 'object' && !Array.isArray(p)) ? Object.fromEntries(parts.flatMap((part: Schema) => Object.entries(part))) : undefined
  }
  const type = Array.isArray(schema.type) ? schema.type.find((t: string) => t !== 'null') : schema.type
  if (type === 'object' || schema.properties) {
    if (!schema.properties) return undefined
    const pairs = Object.entries(schema.properties).filter(([, c]) => !(direction === 'request' ? (c as Schema).readOnly : (c as Schema).writeOnly))
      .map(([name, child]) => [name, schemaExample(child as Schema, direction, depth + 1)])
      .filter(([, value]) => value !== undefined)
    return Object.fromEntries(pairs)
  }
  if (type === 'array') {
    const item = schemaExample(schema.items, direction, depth + 1)
    return item === undefined ? [] : [item]
  }
  if (type === 'boolean') return false
  if (type === 'integer' || type === 'number') return schema.minimum ?? 0
  if (type === 'null') return null
  if (type === 'string') return schema.format === 'uuid' ? '11111111-1111-4111-8111-111111111111'
    : schema.format === 'date-time' ? '2026-10-14T12:00:00Z' : schema.format === 'date' ? '2026-10-14' : 'string'
  return undefined
}

export function mediaExamples(media: Schema = {}, direction: 'request' | 'response'): SchemaExample[] {
  if (Object.hasOwn(media, 'example')) return [{ name: 'Example', value: media.example }]
  const named = Object.entries(media.examples ?? {}).filter(([, ex]) => Object.hasOwn(ex as object, 'value'))
    .map(([name, ex]) => ({ name: (ex as Schema).summary ?? name, description: (ex as Schema).description, value: (ex as Schema).value }))
  if (named.length) return named
  const value = schemaExample(media.schema, direction)
  return value === undefined ? [] : [{ name: 'Example', value, generated: !Object.hasOwn(media.schema ?? {}, 'example') }]
}
