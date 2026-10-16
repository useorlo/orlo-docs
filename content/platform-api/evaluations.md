---
title: "Evaluations"
description: "Run asynchronous model evaluations and retrieve results"
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

## Check before running

Read [Models and availability](/platform-api/models) and use their `id` UUIDs in `models`. `POST /v1/evaluations/check` accepts `task_id`, `models`, and optional scoring/configuration choices and checks the saved access information and judge selection. It does not make a fresh provider call.

Use `expected_task_version_id` when starting work from a reviewed task version. A changed task is refused instead of silently testing newer instructions.

## Example

```bash
curl https://api.useorlo.com/v1/evaluations/run \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ORLO_API_KEY" \
  -d '{
    "task_id": "<task-id>",
    "dataset_id": "<dataset-id>",
    "models": ["<first-model-uuid>", "<second-model-uuid>"],
    "extends": "DEFAULT_CLASSIFICATION"
  }'
```

## Notes

- Evaluation runs are queued and return `202`.
- Results include uncertainty bounds and an Orlo recommendation when enough data is available.


A run with no successful answers has no quality result to recommend. Inspect status and failures before reading scores or selecting a release. For large runs, use the status and paginated examples endpoints described in the OpenAPI reference.

## Fixed paired release tests

Pass `candidates` and `release_test` to `/check` or `/run`. Each candidate has a unique `key`, `model_id`, and optional `task_version_id` or `deployment_id`, plus `include_retrieval_context`. A release baseline uses its saved configuration. If `models` is also supplied, it must match the distinct candidate model IDs.

```json
{
  "candidates": [
    {"key": "baseline", "model_id": "11111111-1111-4111-8111-111111111111", "deployment_id": "22222222-2222-4222-8222-222222222222"},
    {"key": "candidate", "model_id": "11111111-1111-4111-8111-111111111111", "task_version_id": "33333333-3333-4333-8333-333333333333", "include_retrieval_context": false}
  ],
  "release_test": {"version": 1, "method": "paired_fixed", "baseline_candidate_key": "baseline", "sample_count": 100, "confidence": 0.95, "max_score_drop": 0.03}
}
```

Add `task_id` and `dataset_id` to the run request. `max_score_drop` is a fraction of the 0–1 score range. The sample count is declared before execution. Results carry candidate IDs and explicit `passed`, `regressed`, `inconclusive`, or `invalid` verdicts. Failed calls and missing scoring cannot establish a pass.

`GET /v1/evaluations/:id/regions?candidate_id=...` returns descriptive paired diagnostics. The examples endpoint accepts `candidate_id`, `region_group`, and `region_metric` to inspect a cell. These diagnostics do not change the verdict.

`GET /v1/evaluations/:id/retrieval?candidate_id=...` returns bounded passage inspection, separate answer status, and a `next_cursor`. Pass that cursor as `after` for the next page. Older comparisons can have no recorded summary.

For a source-on/off test, set `config.retrieval_diagnostic: true`, use two candidates with the same explicit model and task version and no deployment override, and set sources true on one and false on the other. Both judges receive the same references; only the sources-on answering model receives them. [Read the workflow](/console/tasks/inspect-source-retrieval).
