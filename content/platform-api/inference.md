---
title: "Inference"
description: "OpenAI-compatible chat and task-native inference"
---

# Inference

Both inference endpoints run a task through Orlo and return a complete result after answer validation. Orlo calls the provider using your organization’s credential. For agents that keep their own model connection, use the [agent integration path](/start/how-orlo-works#agent-permissions-check-actions-in-your-runtime) instead.

See [How Orlo works](/start/how-orlo-works) for diagrams of both paths.

## `POST /v1/chat/completions`

Text, non-streaming chat completions. The released task prompt and pinned skills apply. Caller messages supply conversation data; caller system, developer, and tool messages are treated as user data. See [Chat completions](/engineers/chat-completions) for compatibility.

Required headers:

- `Authorization: Bearer <runtime key>`
- `X-Orlo-Task-Id`

Key request fields:

- `messages`
- optional `model`
- optional `temperature`: 0–2; otherwise the release value, or `0` when unset
- optional `max_tokens` or `max_completion_tokens`: 1–16,384; `max_completion_tokens` takes precedence
- optional `stream`: must be `false`; `true` returns `400 INVALID_INPUT` before a model call

Orlo responds with an OpenAI-style `chat.completion` object and sets these headers:

- `x-orlo-model`
- `x-orlo-trace-id`
- `x-orlo-validation`
- `x-orlo-task-version`
- `x-orlo-routing-mode`

`x-orlo-routing-mode` tells you how the final deployment was selected:

- `live` — Orlo used the task’s live release without a routing-policy selection
- `policy` — Orlo selected a deployment using task routing policy and evaluated candidates
- `active_fallback` — Orlo served the task's active deployment because no routing policy decision was usable

## `POST /v1/tasks/:task_id/run`

Runs the saved task instructions and pinned skills, with input values supplied separately as data for the fields named in the instructions. The `output` field is a string, including when that string contains JSON. See [Run a task](/engineers/run-a-task).

Key request fields:

- `input`
- optional `deployment_id`: a live release belonging to this task; inactive releases return `409 RELEASE_NOT_LIVE`
- optional `explain`: `default`, `debug`, or `audit`

A successful response contains `output`, `validation`, `model`, and `trace_id`. Both inference endpoints return complete responses without token streaming. The answer and its rule results are recorded before a successful response is returned. Outbound notifications and telemetry are delivered separately.

### `debug` and `audit`

When `explain` is `debug` or `audit`, Orlo includes:

- latency
- token usage
- deployment metadata
- validation result
- retrieval attribution
- routing metadata

Routing metadata includes:

- route mode
- selected deployment ID
- fallback deployment ID when present
- ranked model candidates when available
- abstain and escalation flags when the policy layer determined the request should not auto-route cleanly

## Example

```bash
curl https://api.useorlo.com/v1/tasks/<task-id>/run \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ORLO_API_KEY" \
  -d '{
    "input": { "question": "What are the reporting deadlines?" },
    "explain": "audit"
  }'
```

## Notes

- The chat path is useful when you want OpenAI-compatible client behavior.
- Use the task-native path for structured input and a JSON validation block. Both paths apply released instructions.
- Routing policy only applies when the request does not pin a deployment explicitly.

## Errors and recovery

Check the HTTP status before using an answer. Errors contain `error` and `message`, and may include `trace_id` and `details`.

| Status and code | What to do |
| --- | --- |
| `400 INVALID_INPUT` | Correct the named field. For streaming requests, set `stream` to `false` or omit it. |
| `409 CONSENSUS_CONFIGURATION_INVALID` | Compare the intended candidates on the same task version and source settings, then correct the consensus configuration. Retired or unavailable candidates must be replaced. |
| `422 VALIDATION_FAILED` | Inspect `details.status`, `details.entries`, and the other validation fields in `details`. An `indeterminate` check refuses the answer with `abstain: true`; fix that check before retrying. |
| `429 INFERENCE_BUSY` | Too many requests are already running. Reduce concurrency and retry after the `Retry-After` interval. |
| `503 PROVIDER_BUSY` | The selected provider connection has no capacity. Honor `Retry-After`, then retry with backoff. |
| `503 PROVIDER_PAUSED` | Repeated temporary failures have paused the selected connection. Honor `Retry-After` and check provider availability. A configured fallback may answer first. |
| `503 RUNTIME_UNAVAILABLE` | No model answered. Check the provider key, model access, quota, and the error message. |
| `503 EVIDENCE_UNAVAILABLE` | Orlo could not record the result, so it returned no answer. Retrying may make another billable model call. |
| `504 INFERENCE_TIMEOUT` | The request was cancelled or exceeded its time limit. Reduce input or generation size, or use a suitable faster model. |

If a provider call fails and its failure record also cannot be saved, the original error remains and `details.evidence_recorded` is `false`. Keep the returned trace ID for troubleshooting. Retry temporary failures with bounded exponential backoff and jitter; do not retry configuration or validation errors without a change.
