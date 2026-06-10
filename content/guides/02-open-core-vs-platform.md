---
title: Open Core vs Platform
description: Understand Orlo's public packages and managed control plane
order: 2
---

# Open Core vs Platform

Orlo has two connected surfaces: public packages for teams that want reusable primitives, and the managed Platform for teams that need the full production loop.

The distinction matters because Orlo is not only a library and not only an API. The product value comes from connecting evaluation, deployment, runtime control, monitoring, feedback, and evidence.

## Open Core

Open Core gives developers reusable technical primitives:

| Surface | Included |
| --- | --- |
| Shared contracts | Types, interfaces, chunking helpers |
| Validation | Deterministic validation and sandboxed custom rules |
| Runtime adapters | OpenAI-compatible, Anthropic, vLLM, llama.cpp adapters |
| Agent SDK | Thin client and wrappers for agent-step governance |
| Studio | Web Components for Orlo-native UI surfaces |

Use Open Core when you want Orlo's building blocks inside your own stack.

## Platform

Platform gives organizations the full managed control plane:

| Surface | Included |
| --- | --- |
| Product surface | Dashboard, API, gateway, workers, and persistent data layer |
| Evaluation loop | Task, dataset, evaluation, recommendation, deployment |
| Runtime path | Governed inference, routing, fallback, validation, retrieval attribution |
| Feedback loop | Staging, review, correction, and promotion into future datasets |
| Governance | Approvals, session persistence, policy storage, runtime limits, evidence |
| Organization model | Users, org context, API keys, credentials, rate limits, and audit behavior |

Use Platform when the organization needs one operating system for multiple teams, models, providers, and production AI tasks.

## What is public today

This documentation set includes **both**:

- the public packages and how to use them
- the Platform APIs that customers integrate against

The public packages and the Platform APIs serve different needs.

## Rule of Thumb

If you want building blocks, start with Open Core.

If you want the full loop from proving a task to operating it safely in production, use Orlo Platform.

If risk, compliance, legal, security, or internal audit need reviewable evidence, read [Governance](/governance) next.

:::warning
The Platform API is documented for integrators. Open Core packages are published separately for developers who want the reusable building blocks.
:::
