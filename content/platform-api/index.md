---
title: "Platform API"
description: "The REST API applications and agents call through the gateway at api.useorlo.com, with a runtime key."
---

# Platform API

Applications call `https://api.useorlo.com` with a runtime key as a bearer token. The key selects the organization and the operations the application can use. See [Authentication](/platform-api/authentication).

It covers the production path around an AI task: tasks and versions, examples, comparisons, releases, answers, sources, feedback, shared skills, agent governance, signals, notifications, and audit events. People-only actions are described in the console guides; they are not authorized by runtime keys.

## Endpoint groups

| Group | Scope | Page |
| --- | --- | --- |
| Tasks and versions | `tasks.*` | [Tasks](/platform-api/tasks) |
| Datasets (examples) | `datasets.*` | [Datasets](/platform-api/datasets) |
| Evaluations (comparisons) | `evaluations.*` | [Evaluations](/platform-api/evaluations) |
| Deployments (releases) | `deployments.*` | [Deployments](/platform-api/deployments) |
| Inference (run a task, chat completions) | `inference.run` | [Inference](/platform-api/inference) |
| Feedback | `feedback.*` | [Feedback](/platform-api/feedback) |
| Documents (sources) | `documents.*` | [Documents and sources](/platform-api/documents-and-rag) |
| Skills | `skills.read`; writes are people-only | [Skills](/platform-api/skills) |
| Agent governance | `agent_governance.*` | [Agent governance](/platform-api/agent-governance) |
| Quality signals | `monitoring.read` | [Quality signals](/platform-api/quality-signals) |
| Notification endpoints | `org_config.*` | [Notification endpoints](/platform-api/notification-endpoints) |
| Audit events | `audit.read` | [Audit events](/platform-api/audit-events) |
| Credentials (provider keys) | `credentials.*` | [Credentials](/platform-api/credentials) |
| Models and judge | `models.*`, `org_config.*` | [Models](/platform-api/models) |
| Adapters | `models.*` | [Adapters](/platform-api/adapters) |
| Org config | `org_config.*` | [Org config](/platform-api/org-config) |
| Routing policies | `routing.*` | [Routing policies](/platform-api/routing-policies) |
| Rubrics | `rubrics.*` | [Rubrics](/platform-api/rubrics) |

## Machine-readable spec

[OpenAPI reference](/platform-api/openapi). It describes the supported runtime routes, request fields, response schemas, and required scopes. Console administration and deployment administration are separate from this runtime API.

## Conventions

- Errors are JSON with `error` (a code) and `message` (what to do).
- Use `Idempotency-Key` for retries of identical writes; see [retry boundaries](/engineers/authentication#idempotency).
- Long work runs in the background: a comparison and a PDF upload return at once and are polled or watched from the console.
- A runtime key never decides approvals, changes rules, writes skills, or deletes a task. Those return `403 PEOPLE_ONLY`.
