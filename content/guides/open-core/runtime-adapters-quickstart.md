---
title: Runtime Adapters Quickstart
description: Use Orlo runtime adapters in your own host application
---

# Runtime Adapters Quickstart

`@orlo/runtime-adapters` gives you reusable adapter implementations while leaving control-plane behavior in your host app.

## Design model

You provide:

- credential resolution
- org context
- optional custom `fetch`

The adapter provides:

- provider-specific request translation
- normalized inference response shape

## Example

```ts
import { OpenAIAdapter } from '@orlo/runtime-adapters';

const adapter = new OpenAIAdapter({
  resolveCredential: async (orgId, provider) => {
    return {
      apiKey: process.env.OPENAI_API_KEY!,
      baseUrl: 'https://api.openai.com/v1',
    };
  },
});

const response = await adapter.infer({
  orgId: '00000000-0000-0000-0000-000000000001',
  model: 'gpt-4.1-mini',
  messages: [{ role: 'user', content: 'Summarize this incident.' }],
});
```

## Best fit

Use this package if you want transport adapters without importing Orlo’s private API or database logic.
