---
title: Tasks
description: Define domain tasks, version them, and preview impact
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

### `GET /v1/tasks`

List tasks for the current org.

### `GET /v1/tasks/:id`

Get a task and its current version snapshot.

### `GET /v1/tasks/:id/versions`

List immutable task versions.

### `PUT /v1/tasks/:id`

Update a task by creating a new immutable task version and moving the task head.

### `POST /v1/tasks/:id/preview-impact`

Preview the effect of proposed validation or prompt changes by replaying recent hot-tier inference logs.

Useful for:

- output schema tightening
- validation policy changes
- prompt-template updates

## Example

```bash
curl https://api.useorlo.com/v1/tasks \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: <org-uuid>' \
  -d '{
    "name": "Claims triage",
    "input_schema": { "type": "object" },
    "output_schema": { "type": "object" },
    "validation_config": { "failure_behavior": "reject" }
  }'
```

## Notes

- Task updates are versioned, not in-place edits of the active snapshot.
- Task `config` is stored on the task head, while versioned prompt/schema/validation fields live on task versions.

