---
title: Inference
description: OpenAI-compatible chat and task-native inference
---

# Inference

Orlo exposes two public inference paths:

- OpenAI-compatible chat completions
- task-native governed execution

## `POST /v1/chat/completions`

OpenAI-compatible path.

Required headers:

- `X-Orlo-Org-Id`
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

## `POST /v1/tasks/:task_id/run`

Task-native inference path.

Key request fields:

- `input`
- optional `deployment_id`
- optional `explain`: `default`, `debug`, or `audit`

### `debug` and `audit`

When `explain` is `debug` or `audit`, Orlo includes:

- latency
- token usage
- deployment metadata
- validation result
- retrieval attribution

## Example

```bash
curl https://api.useorlo.com/v1/tasks/<task-id>/run \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: <org-uuid>' \
  -d '{
    "input": { "question": "What are the reporting deadlines?" },
    "explain": "audit"
  }'
```

## Notes

- The chat path is useful when you want OpenAI-compatible client behavior.
- The task-native path is better when you want explicit Orlo explainability controls.

