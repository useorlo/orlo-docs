---
title: Adapters
description: Register and manage LoRA adapters for self-hosted runtimes
---

# Adapters

Adapters represent LoRA or related fine-tuning artifacts that can be attached to self-hosted runtimes.

## Endpoints

### `POST /v1/adapters`

Register an adapter.

Key request fields:

- `task_id`
- `base_model_id`
- `name`
- `storage_path`
- optional `format`
- optional `size_bytes`
- optional `rank`
- optional `alpha`
- optional `target_modules`
- optional `metadata`

### `GET /v1/adapters`

List adapters, optionally filtered by `task_id`.

### `GET /v1/adapters/:id`

Get one adapter.

### `PUT /v1/adapters/:id`

Update adapter metadata, path, name, or active state.

### `DELETE /v1/adapters/:id`

Soft-archive an adapter.

## Notes

- Adapters are currently for `vllm` and `llama_cpp` runtimes.
- External API providers like OpenAI and Anthropic do not support user-supplied adapters through this path.

