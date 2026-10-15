---
title: "What happens to an agent when Orlo is unreachable?"
description: "Choose agent outage behavior and understand the limits of best-effort background reporting."
sidebar_title: "Agent outage behavior"
order: 12
---

# What happens to an agent when Orlo is unreachable?

The SDK blocks tool calls by default when it cannot obtain an Orlo decision. An application can explicitly opt an action class into running without that decision, but its later report is best effort and cannot be relied on to survive a crash. Choose outage behavior in the agent’s code.

## Configure the TypeScript SDK

Each attempt has a timeout (3 s) and one retry; writes reuse an idempotency key across transport retries. See [retry boundaries](/engineers/authentication#idempotency). After five consecutive failures the client stops calling for 30 s and throws `OrloUnavailableError` at once. What happens to the tool call is the run’s fail mode per action class:

```ts
const run = await OrloAgentRun.start(client, { task_id }, {
  failMode: { read: 'open', default: 'closed' },
});
```

`closed`, the default for everything, stops the call. `open` runs it and reports afterwards, with delivery not guaranteed. A read can disclose data, so open reads are a deliberate choice.

## Preserve work that must survive a restart

When a session starts, Orlo returns `blocking_step_types`: tool requests and retrieval always wait for a decision; model outputs and tool results wait only when the task has rules to check them against. Other steps are reported in the background with `run.report()`. `run.flush()` waits for them; `run.unsentSteps` counts those that could not be sent. Background reports are retried in memory, so keep your own record of anything that must survive a crash.

The console does not read or change this application-side fail mode. Test an unreachable service before production and check that every relevant tool uses the wrapper. [Python integration](/engineers/python-and-langgraph#when-orlo-is-unreachable).
