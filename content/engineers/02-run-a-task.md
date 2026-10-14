---
title: "Run a task"
description: "Call a task’s live release, read the validation block, and decide what your application does with a warning or a rejection."
order: 2
---

# Run a task

`POST /v1/tasks/:id/run` sends an input to a selected live release and returns a complete answer with its validation result. In one request, Orlo selects the release, adds source passages when needed, calls the model with your provider credential, and checks the answer. The key needs `inference.run`.

This endpoint does not stream tokens. See [the task request diagram](/start/how-orlo-works#task-requests-return-a-checked-answer) for the full path.

```bash
curl -X POST https://api.useorlo.com/v1/tasks/$TASK_ID/run \
  -H "Authorization: Bearer $ORLO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"input": {"ticket": "My card was charged twice."}, "explain": "debug"}'
```

Request fields:

| Field | Meaning |
| --- | --- |
| `input` | An object whose fields fill the `{{field}}` placeholders in the task’s instructions |
| `deployment_id` | Optional. Select a live release belonging to this task; an inactive release is refused |
| `explain` | Optional. `default`, `debug`, or `audit`; the last two add a `debug` block |

Response:

```json
{
  "output": "{\"category\":\"billing\",\"priority\":\"high\"}",
  "model": "gpt-4.1-mini",
  "trace_id": "9c1e…",
  "validation": { "valid": true, "warnings": [], "score": 1, "abstain": false, "escalate": false },
  "debug": {
    "latency_ms": 812,
    "tokens": { "input": 412, "output": 38 },
    "deployment_id": "…", "task_version_id": "…", "strategy": "prompt",
    "validation": { "valid": true, "warnings": [], "score": 1, "abstain": false, "escalate": false },
    "retrieval": null,
    "routing": { "mode": "active_fallback" }
  }
}
```

`output` is a string, even when it contains JSON. Parse it in your application after checking the HTTP status and validation result. The `debug` block is present only when requested with `explain: "debug"` or `"audit"`.

## The validation block

| Field | Meaning |
| --- | --- |
| `valid` | No error-severity validation check failed |
| `warnings` | Messages describing failed checks or validation warnings |
| `score` | 1 for a clean answer, lower by a tenth per warning, 0 when invalid |
| `abstain` | The answer should not be used as it is |
| `escalate` | Enough warnings that a person should look |

Decide in your application what each means for the user: show the answer, hold it, or route it to a person. Use `trace_id` to connect the answer to [feedback](/engineers/feedback-and-corrections) and its console record. Evidence is recorded in the background, so the record may appear after the response.

What a failed rule does depends on the task’s setting. With **reject**, the request answers `422 VALIDATION_FAILED` with the same validation block and the `trace_id`, and no answer is returned. With **retry**, Orlo attempts a configured, available fallback model and checks that answer before deciding the result. With **warn**, the answer comes back with `valid: false`. An answer marked `abstain` is always refused.

When the model call itself fails or times out, Orlo tries a configured, available fallback model before returning an error. `504 INFERENCE_TIMEOUT` means the request could not complete within the inference timeout.

## Sources

For a source-backed release, `debug.retrieval` lists the passages supplied to the model, each with its document, page, and score. The same passages are shown beside the answer in the console.

## Select a live release

An explicit `deployment_id` must belong to this task and be live. An inactive release returns `409 RELEASE_NOT_LIVE`; a release from another task returns `404 DEPLOYMENT_NOT_FOUND`. Without an explicit ID, Orlo uses an eligible routing-policy choice, then the live release if no choice is available.

Use [comparisons](/console/tasks/compare-and-release) to test a candidate before releasing it.
