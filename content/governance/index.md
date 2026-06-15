---
title: Governance
description: How Orlo turns internal AI policy into operational controls and evidence
---

# Governance

Orlo helps organizations govern internal AI use by turning policy into a production operating loop.

It also helps organizations turn expert judgment into governed AI systems that improve with every decision.

It does not try to be a generic compliance management system. It does not replace legal judgement, risk classification, policy registers, remediation workflows, or audit sign-off. Orlo owns a different layer: the operational proof that an AI system was evaluated, deployed, controlled, observed, and improved.

## The Governance Job

Most AI governance programs start with policy:

- which use cases are allowed
- which data can be used
- which models are approved
- when human review is required
- which actions need approval
- what evidence must be retained
- how issues are escalated

The hard part is making those policies real at runtime.

Orlo connects policy to controls on the AI decision path: task definitions, evaluation results, deployment snapshots, validation behavior, retrieval attribution, routing decisions, approvals, traces, feedback, and monitoring.

## Guardrails Are A Control Layer

Guardrails matter, but they are not the whole product category.

In Orlo, guardrails are one control layer inside the broader control plane. A guardrail may block unsafe output, require approval, force grounding, reject a tool call, route to a safer model, or send an issue into review. The larger Orlo loop records why that happened, what version was live, who owned the task, and how the organization improved the system afterward.

## Governance Starts Here

| Audience | Primary Question | Start Here |
| --- | --- | --- |
| Risk and compliance | Can policy be mapped to live AI controls and evidence? | [Internal AI Operating Model](/governance/internal-ai-operating-model) |
| Legal | What evidence supports use-case review and regulatory readiness? | [Operational Evidence](/governance/operational-evidence) |
| Security | Can model, data, credential, and tool access be constrained? | [Runtime Controls](/governance/runtime-controls) |
| Platform and IT | How do controls fit into production workflows? | [Platform Overview](/guides/platform/platform-overview) |
| Internal audit | Can the organization reconstruct what happened later? | [Operational Evidence](/governance/operational-evidence) |
| EU AI Act program owners | How do AI Act themes map to runtime controls and evidence? | [EU AI Act Operational Readiness](/governance/eu-ai-act-operational-readiness) |

For a hands-on walkthrough, start with [Internal AI Governance Quickstart](/guides/platform/quickstarts/internal-ai-governance).

## What Orlo Provides

| Governance Need | Orlo Capability |
| --- | --- |
| Inventory of AI work | Tasks, owners, versions, datasets, deployments, and active runtime paths |
| Use-case proof | Evaluations on task data, with recommendations and uncertainty-aware results |
| Change control | Immutable task versions and deployment snapshots |
| Runtime controls | Validation, routing, fallback, retrieval grounding, limits, approvals, and containment |
| Agent controls | Session timelines, step envelopes, tool policies, approval gates, and trajectory evidence |
| Evidence | Logs, traces, evaluations, retrieval attribution, approvals, feedback, and monitoring signals |
| Improvement | Reviewed trace and feedback promotion into future evaluation datasets |

## Boundary

Orlo gives governance teams operational evidence. It does not decide legal classification, replace a GRC system, or certify compliance by itself.

That boundary is important. A policy register can say what must happen. Orlo helps prove what did happen.

For a practical EU AI Act control map, read [EU AI Act Operational Readiness](/governance/eu-ai-act-operational-readiness).
