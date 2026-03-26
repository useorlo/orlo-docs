---
title: Open Core vs Platform
description: Understand what is public in Orlo Open Core and what belongs to Orlo Platform
order: 2
---

# Open Core vs Platform

This page is the most important boundary in the public docs.

## Open Core

Open Core gives you reusable technical primitives:

| Surface | Included |
|---|---|
| Shared contracts | Types, interfaces, chunking helpers |
| Validation | Deterministic validation and sandboxed custom rules |
| Runtime adapters | OpenAI-compatible, Anthropic, vLLM, llama.cpp adapters |
| Agent SDK | Thin client and wrappers for agent-step governance |
| Studio | Web Components for Orlo-native UI surfaces |

Open Core is mainly for developers and technical evaluators.

## Platform

Platform gives you the full governed product:

| Surface | Included |
|---|---|
| Control plane | Multi-tenant API, org-scoped isolation, persistence |
| Evaluation loop | Task, dataset, evaluation, recommendation, deployment |
| Retrieval | Hybrid retrieval orchestration and attribution |
| Feedback loop | Staging, review, promotion into datasets |
| Governance | Approvals, session persistence, policy storage, runtime limits |

## What is public today

The public-docs project documents **both**:

- the public packages and how to use them
- the Platform APIs that customers integrate against

That does **not** mean the full Platform source is open.

## Rule of Thumb

If you want building blocks, start with Open Core.

If you want the full loop from proving a task to operating it safely in production, you need Orlo Platform.

:::warning
Do not assume that “documented publicly” means “open-source implementation.” The Platform API is publicly documented for integrators, while the control plane remains private.
:::
