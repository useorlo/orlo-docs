---
title: "Feedback"
description: "Submit answer corrections, review them, and create a new dataset version with concurrency checks."
---

# Feedback

Feedback belongs to a logged task request. Use its `trace_id` as `inference_log_id`.

## Submit and read

`POST /v1/feedback` requires `feedback.write` and accepts:

```json
{
  "inference_log_id": "<request-uuid>",
  "score": -1,
  "correction": {"category": "billing", "priority": "high", "escalate": true}
}
```

`score` is `-1`, `0`, or `1`. A correction is optional and must fit the task’s output schema. Success returns `201` with the feedback ID and status.

`GET /v1/feedback` requires `feedback.read` and accepts `task_id` and `status` filters.

## Review a correction

`PUT /v1/feedback/:id/status` accepts `{"status":"staged"}` or `{"status":"rejected"}`. Supported transitions are pending → staged, pending → rejected, and staged → rejected. Only a valid correction can be staged.

This API permits trusted runtime keys with `feedback.write`; the scope is not limited to submitting a score. In the console, the Reviewer preset authorizes review decisions. Use the console when your process requires an attributable human review.

## Promote accepted corrections

`POST /v1/tasks/:task_id/feedback/promote` requires `datasets.write` for a runtime key. It adds staged corrections to a new dataset version and marks the source feedback promoted.

| Field | Meaning |
| --- | --- |
| `base_dataset_id` | Latest dataset ID shown in the preview, or `null` if there was none |
| `expected_feedback_revision` | Revision of the accepted correction set from the preview |

Both checks are optional at the API level. Send them when acting on a preview; omitting them means using the current data at write time. The console includes the preview checks.

- `409 DATASET_BASE_CHANGED`: reload the latest examples and review the new baseline.
- `409 FEEDBACK_CHANGED`: reload the staged corrections and review the changed set.

Success returns the new dataset and promoted count. The prior dataset remains available to earlier comparisons. See [Datasets](/platform-api/datasets) for lineage and [Improve from production](/console/tasks/improve-from-production) for the console flow.
