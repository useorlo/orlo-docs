---
title: "Agent SDK for TypeScript"
description: "Govern an agent from Node.js with @orlo/agent-sdk: start a run, check every tool call, handle approvals, and choose what happens when Orlo is unreachable."
order: 4
---

# Agent SDK for TypeScript

`@orlo/agent-sdk` wraps the agent-governance API for Node.js 20 or later. It has no runtime dependencies and does not own your orchestration: your framework runs the agent, the SDK asks Orlo before each tool call and reports each step. Source: [github.com/useorlo/agent-sdk](https://github.com/useorlo/agent-sdk), Apache-2.0. Package: [@orlo/agent-sdk on npm](https://www.npmjs.com/package/@orlo/agent-sdk).

```sh
npm install @orlo/agent-sdk@0.0.2
```

## Check the connection first

**Connect → Connect your agent → Run the connection check** in the console shows the environment values for your organization. Set `ORLO_API_URL`, `ORLO_ORG_ID`, `ORLO_TASK_ID`, `ORLO_CONSOLE_URL`, and `ORLO_API_KEY`. The key needs `agent_governance.run` and `agent_governance.read`.

```sh
npx --no-install orlo-agent-check --expect blocked
```

The check wraps a harmless local tool named `orlo_setup_check`, makes no model call, and changes no rules. With no rule for that tool, Orlo blocks it, which is what `--expect blocked` confirms. Add a rule in the console that allows it, run again with `--expect allowed`, and the command prints links to the run and its verification page. A nonzero exit means a rejected key, an unreachable gateway, or an unexpected decision.

## Start a run and govern steps

The example assumes your application defines `sendEmail` and a permission rule exists for that tool. It sends email only after an allow decision. Use the harmless connection check above before integrating a real side effect.

```ts
import { OrloAgentClient, OrloAgentRun, createGenericRuntimeAdapter, OrloGovernanceBlockedError } from '@orlo/agent-sdk';

const client = new OrloAgentClient({
  baseUrl: process.env.ORLO_API_URL!,
  orgId: process.env.ORLO_ORG_ID!,
  headers: { Authorization: `Bearer ${process.env.ORLO_API_KEY}` },
});

const run = await OrloAgentRun.start(client, {
  task_id: process.env.ORLO_TASK_ID!,
  framework: 'custom-js-runtime',
  goal: 'Resolve a support escalation',
});

const runtime = createGenericRuntimeAdapter({ run, autoRequestApproval: true });

try {
  const result = await runtime.runToolStep({
    stepId: 'tool_send_email',
    toolName: 'send_email',
    actionClass: 'network',
    arguments: { to: 'ops@example.com', subject: 'Escalation' },
    execute: async (args) => sendEmail(args),
  });
  console.log(result.output);
  await run.complete();
} catch (error) {
  if (error instanceof OrloGovernanceBlockedError && error.decision === 'require_approval') {
    // Persist the session ID, step ID, arguments, and approval ID in your runtime.
    // Leave this run open and resume the same step after the decision.
    console.log({ sessionId: run.sessionId, stepId: error.stepId, approvalId: error.approval?.id });
  } else {
    // Let your runtime record a failure or cancellation; do not report success.
    throw error;
  }
}
```

`runToolStep` asks Orlo before `execute` runs and reports the result afterwards. A `reject` throws before the tool runs. `runModelStep` does the same around a model call. Declare the real action class of each tool; the SDK cannot infer it, and a rule for the tool can only make it stricter.

## Register tools once

Give your agent’s dispatcher a registry instead of raw functions, so an unknown tool name is refused before Orlo is even asked:

```ts
import { createToolRegistry } from '@orlo/agent-sdk';

const tools = createToolRegistry({ run, tools: {
  lookup_order: { actionClass: 'read', execute: async (args: { orderId: string }) => lookupOrder(args.orderId) },
} });
const result = await tools.invoke('lookup_order', { orderId: '123' }, { stepId: 'lookup-123' });
```

The registry covers the tools you register. It cannot see tools your host exposes some other way.

## Approvals

When a rule requires approval, the SDK opens one and throws `OrloGovernanceBlockedError` with `decision: 'require_approval'`. The approval is bound to the tool name and the exact arguments. Keep the step id and the arguments with your run state. When your runtime learns the decision, for example from an `approval:decided` event on the session’s event stream, run the same step again:

```ts
await runtime.runToolStep({ stepId: 'tool_issue_refund', toolName: 'issue_refund', actionClass: 'write', arguments: args, execute: issueRefund });
```

Keep the original run open while waiting; `run.complete()` ends it. The retry must use the original session and step ID, not a newly started run. Persist that state if your process can restart.

On that retry Orlo allows the call and consumes the approval, rejects it if the reviewer rejected, applies the rule’s timeout action if it expired, or asks for a new approval if the arguments changed. TypeScript 0.0.2 does not wait or poll. Your application can use [approval webhooks and exact status reads](/engineers/webhooks-and-approvals) to resume safely. Bounded waiting and run-resume helpers are prepared for the next SDK release.

## When Orlo is unreachable

Each attempt has a timeout (3 s) and one retry; writes reuse an idempotency key across transport retries. See [retry boundaries](/engineers/authentication#idempotency). After five consecutive failures the client stops calling for 30 s and throws `OrloUnavailableError` at once. What happens to the tool call is the run’s fail mode per action class:

```ts
const run = await OrloAgentRun.start(client, { task_id }, {
  failMode: { read: 'open', default: 'closed' },
});
```

`closed`, the default for everything, stops the call. `open` runs it and reports afterwards, with delivery not guaranteed. A read can disclose data, so open reads are a deliberate choice.

## Steps that do not wait

When a session starts, Orlo returns `blocking_step_types`: tool requests and retrieval always wait for a decision; model outputs and tool results wait only when the task has rules to check them against. Other steps are reported in the background with `run.report()`. `run.flush()` waits for them; `run.unsentSteps` counts those that could not be sent. Background reports are retried in memory, so keep your own record of anything that must survive a crash.

## Shared skills

`OrloAgentRun.startWithSkills` loads exact published versions, verifies their content hashes, and records them on the run. See [Skills in your AI tools](/engineers/skills-in-tools#your-own-agents).
