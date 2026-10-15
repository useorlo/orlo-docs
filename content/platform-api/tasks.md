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

Response reuse can reduce latency and provider cost for repeated requests. It is **off by default** and configured through the Tasks API with `config.response_cache.enabled`.

When updating an existing task, read it first, retain its other configuration values, and send the current version ID:

```javascript
const url = `https://api.useorlo.com/v1/tasks/${taskId}`;
const headers = { Authorization: `Bearer ${orloApiKey}` };
const current = await fetch(url, { headers });
if (!current.ok) throw new Error(`Task read failed: ${current.status}`);
const task = await current.json();
const saved = await fetch(url, {
  method: "PUT",
  headers: { ...headers, "Content-Type": "application/json" },
  body: JSON.stringify({
    expected_version_id: task.current_version.id,
    config: { ...task.config, response_cache: { enabled: true } }
  })
});
if (!saved.ok) throw new Error(`Task update failed: ${saved.status}`);
```

The key needs `tasks.read` and `tasks.write`. This update creates a task version. Response reuse is a task-level setting and applies to live requests immediately; it does not change their released instructions. Set `enabled` to `false` to stop reuse.

Eligible requests use a prompt release without sources, adapters, or consensus, with an effective temperature from `0` to `0.1`. An answer may be reused for up to five minutes when the release, instructions, input, conversation, generation settings, and active credential match. Each request still checks availability, validates the answer, and records its own trace. Credential rotation separates subsequent reuse. A cache miss or cache outage proceeds to a model call.
