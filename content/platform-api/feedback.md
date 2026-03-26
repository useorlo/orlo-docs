---
title: Feedback
description: Submit corrections, stage them, and promote them into datasets
---

# Feedback

Feedback lets human reviewers score outputs, attach corrections, and promote approved corrections into a new dataset version.

## Endpoints

### `POST /v1/feedback`

Submit feedback for an inference log.

Key request fields:

- `inference_log_id`
- `score` of `-1`, `0`, or `1`
- optional `correction`

Corrections are validated against the task output schema.

### `GET /v1/feedback`

List feedback items, optionally filtered by:

- `status`
- `task_id`

### `PUT /v1/feedback/:id/status`

Move feedback through the review lifecycle.

Supported public transitions:

- `pending -> staged`
- `pending -> rejected`
- `staged -> rejected`

### `POST /v1/tasks/:task_id/feedback/promote`

Promote staged corrections into a new dataset version.

## Notes

- Only feedback with valid corrections can be staged.
- Promotion creates a new dataset automatically and marks the promoted feedback rows accordingly.

