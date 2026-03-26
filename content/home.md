---
title: Orlo Documentation
description: Public documentation for Orlo Open Core and Orlo Platform
---

# Orlo Documentation

Orlo helps teams **prove AI works, deploy it safely, and keep it governed in production**.

This documentation site covers two connected surfaces:

- **Orlo Open Core** — public packages for validation, runtime adapters, Web Components, and agent-governance SDKs
- **Orlo Platform** — the managed multi-tenant platform and the APIs used to integrate with it

## Start Here

- [What Is Orlo?](/guides/what-is-orlo)
- [Open Core vs Platform](/guides/open-core-vs-platform)
- [Who Orlo Is For](/guides/who-orlo-is-for)
- [Getting Started](/guides/getting-started)

## Open Core

Orlo Open Core is for developers and platform builders who want reusable building blocks:

- deterministic validation
- runtime adapters
- agent-governance SDKs
- framework-agnostic Studio Web Components

If you want to understand or adopt the open packages first, start with:

- [Open Core Guides](/guides/open-core)
- [Packages](/packages)

## Orlo Platform

Orlo Platform is the full managed product experience:

- task definition and versioning
- dataset upload and evaluation
- deployment and inference
- retrieval and document ingestion
- governed feedback promotion
- multi-tenant platform behavior
- agent-step governance APIs

If you are integrating against the product, start with:

- [Platform Overview](/guides/platform/platform-overview)
- [Platform API](/platform-api)

:::info
Orlo Platform APIs are available at `api.useorlo.com`.
:::

## Choose the Right Path

### Use Open Core when

- you want to evaluate Orlo's technical primitives
- you want reusable validation, adapter, or UI components
- you are integrating Orlo-style governance into an existing engineering stack

### Use Orlo Platform when

- you want the full evaluation-to-deployment loop
- you need tenant isolation, auditability, approvals, and governance in one system
- you want a domain team to use AI safely without becoming an AI platform team

## Core Concepts

- **Task** — the unit of domain work
- **Task Version** — immutable snapshot of schemas, prompts, and validation
- **Dataset** — labeled examples for evaluation
- **Evaluation** — budget-bounded, uncertainty-aware model comparison
- **Deployment** — a frozen model + task-version + strategy binding
- **Inference** — governed execution through the Orlo runtime path
- **Feedback** — corrections and promotion into improved datasets
- **Agent Session** — a governed trajectory of agent steps
