---
title: Agent Governance
description: Sessions, steps, approvals, policies, and runtime limits
---

# Agent Governance

Agent governance lets external runtimes route consequential steps through Orlo for policy, validation, approval, and audit decisions.

## Core concepts

- **Agent session** — one governed trajectory
- **Agent step** — one model/tool/retrieval/decision boundary
- **Tool policy** — allow, warn, reject, or require approval
- **Runtime limit** — max steps, tool calls, write actions, inactivity timeout
- **Approval** — human checkpoint for gated steps

## Sessions

- `POST /v1/agent-sessions`
- `GET /v1/agent-sessions`
- `GET /v1/agent-sessions/:session_id`
- `PATCH /v1/agent-sessions/:session_id`

Create a session before beginning a governed trajectory. Sessions can later be marked `completed`, `failed`, or `cancelled`.

## Govern steps

### `POST /v1/agent-sessions/:session_id/steps/govern`

Primary governance endpoint for step evaluation.

Typical step types:

- `model_call`
- `model_output`
- `tool_request`
- `tool_result`
- `retrieval`
- `decision`

### `POST /v1/agent-sessions/:session_id/tools/check`

Fast path for tool authorization checks.

## Trace import and events

- `POST /v1/agent-sessions/:session_id/traces/import`
- `POST /v1/agent-sessions/:session_id/steps`
- `GET /v1/agent-sessions/:session_id/events`

These routes support imported traces, externally recorded steps, and formatted session event views.

## Policies and limits

- `GET /v1/tool-policies`
- `POST /v1/tool-policies`
- `PUT /v1/tool-policies/:id`
- `GET /v1/runtime-limits`
- `POST /v1/runtime-limits`
- `PUT /v1/runtime-limits/:id`

## Approvals

- `GET /v1/agent-approvals`
- `POST /v1/agent-sessions/:session_id/steps/:step_id/request-approval`
- `POST /v1/agent-approvals/:id/approve`
- `POST /v1/agent-approvals/:id/reject`

## Notes

- Orlo is the governance layer, not the orchestration runtime.
- The public API is designed to work well with thin wrappers and callbacks so application developers do not need to wire raw governance calls manually.

