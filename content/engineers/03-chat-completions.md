---
title: "Chat completions"
description: "Use the OpenAI chat request shape with released task instructions and a checked, complete answer."
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
    {"role": "user", "content": "My card was charged twice."}
  ]}'
```

This uses the same complete-answer workflow as the task endpoint: release selection, source retrieval when needed, the model request, and answer rules. [See the request diagram](/start/how-orlo-works#task-requests-return-a-checked-answer).

## Instructions and model selection

**The released task supplies the instructions.** Save the task prompt and pin any shared skills before comparing and releasing. Both inference endpoints apply those instructions. Chat messages supply the conversation and task data.

Caller `user` and `assistant` messages retain their roles. Caller `system`, `developer`, and `tool` messages are passed as JSON-wrapped user data with their original role recorded; they do not replace the released instructions or invoke tools. Retrieved passages and skill reference files are also supplied as data.

If an existing client relies on a caller system prompt, move that instruction into the task standard, compare the changed version, and release it before switching traffic. Use [Run a task](/engineers/run-a-task) for structured input fields without a chat conversation.

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

Use non-streaming text messages. This route does not implement the full OpenAI API: streaming, multimodal messages, tool orchestration, and Responses API requests are not supported by this contract. Supported generation fields are `temperature`, `max_tokens`, and `max_completion_tokens` (which takes precedence over `max_tokens`). Use 1–16,384 for an output-token limit and 0–2 for temperature. When neither the request nor the release specifies a temperature, Orlo requests `0`, matching comparisons. This reduces variation; it does not guarantee identical answers. Do not rely on other OpenAI options being honored. Without `X-Orlo-Task-Id`, the request returns `400 INVALID_INPUT`.

Set `stream` to `false` or omit it. `stream: true` returns `400 INVALID_INPUT` before a model call, with a message explaining how to request a complete answer. For an agent that needs native token streaming, keep its model call direct and use [agent permissions](/start/how-orlo-works#agent-permissions-check-actions-in-your-runtime) around its tools.
