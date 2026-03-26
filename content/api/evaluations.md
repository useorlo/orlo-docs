---
title: Evaluations
description: Run asynchronous model evaluations and retrieve results
---

# Evaluations

Evaluations are asynchronous, budget-bounded comparisons of one or more models against a dataset.

## Endpoints

### `GET /v1/evaluations/templates`

List built-in evaluation templates.

### `GET /v1/evaluations/templates/:key`

Get one template definition.

### `POST /v1/evaluations/run`

Queue an evaluation run.

Key request fields:

- `task_id`
- `dataset_id`
- `models[]`
- optional `rubric_id`
- optional `extends`
- optional `budget`
- optional `scoring`
- optional `config`

### `GET /v1/evaluations/:id`

Get evaluation status, per-model results, and Orlo's recommendation.

### `GET /v1/evaluations`

List evaluations for the current org.

## Example

```bash
curl https://api.useorlo.com/v1/evaluations/run \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: <org-uuid>' \
  -d '{
    "task_id": "<task-id>",
    "dataset_id": "<dataset-id>",
    "models": ["gpt-4.1-mini", "claude-3-5-haiku"],
    "extends": "DEFAULT_CLASSIFICATION"
  }'
```

## Notes

- Evaluation runs are queued and return `202`.
- Results include uncertainty bounds and an Orlo recommendation when enough data is available.

