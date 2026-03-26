---
title: Rubrics
description: Define reusable rubric criteria for evaluations
---

# Rubrics

Rubrics define reusable evaluation criteria beyond default template scoring.

## Endpoints

### `POST /v1/rubrics`

Create a rubric and its ordered criteria.

Key request fields:

- `task_id`
- `name`
- `criteria[]`

Each criterion can include:

- `name`
- `description`
- optional `weight`

### `GET /v1/rubrics`

List rubrics, optionally filtered by `task_id`.

### `GET /v1/rubrics/:id`

Get a rubric and its criteria.

