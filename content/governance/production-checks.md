---
title: "Production checks and permissions"
description: "Choose how task answers and agent tool calls are checked before your application uses them."
order: 2
---

# Production checks and permissions

A workflow can use answer checks, agent permissions, or both. Choose the behavior for the work, then test allowed and failed cases before relying on it.

| Mechanism | What you configure | What happens |
| --- | --- | --- |
| Answer rules | Schema, required or forbidden fields, patterns, and length | Failed checks reject, retry, or return a warning according to the task’s setting |
| Task releases | Task version, model, and execution strategy | Requests use the selected configuration and record the release |
| Sources | Task documents and retrieval settings | Relevant passages are supplied and recorded; the collection remains live |
| Tool permissions | Tool name, action class, scope, and decision | The runtime allows, blocks, or holds a submitted call using Orlo’s decision |
| Approval | Which actions need a person and the timeout behavior | A person decides an exact held call; the runtime must resume it |
| Run limits | Limits for steps, tool calls, writes, side effects, and inactivity | Orlo returns a containment decision that the runtime must honor |
| Shared skills | Published versions pinned to tasks or retrieved by apps | Consumers receive identifiable instructions; versions do not silently replace existing pins |

## Test the boundary you need

For a task, try inputs that pass and fail a rule. Verify that the application handles rejection, warnings, and escalation. Structural checks do not establish factual correctness; use representative comparisons and review for that judgment.

For an agent, test allowed, rejected, and approval-required tools through the actual dispatcher. Calls outside the wrapper are not governed. Review outage behavior in the SDK and use downstream idempotency for consequential side effects.

For skills, verify the exact version retrieved. Publication distributes instructions; it does not grant tools permission to act.

## Improve the standard

Review recurring failures and add accepted corrections or saved steps to a new dataset version. Compare the revised task before releasing it. [Improve from production](/console/tasks/improve-from-production) walks through the sequence.
