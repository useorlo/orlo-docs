---
title: "How do I reuse answers for repeated task requests?"
description: "Opt into eligible answer reuse while retaining validation and a separate trace for each request."
sidebar_title: "Reuse repeated answers"
order: 10
---

# How do I reuse answers for repeated task requests?

Enable `config.response_cache.enabled` through the Tasks API to reuse eligible identical answers for up to five minutes. Reuse is off by default. Each request still checks availability, validates the answer, and records its own trace; a miss or cache outage makes a model call.

## Enable and verify reuse

Response reuse can reduce latency and provider cost for repeated requests. It is **off by default** and configured through the Tasks API with `config.response_cache.enabled`.

When updating an existing task, read it first, retain its other configuration values, and send the current version ID:

```javascript
const url = `https://api.useorlo.com/v1/tasks/${taskId}`;
const headers = { Authorization: `Bearer ${orloApiKey}` };
const current = await fetch(url, { headers });
if (!current.ok) throw new Error(`Task read failed: ${current.status}`);
const task = await current.json();
const saved = await fetch(url, {
  method: "PUT",
  headers: { ...headers, "Content-Type": "application/json" },
  body: JSON.stringify({
    expected_version_id: task.current_version.id,
    config: { ...task.config, response_cache: { enabled: true } }
  })
});
if (!saved.ok) throw new Error(`Task update failed: ${saved.status}`);
```

The key needs `tasks.read` and `tasks.write`. This update creates a task version. Response reuse is a task-level setting and applies to live requests immediately; it does not change their released instructions. Set `enabled` to `false` to stop reuse.

Eligible requests use a prompt release without sources, adapters, or consensus, with an effective temperature from `0` to `0.1`. An answer may be reused for up to five minutes when the release, instructions, input, conversation, generation settings, and active credential match. Each request still checks availability, validates the answer, and records its own trace. Credential rotation separates subsequent reuse. A cache miss or cache outage proceeds to a model call.

Reuse is a task-level setting and does not require a new release to take effect. It does not replace your application’s idempotency for external actions.
