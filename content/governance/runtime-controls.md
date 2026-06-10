---
title: Runtime Controls
description: How Orlo enforces AI guardrails as part of a broader control plane
---

# Runtime Controls

Runtime controls are where AI governance becomes real.

Policies, standards, and review checklists are necessary, but they do not control a live AI request by themselves. Orlo brings controls onto the production path so every consequential request can be evaluated, routed, checked, grounded, approved, observed, and improved.

## Control Categories

| Control | Purpose |
| --- | --- |
| Task versioning | Bind runtime behavior to an approved, reproducible task definition |
| Model routing | Choose an evaluated model or strategy for the task |
| Fallback | Move to a safer option when the primary path fails or confidence is insufficient |
| Validation | Check structure, constraints, policy-sensitive fields, and deterministic rules |
| Retrieval grounding | Require answers to cite approved sources where the workflow depends on knowledge |
| Tool policy | Decide whether an agent step can call a tool or change state |
| Human approval | Pause sensitive actions until a reviewer approves, denies, or times out |
| Runtime limits | Bound retries, tool calls, budgets, latency, and other operational exposure |
| Containment | Stop, redact, abstain, or send work to review when a request exceeds policy |
| Monitoring | Track failures, review pressure, drift, quality, latency, and usage |
| Feedback | Convert reviewed corrections into future evaluation data |

## Possible Decisions

Runtime controls should produce explicit decisions, not vague warnings.

| Decision | Meaning |
| --- | --- |
| Allow | The request or step can proceed |
| Warn | The request can proceed with a visible caution or review marker |
| Retry | The system should attempt a constrained retry |
| Fallback | The system should switch to another model, strategy, or response path |
| Require approval | Human review is needed before the action continues |
| Abstain | The system should decline to answer or act |
| Reject | The request violates a policy or validation rule |
| Contain | The issue should be isolated, logged, and sent to review |

## Guardrails In Context

Guardrails are most useful when they are connected to the rest of the operating loop.

A blocked response should create evidence. A failed validation should inform future evaluations. A tool denial should be visible in an agent session. A human approval should be linked to the task, deployment, and trace. A repeated failure should become a monitoring signal and then an improvement item.

That is why Orlo treats guardrails as runtime controls inside a broader control plane, not as a standalone checklist.
