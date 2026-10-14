---
title: "Chat completions"
description: "Use the OpenAI chat request shape with caller-supplied messages and task-specific validation."
order: 3
---

# Chat completions

`POST /v1/chat/completions` accepts text chat messages and returns an OpenAI-style chat completion. Use a runtime key with `inference.run` and identify the task with `X-Orlo-Task-Id`.

```bash
curl -X POST https://api.useorlo.com/v1/chat/completions \
  -H "Authorization: Bearer $ORLO_API_KEY" \
  -H "X-Orlo-Task-Id: $TASK_ID" \
  -H "Content-Type: application/json" \
  -d '{"messages": [
    {"role": "system", "content": "Route support messages. Return JSON with category, priority, and escalate."},
    {"role": "user", "content": "My card was charged twice."}
  ]}'
```

This uses the same complete-answer workflow as the task endpoint: release selection, source retrieval when needed, the model request, and answer rules. [See the request diagram](/start/how-orlo-works#task-requests-return-a-checked-answer).

## Instructions and model selection

**Your messages supply the instructions.** This endpoint does not prepend the task’s saved prompt or pinned skill instructions. Use [Run a task](/engineers/run-a-task) when you want Orlo to assemble those instructions and fill input placeholders.

Orlo selects a release for the task, applies its validation rules, and adds retrieved context for a source-backed release. The body’s `model` field does not select the model. Task routing settings may affect release selection. Sources are searched at request time.

## Read the response

The answer is text in `choices[0].message.content`. Successful responses carry validation status in a header, rather than the task endpoint’s JSON `validation` block. These headers identify the result:

| Header | Meaning |
| --- | --- |
| `x-orlo-model` | Model that answered |
| `x-orlo-trace-id` | Request record, also used for feedback |
| `x-orlo-validation` | `pass`, `warn`, `error`, `escalate`, or `abstain` |
| `x-orlo-task-version` | Task version used |
| `x-orlo-routing-mode` | `live`, `policy`, or `active_fallback` |

Check the HTTP status before reading an answer. A rejected result returns an error response. A result returned under warn behavior may still fail rules; the application must decide whether to use it. [Run a task](/engineers/run-a-task#the-validation-block) explains validation behavior.

## Compatibility

Use non-streaming text messages. This route does not implement the full OpenAI API: streaming, multimodal messages, tool orchestration, and Responses API requests are not supported by this contract. Supported request fields are `messages`, `temperature`, and `max_tokens`; do not rely on other OpenAI options being honored. Without `X-Orlo-Task-Id`, the request returns `400 INVALID_INPUT`.
