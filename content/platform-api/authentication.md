---
title: "Authentication"
description: "Authenticate application requests, choose scopes, and handle retries and errors."
---

# Authentication

Send a runtime key as a bearer token on every request:

```bash
curl https://api.useorlo.com/v1/tasks \
  -H "Authorization: Bearer $ORLO_API_KEY"
```

An admin creates keys in the console under **Settings → Keys**, with a name, scopes, and an optional expiry. The key is shown once.

## Organization access

The key selects the organization and its scopes limit the API routes it can call. Do not send an organization header. Keep runtime keys out of public browser code and logs. People use console sign-in; personal AI-app connections use OAuth consent.

## Scopes

| Scope | Routes |
| --- | --- |
| `inference.run` | `POST /v1/tasks/:id/run`, `POST /v1/chat/completions` |
| `tasks.read`, `tasks.write` | `/v1/tasks/*` |
| `datasets.read`, `datasets.write` | `/v1/datasets/*`, feedback promotion, trace-sample promotion |
| `evaluations.read`, `evaluations.write` | `/v1/evaluations/*` |
| `deployments.read`, `deployments.write` | `/v1/deployments/*` |
| `documents.read`, `documents.write` | `/v1/tasks/:task_id/documents/*` |
| `feedback.read`, `feedback.write` | `/v1/feedback/*` |
| `skills.read` | `/v1/skills/*` reads and packages |
| `agent_governance.run`, `agent_governance.read` | `/v1/agent-sessions/*`, `/v1/tool-policies`, `/v1/runtime-limits`, `/v1/agent-approvals`, `/v1/trace-samples/*` |
| `credentials.read`, `credentials.write` | `/v1/credentials/*` |
| `models.read`, `models.write` | `/v1/models/*`, `/v1/adapters/*` |
| `routing.read`, `routing.write` | `/v1/routing-policies` |
| `rubrics.read`, `rubrics.write` | `/v1/rubrics/*` |
| `monitoring.read` | Read `/v1/quality-signals` |
| `inference_logs.read` | `/v1/inference-logs` |
| `audit.read` | `/v1/audit-events` |
| `org_config.read`, `org_config.write` | `/v1/orgs/config`, `/v1/orgs/judge`, `/v1/notification-endpoints` |

## Other headers

| Header | Where | Meaning |
| --- | --- | --- |
| `X-Orlo-Task-Id` | `POST /v1/chat/completions` | Which task the completion runs |
| `Idempotency-Key` | Any write | Reuse for an identical request; [retry boundaries](/engineers/authentication#idempotency) apply |

## Errors

| Status and code | Meaning |
| --- | --- |
| `401 MISSING_API_KEY` | No bearer token |
| `401 INVALID_API_KEY` | Unknown, revoked, or expired key |
| `403 INSUFFICIENT_SCOPE` | The key lacks the route’s scope |
| `403 PEOPLE_ONLY` | Approvals, rule changes, skill writes, and task deletion belong to signed-in people |
| `429` | Rate limited; `Retry-After` says how long |
| `502 UPSTREAM_UNAVAILABLE`, `504 UPSTREAM_TIMEOUT` | The service was unavailable or the request timed out |
