---
title: Orlo Documentation
description: Public documentation for Orlo Open Core and Orlo Platform
---

# Orlo Documentation

Orlo is the **governed domain AI control plane for production decision paths**.

A model can look fine in staging and still fail in production. A retrieval call can pull stale policy. An agent can reach for a write tool without approval. A deployment can keep serving after validation quality slips. Orlo sits on that path and makes those decisions reviewable, governable, and improvable.

This documentation site covers two connected surfaces:

- **Orlo Open Core** — public packages for validation, runtime adapters, Web Components, and agent-governance SDKs
- **Orlo Platform** — the managed multi-tenant platform and the APIs used to integrate with it

## The Operational Surface

Orlo is built for a concrete operational surface:

- **before production** — define tasks, upload datasets, compare models, and freeze deployments
- **on the decision path** — route inference, validate outputs, retrieve grounded context, and gate consequential actions
- **after production traffic** — review traces, stage feedback, promote corrections, and improve the next deployment

## Start Here

- [Getting Started](/guides/getting-started)
- [Platform Quickstarts](/guides/platform/quickstarts)
- [What Is Orlo?](/guides/what-is-orlo)
- [Open Core vs Platform](/guides/open-core-vs-platform)

## Quickstarts

If you want to see Orlo working quickly, start with one of these:

- [Fraud Triage Quickstart](/guides/platform/quickstarts/fraud-triage)
- [Support Classification Quickstart](/guides/platform/quickstarts/support-classification)
- [Document Summarization Quickstart](/guides/platform/quickstarts/document-summarization)
- [Validation Quickstart](/guides/open-core/validation-quickstart)

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

- [Platform Quickstarts](/guides/platform/quickstarts)
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
