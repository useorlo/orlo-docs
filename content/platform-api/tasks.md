---
title: "Tasks"
description: "Define domain tasks, version them, and preview impact"
---

# Tasks

Tasks are the unit of domain work in Orlo.

Every task points to an immutable **current task version**, which snapshots:

- input schema
- output schema
- examples
- validation config
- prompt template

## Endpoints

### `POST /v1/tasks`

Create a task and its first immutable task version.

Key request fields:

- `name`
- `description`
- `input_schema`
- `output_schema`
- `examples`
- `validation_config`
- `prompt_template`
- `config`
- `skill_version_ids`: up to eight skill version ids, in order. Runtime keys can bind only published, non-retired versions. Authorized people can bind a draft for comparison, but cannot release it. Omitting the field on an update keeps prior references; an empty array removes them.

### `GET /v1/tasks`

List tasks for the current org.

### `GET /v1/tasks/:id`

Get a task and its current version snapshot.

### `GET /v1/tasks/:id/versions`

List immutable task versions.

### `PUT /v1/tasks/:id`

Update a task by creating a new immutable task version and moving the task head. Send `expected_version_id` when saving from a version you reviewed; a stale version returns a conflict.

### `PATCH /v1/tasks/:id`

Rename a task without creating a version.

### `GET /v1/tasks/:id/lifecycle`

What the task has: versions, comparisons, releases, answers; and which of delete, archive, or restore applies.

Archive, restore, and deletion are console actions for authorized people; runtime keys cannot perform them.

### `GET /v1/tasks/:id/model-settings`, `PUT /v1/tasks/:id/model-settings`

The task’s model shortlist and its judge choice.

### `POST /v1/tasks/:id/preview-impact`

Recheck recorded answers against a proposed output schema or validation rules. Send `proposed_changes` with `output_schema` or `validation_config`, an optional `expected_version_id`, and `sample_size` from 1 to 200 (default 25).

The response includes current and projected pass rates, newly failing answers, and whether the preview completed. It does not call a model or test prompt changes. Use a comparison to test new instructions.

### `POST /v1/tasks/:id/suggest-rules`

Suggest an editable output schema from the task’s saved expected answers. Send `dataset_id` and `expected_version_id`. The response includes `output_schema`, the source dataset/version, examined counts, and whether the suggestion was limited. The endpoint reads at most 200 examples and does not save a task version or call a model. A changed task version returns `409 TASK_VERSION_CHANGED`.

Review the field types and required fields before saving through the task update endpoint. Suggestions do not infer business policy or safe ranges. [Preview proposed rules](/console/tasks/preview-rules).

## Example

```bash
curl https://api.useorlo.com/v1/tasks \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ORLO_API_KEY" \
  -d '{
    "name": "Claims triage",
    "input_schema": { "type": "object" },
    "output_schema": { "type": "object" },
    "validation_config": { "failure_behavior": "reject" }
  }'
```

## Notes

- Task updates are versioned, not in-place edits of the active snapshot.
- Task-level settings are separate from versioned instructions and rules. See [release behavior](/platform-api/deployments) before changing sources or routing.

## Reuse identical answers

Set `config.response_cache.enabled` to opt in; it is off by default. [Enable response reuse and check eligibility](/engineers/reuse-answers) includes a complete read-and-update example. This task-level setting applies immediately, while released instructions stay pinned.
