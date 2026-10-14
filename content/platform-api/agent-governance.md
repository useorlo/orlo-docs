---
title: "Agent Governance"
description: "Sessions, steps, approvals, policies, runtime limits, trace samples, and trajectory results"
---

# Agent Governance

Agent governance lets external runtimes route consequential steps through Orlo for policy, validation, approval, and audit decisions.

## Core concepts

- **Agent session** — one governed trajectory
- **Agent step** — one model, tool, retrieval, approval, or decision boundary
- **Governed step envelope** — the normalized record Orlo stores for step request, result, citations, timing, policy decision, and state change
- **Tool policy** — allow, allow with warning, reject, or require approval; a tool with no matching policy is rejected, and when several match the strictest wins
- **Runtime limit** — max steps, tool calls, write actions, external side effects, and inactivity timeout; the narrowest matching limit applies
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

- `GET /v1/tool-policies` (`task_id`, `deployment_id` filters; also lists the built-in bookkeeping tools)
- `GET /v1/runtime-limits` (returns the rows and the effective base limits)

Configure [agent permissions and limits](/console/agent-runs/agent-rules) in the console. These changes require a signed-in person with the appropriate access; a runtime key gets `403 PEOPLE_ONLY`.

## Sessions and skills

`POST /v1/agent-sessions` takes `task_id` and optionally `external_run_id`, `goal`, `framework`, `risk_tier`, `autonomy_level`, `metadata`, and `skill_versions`: up to eight `{skill_id, version_id, content_hash}` references, which Orlo verifies against published, non-retired versions before the session starts (`409 SKILL_VERSION_UNAVAILABLE` otherwise). The response includes `blocking_step_types`, the step types whose decision the runtime must wait for.

`GET /v1/agent-steps` lists steps across runs since a time (`since`, `limit` up to 5,000, `task_id`), for overviews.

`POST /v1/agent-sessions/:session_id/steps/:step_id/add-to-standard` adds a step to the task’s examples.

## Approvals

- `GET /v1/agent-approvals`
- `GET /v1/agent-approvals/:id`
- `POST /v1/agent-sessions/:session_id/steps/:step_id/request-approval`

An approval is bound to the step’s tool name and arguments and is consumed once. A person with Approver access decides in the console. Orlo records their identity. An approval expires per its timeout and timeout action, and Orlo sends `approval.requested`, `approval.expiring`, `approval.escalated`, `approval.expired`, `approval.approved`, and `approval.rejected` to the organization’s [notification endpoints](/platform-api/notification-endpoints).

## Notes

- Orlo decides; the runtime that runs the tools enforces, through the SDK.
- The public API is designed to work well with thin wrappers, callbacks, and proxy-based integrations.
- Trajectory scoring is path-aware. It is not limited to final text quality.

## Approval updates

Read one approval with `GET /v1/agent-approvals/:id` and `agent_governance.read`. It returns the approval directly, including `status`, `session_id`, `step_id`, deadline fields, `decided_at`, `decided_by`, and `consumed_at`. An unknown ID or an ID in another organization returns `404 APPROVAL_NOT_FOUND`. The response is not cached; elapsed approval deadlines are applied before reporting status.

Subscribe to `approval.approved`, `approval.rejected`, and `approval.expired` to wake a waiting worker. Notifications do not execute tools. Read current status and retry the original governed step with unchanged arguments. See [Webhooks and approvals](/engineers/webhooks-and-approvals).
