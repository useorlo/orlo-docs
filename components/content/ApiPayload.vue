<!-- Shared request/response fields and examples. Disclosures keep large API contracts readable. -->
<template>
  <div class="api-payload">
    <p v-if="payload.schema" class="schema-type">{{ schemaType(payload.schema) }}</p>
    <details v-if="fields.length" class="payload-details">
      <summary>Fields <span class="count">{{ fields.length }}</span></summary>
      <div class="table-scroll">
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr v-for="(field, i) in fields" :key="`${field.name}-${i}`">
              <td><code>{{ field.name }}</code><span v-if="field.required" class="required">Required</span></td>
              <td><code>{{ field.type }}</code></td>
              <td>{{ field.description || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="note">Nested fields marked required are required when their parent object is present.</p>
    </details>
    <p v-else-if="payload.schema?.description" class="note">{{ payload.schema.description }}</p>
    <p v-else-if="payload.schema?.type === 'object'" class="note">This specification permits additional fields but does not define their names.</p>
    <details v-for="(example, i) in examples" :key="i" class="payload-details">
      <summary>{{ example.name === 'Example' ? 'Example' : `Example: ${example.name}` }}</summary>
      <p v-if="example.description" class="note">{{ example.description }}</p>
      <p v-if="example.generated" class="note">Illustrative values generated from the schema.</p>
      <div class="example-toolbar"><button type="button" @click="copyExample(example.value, i)">{{ copied === i ? 'Copied' : 'Copy example' }}</button></div>
      <pre><code>{{ formatExample(example.value) }}</code></pre>
    </details>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { schemaFields, schemaType, mediaExamples, type Schema, type SchemaExample } from '~/server/utils/api-schema'
const props = defineProps<{ payload: { schema?: Schema; example?: unknown; examples?: SchemaExample[]; contentType?: string }; direction: 'request' | 'response' }>()
const fields = computed(() => schemaFields(props.payload.schema, props.direction))
const examples = computed(() => props.payload.examples ?? mediaExamples(props.payload, props.direction))
const copied = ref<number | null>(null)
function formatExample(value: unknown): string {
  return typeof value === 'string' && !props.payload.contentType?.includes('json') ? value : JSON.stringify(value, null, 2)
}
async function copyExample(value: unknown, index: number) {
  try { await navigator.clipboard.writeText(formatExample(value)); copied.value = index }
  catch { copied.value = null }
}
</script>

<style scoped>
.schema-type, .note { color: var(--color-text-secondary); font-size: var(--font-size-sm); }
.payload-details { border-top: 1px solid var(--color-border-primary); padding: var(--spacing-3) 0; }
summary { cursor: pointer; font-weight: 500; font-size: var(--font-size-sm); }
.count { color: var(--color-text-secondary); margin-left: var(--spacing-2); }
.table-scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; margin: var(--spacing-3) 0; font-size: var(--font-size-sm); }
th, td { text-align: left; vertical-align: top; padding: var(--spacing-2); border-bottom: 1px solid var(--color-border-primary); }
td code { overflow-wrap: anywhere; }
.required { display: block; font-size: var(--font-size-xs); color: var(--color-text-secondary); }
.example-toolbar { display: flex; justify-content: flex-end; margin-top: var(--spacing-2); }
button { background: var(--color-bg-secondary); color: var(--color-text-primary); border: 1px solid var(--color-border-primary); padding: var(--spacing-1) var(--spacing-2); border-radius: var(--radius-sm); cursor: pointer; }
pre { max-height: 380px; overflow: auto; font-size: var(--font-size-xs); }
</style>
