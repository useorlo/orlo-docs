---
title: Validation Quickstart
description: Get started with Orlo validation primitives
---

# Validation Quickstart

Use `@orlo/validation` when you need deterministic output checks.

## What it does

- schema validation
- rule-based validation
- validation summaries
- sandboxed custom rule execution

## Example

```ts
import { validate, executeCustomRule } from '@orlo/validation';

const result = validate(
  '{"label":"fraud","confidence":0.92}',
  { type: 'object', required: ['label', 'confidence'] },
  {
    rules: [
      { type: 'required_fields', config: { fields: ['label', 'confidence'] } },
    ],
  },
);

const customEntries = executeCustomRule(
  `
    const parsed = JSON.parse(output);
    if (parsed.confidence < 0.8) {
      entries.push({ rule: 'confidence', message: 'Confidence below threshold', severity: 'warning' });
    }
  `,
  '{"label":"fraud","confidence":0.72}',
  {},
);
```

## Best fit

Use this package when you want deterministic validation logic without adopting the full Orlo Platform.
