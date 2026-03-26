---
title: Platform API
description: Tenant-facing API reference for Orlo Platform
---

# Platform API

Orlo Platform APIs are served from `https://api.useorlo.com`.

This section documents the **tenant-facing** API surface used to integrate with Orlo Platform. It does **not** document private admin or internal-only routes.

## Auth model

Authentication is handled by an upstream auth gateway in front of `api.useorlo.com`.

These docs describe the **Orlo-specific** parts of the contract:

- trusted org-scoped request context via `X-Orlo-Org-Id`
- trusted task context via `X-Orlo-Task-Id` for OpenAI-compatible chat
- optional `Idempotency-Key` on mutating org-scoped requests

See [Authentication](/api/authentication) for the details.

## Public endpoint groups

- [Health](/api/health)
- [Tasks](/api/tasks)
- [Datasets](/api/datasets)
- [Evaluations](/api/evaluations)
- [Deployments](/api/deployments)
- [Inference](/api/inference)
- [Feedback](/api/feedback)
- [Documents and RAG](/api/documents-and-rag)
- [Credentials](/api/credentials)
- [Models](/api/models)
- [Adapters](/api/adapters)
- [Org Config](/api/org-config)
- [Routing Policies](/api/routing-policies)
- [Rubrics](/api/rubrics)
- [Monitoring](/api/monitoring)
- [Agent Governance](/api/agent-governance)

## Machine-readable spec

- [OpenAPI JSON](/api/openapi.json)

## Design notes

- Orlo sits behind an auth gateway and trusts upstream identity enforcement.
- Orlo enforces tenant isolation with `X-Orlo-Org-Id` plus database row-level controls.
- Orlo keeps the main inference and governance surfaces asynchronous where heavy background work is required, especially for evaluation and PDF ingestion.

