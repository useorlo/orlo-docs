---
title: Agent Governance
description: Sessions, steps, approvals, policies, runtime limits, trace samples, and trajectory results
---

# Agent Governance

Agent governance lets external runtimes route consequential steps through Orlo for policy, validation, approval, and audit decisions.

## Core concepts

- **Agent session** — one governed trajectory
- **Agent step** — one model, tool, retrieval, approval, or decision boundary
- **Governed step envelope** — the normalized record Orlo stores for step request, result, citations, timing, policy decision, and state change
- **Tool policy** — allow, warn, reject, or require approval
- **Runtime limit** — max steps, tool calls, write actions, and inactivity timeout
- **Approval** — human checkpoint for gated steps
- **Trace sample** — a reviewed trajectory artifact that can later be promoted into evaluation data
- **Trajectory result** — path-quality scoring computed from a session or trace sample

## Sessions

- `POST /v1/agent-sessions`
- `GET /v1/agent-sessions`
- `GET /v1/agent-sessions/:session_id`
- `PATCH /v1/agent-sessions/:session_id`

Create a session before beginning a governed trajectory. Sessions can later be marked `completed`, `failed`, `cancelled`, or `timed_out`.

Session detail returns:

- session metadata
- governed steps
- lifecycle events
- `trajectory_result`
- `trajectory_step_results`

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
- `approval_request`
- `approval_result`
- `state_transition`

Each governed step can carry:

- normalized request payload
- normalized result payload
- citations
- policy decision artifact
- timing metadata
- optional state change evidence

### `POST /v1/agent-sessions/:session_id/tools/check`

Fast path for tool authorization checks when a runtime wants a cheaper preflight than full step governance.

## Events and streaming

- `GET /v1/agent-sessions/:session_id/events`
- `GET /v1/agent-sessions/:session_id/events/stream`

Use the polling route for snapshots and the SSE route for live operational views.

The stream emits:

- one `connected` event when the stream opens
- one event per stored session event using its `event_type`
- heartbeat comments to keep long-lived connections healthy

## Trace import and review

- `POST /v1/agent-sessions/:session_id/traces/import`
- `POST /v1/agent-sessions/:session_id/steps`
- `POST /v1/agent-sessions/:session_id/steps/:step_id/promote-to-trace-sample`
- `GET /v1/trace-samples`
- `GET /v1/trace-samples/:id`
- `POST /v1/trace-samples/:id/annotations`
- `POST /v1/trace-samples/:id/promote-to-dataset`

These routes support imported traces, externally recorded steps, reviewed trace samples, and the trace-to-dataset loop.

Trace sample detail returns:

- the stored trace sample
- annotations
- `trajectory_result`
- `trajectory_step_results`

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

Approval records can expire according to the configured timeout and timeout action.

## Notes

- Orlo is the governance layer, not the orchestration runtime.
- The public API is designed to work well with thin wrappers, callbacks, and proxy-based integrations.
- Trajectory scoring is path-aware. It is not limited to final text quality.
