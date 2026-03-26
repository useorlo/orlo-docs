---
title: Deployments
description: Freeze task versions onto models and activate deployments
---

# Deployments

Deployments bind a task version to a model and execution strategy.

Supported strategies today:

- `prompt`
- `rag`
- `lora`

## Endpoints

### `POST /v1/deployments`

Create a deployment with a frozen config snapshot.

Key request fields:

- `task_id`
- `task_version_id`
- `model_id`
- optional `strategy`
- optional `adapter_id` for `lora`

### `PUT /v1/deployments/:id/activate`

Mark a deployment active for its task.

### `PUT /v1/deployments/:id/deactivate`

Deactivate a deployment.

### `GET /v1/deployments`

List deployments, optionally filtered by `task_id`.

## Notes

- LoRA deployments validate that the adapter belongs to the same task and base model.
- Activation is per-task, so activating one deployment deactivates the previously active deployment for that task.

