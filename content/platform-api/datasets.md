---
title: "Datasets"
description: "Create immutable example sets with append or replace behavior, baseline conflict checks, and lineage."
---

# Datasets

Datasets are versioned per task. Comparisons keep the exact dataset ID they used. The runtime key needs `datasets.read` for reads or `datasets.write` for changes.

## Create a dataset version

`POST /v1/datasets` creates the next version. It never edits an earlier version in place.

| Field | Meaning |
| --- | --- |
| `task_id` | Task UUID |
| `name` | Dataset name |
| `samples` | Non-empty array of objects containing `input` and `expected_output` |
| `mode` | `append` by default: copy the latest examples and add these. `replace`: use only these examples. |
| `base_dataset_id` | The latest dataset ID you reviewed; use `null` for the first version. Required for `replace`; recommended for `append`. |

```bash
curl https://api.useorlo.com/v1/datasets \
  -H "Authorization: Bearer $ORLO_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "task_id": "<task-uuid>",
    "name": "Support routing examples",
    "base_dataset_id": null,
    "mode": "append",
    "samples": [{
      "input": {"message": "I was charged twice."},
      "expected_output": {"category": "billing", "priority": "high", "escalate": true}
    }]
  }'
```

A successful request returns `201` with `id`, `version`, `sample_count`, `parent_dataset_id`, `change_kind`, `change_mode`, `baseline_count`, and `added_count`. If an existing task already has examples, send that latest dataset ID instead of `null`.

Omitting `base_dataset_id` on append uses the latest version at write time. It does not check that this is the version you previewed. `409 DATASET_BASE_CHANGED` means the supplied baseline is no longer current; reload, review the new total, and retry explicitly. Do not turn a replace conflict into an unconditional append.

## Read versions and examples

- `GET /v1/datasets?task_id=<uuid>` lists versions for the task.
- `GET /v1/datasets/:id` returns the version and its examples.
- Add `limit=50` for a bounded page. Pass the returned `next_cursor` as `after`, together with `limit`, to read the next page.

Samples include their provenance when present. [Feedback promotion](/platform-api/feedback) and [saved agent steps](/platform-api/agent-governance#trace-import-and-review) also create dataset versions with their origins preserved.
