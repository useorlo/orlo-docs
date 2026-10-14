---
title: "Inference"
description: "OpenAI-compatible chat and task-native inference"
---

# Inference

Both inference endpoints run a task through Orlo and return a complete result after answer validation. Orlo calls the provider using your organization’s credential. For agents that keep their own model connection, use the [agent integration path](/start/how-orlo-works#agent-permissions-check-actions-in-your-runtime) instead.

See [How Orlo works](/start/how-orlo-works) for diagrams of both paths.

## `POST /v1/chat/completions`

Text, non-streaming chat completions. The caller supplies the messages; this route does not prepend saved task prompts or skill instructions. See [Chat completions](/engineers/chat-completions) for compatibility.

Required headers:

- `Authorization: Bearer <runtime key>`
- `X-Orlo-Task-Id`

Key request fields:

- `messages`
- optional `model`
- optional `temperature`
- optional `max_tokens`

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

Runs the saved task instructions and pinned skills, with input values filling the prompt’s placeholders. The `output` field is a string, including when that string contains JSON. See [Run a task](/engineers/run-a-task).

Key request fields:

- `input`
- optional `deployment_id`: a live release belonging to this task; inactive releases return `409 RELEASE_NOT_LIVE`
- optional `explain`: `default`, `debug`, or `audit`

A successful response contains `output`, `validation`, `model`, and `trace_id`. Both inference endpoints return complete responses without token streaming. Evidence is recorded asynchronously.

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
- Use the task-native path when you want Orlo to assemble saved instructions and return task metadata.
- Routing policy only applies when the request does not pin a deployment explicitly.
