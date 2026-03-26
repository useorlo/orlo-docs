---
title: Agent SDK Quickstart
description: Use the Orlo agent governance SDK
---

# Agent SDK Quickstart

`@orlo/agent-sdk` is the thin developer-facing surface for agent-step governance.

## What it needs

The SDK talks to **Orlo Platform**. It is Open Core code, but it expects a live Orlo governance backend.

## Example

```ts
import { OrloAgentClient, OrloAgentRun, createGenericRuntimeAdapter } from '@orlo/agent-sdk';

const client = new OrloAgentClient({
  baseUrl: 'https://api.useorlo.com',
  orgId: '00000000-0000-0000-0000-000000000001',
});

const run = await OrloAgentRun.start(client, {
  task_id: 'task-123',
  framework: 'custom-js-runtime',
  goal: 'Resolve a support escalation safely',
});

const runtime = createGenericRuntimeAdapter({ run, autoRequestApproval: true });
```

## Best fit

Use this package when you already have an agent runtime and want Orlo to govern meaningful steps without becoming the runtime itself.
