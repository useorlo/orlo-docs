---
title: "Agent permissions and limits"
description: "Decide which tools an agent may call, how far a run may go, and which steps wait for a person."
order: 1
---

# Agent permissions and limits

*Who can do this: Agent permissions managers and admins change rules and limits; Agent observers and operators read runs and decisions.*

An agent picks its next step as it goes. Orlo does not approve the plan; it decides each step when the agent proposes it. Rules say what the decision is. Your agent’s runtime, through the SDK, enforces it.

![Permissions for an agent: each tool with its action class, decision, and calls in the last seven days, with built-in tools listed below](./assets/images/console/agent-rules.png)

## Tool rules

A rule names a tool and a decision. Unknown tools are blocked: a tool with no rule gets `reject`.

| Decision | What happens |
| --- | --- |
| Allow | The call runs |
| Allow with warning | The call runs, and the step is marked for review |
| Require approval | The call waits for a person; see below |
| Reject | The call does not run; the agent is told why |

A rule can be narrowed by task, by release, by environment (such as `production`), by action class (`read`, `write`, `delete`, `network`, or `control`), and by risk tier. A rule that names `*` applies to every tool. When several rules match, the strictest decision wins. The agent declares the action class of each call, and the class that applies is the stricter of what the agent declared and what your rules say for that tool, so an agent cannot declare its way past a rule. Rules match on the tool and its action class, so to gate refunds, make the refund tool require approval.

Some built-in bookkeeping tools are allowed unless a rule names them. The `orlo_setup_check` tool is intentionally subject to the normal permission rules.

## Limits

A limit caps how far one run may go: steps, tool calls, writes, external side effects, and how long the run may sit idle. Limits are set per organization, task, or release, and the narrowest wins. A run that reaches a limit is contained: Orlo answers `contain` with the action it recommends, from more monitoring through read-only mode to handing over to a person.

## Approvals

A step that requires approval opens an approval bound to the exact call: the tool name and its arguments. The agent stops. The approval goes to the Inbox and, if you set them, to a webhook and email. A person approves or rejects, with a comment, and the decision records who made it.

An approval is consumed once. The agent retries the same call and it runs; a second retry needs a new approval. A call with changed arguments needs a new approval. Each rule that requires approval also sets a timeout and what happens when nobody decides in time: reject, escalate, or contain.

## When an agent cannot reach Orlo

The SDK decides per action class: `closed` stops the call, `open` runs it and reports afterwards. The default is closed for everything. **Connect** explains the choices. The setting lives in the agent’s code; the console does not read or change it.

## What a decision records

Every governed step records the decision, the rules that matched, the latency of the decision, and, where a person was involved, the approval and who decided. The run’s timeline in **Agent runs** shows the steps in order, with the model calls and tool calls the agent reported.
