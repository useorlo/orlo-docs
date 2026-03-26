---
title: Datasets
description: Upload labeled datasets and retrieve dataset versions
---

# Datasets

Datasets hold labeled examples used for evaluation.

## Endpoints

### `POST /v1/datasets`

Create a dataset for a task.

Key request fields:

- `task_id`
- `name`
- `samples[]`

Each sample contains:

- `input`
- `expected_output`

### `GET /v1/datasets`

List datasets, optionally filtered by `task_id`.

### `GET /v1/datasets/:id`

Get a dataset and all its samples.

## Example

```bash
curl https://api.useorlo.com/v1/datasets \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: <org-uuid>' \
  -d '{
    "task_id": "<task-id>",
    "name": "Claims v1",
    "samples": [
      {
        "input": { "claim_text": "..." },
        "expected_output": { "category": "auto" }
      }
    ]
  }'
```

## Notes

- Datasets are versioned per task.
- Feedback promotion can also create new dataset versions automatically.

