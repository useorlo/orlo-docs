---
title: "Feedback and corrections"
description: "Send a score and a correction for a logged answer from your application, and what happens to it afterwards."
order: 7
---

# Feedback and corrections

Feedback turns a production answer into a better example. The key needs `feedback.write`.

```bash
curl -X POST https://api.useorlo.com/v1/feedback \
  -H "Authorization: Bearer $ORLO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"inference_log_id": "'$TRACE_ID'", "score": -1, "correction": {"category": "fraud", "priority": "high"}}'
```

| Field | Meaning |
| --- | --- |
| `inference_log_id` | The `trace_id` from the run response or the `x-orlo-trace-id` header |
| `score` | `1` right, `0` neutral, `-1` wrong |
| `correction` | Optional. The answer that should have been returned, in the task’s answer shape; a correction that does not fit is refused with the field named |

## What happens next

A correction is **pending** until a reviewer looks at it in the console. A reviewer stages or rejects it. An admin promotes the staged corrections of a task together into a new dataset version with `POST /v1/tasks/:task_id/feedback/promote`; send `base_dataset_id` for the previewed dataset and `expected_feedback_revision` for the accepted correction set. A changed dataset returns `409 DATASET_BASE_CHANGED`; a changed correction set returns `409 FEEDBACK_CHANGED`. Reload and review before retrying either conflict. The next comparison runs on the new version.

`GET /v1/feedback` lists feedback with its status; `feedback.read` is enough for that. A key with `feedback.write` can also stage or reject corrections through the API. Give that scope only to a trusted feedback integration. In the console, the Reviewer preset permits these decisions; promotion into a dataset remains an admin workflow. A runtime key performing promotion needs `datasets.write`.

## Review protected values

Corrections preserve the task’s answer shape, including ordinary fields named `token` or `session`. Known organization credentials and recognizable secret values are removed before saving. If that changes a correction, the response includes `redaction_warning`; inspect the saved correction before accepting it. If the protected value no longer fits the output schema, Orlo refuses it so you can supply a safe example value.
