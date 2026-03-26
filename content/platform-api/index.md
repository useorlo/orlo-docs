---
title: Platform API
description: Tenant-facing API reference for Orlo Platform
---

# Platform API

Orlo Platform APIs are served from `https://api.useorlo.com`.

This section covers the application-facing API surface used to integrate with Orlo Platform.

## Auth model

Authentication requirements vary by deployment. These docs describe the **Orlo-specific** parts of the contract:

- trusted org-scoped request context via `X-Orlo-Org-Id`
- trusted task context via `X-Orlo-Task-Id` for OpenAI-compatible chat
- optional `Idempotency-Key` on mutating org-scoped requests

See [Authentication](/platform-api/authentication) for the details.

## Public endpoint groups

- [Health](/platform-api/health)
- [Tasks](/platform-api/tasks)
- [Datasets](/platform-api/datasets)
- [Evaluations](/platform-api/evaluations)
- [Deployments](/platform-api/deployments)
- [Inference](/platform-api/inference)
- [Feedback](/platform-api/feedback)
- [Documents and RAG](/platform-api/documents-and-rag)
- [Credentials](/platform-api/credentials)
- [Models](/platform-api/models)
- [Adapters](/platform-api/adapters)
- [Org Config](/platform-api/org-config)
- [Routing Policies](/platform-api/routing-policies)
- [Rubrics](/platform-api/rubrics)
- [Monitoring](/platform-api/monitoring)
- [Agent Governance](/platform-api/agent-governance)

## Machine-readable spec

- [OpenAPI JSON](/platform-api/openapi.json)

## Platform behavior

- Orlo enforces tenant isolation with `X-Orlo-Org-Id` plus database row-level controls.
- Orlo keeps the main inference and governance surfaces asynchronous where heavy background work is required, especially for evaluation and PDF ingestion.
