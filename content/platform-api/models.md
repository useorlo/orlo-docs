---
title: "Models and availability"
description: "Read catalog IDs, lifecycle status, and the provider access recorded for your organization."
---

# Models and availability

Use catalog UUIDs in comparison and release requests. A provider model name is a display and provider identifier; it is not the model ID accepted by those APIs.

## List models

`GET /v1/models` requires `models.read`. It returns `{models, total}`. Filter with `runtime` or `provider`. The list includes active models and retired models still referenced by an active release in your organization.

Each entry includes `id`, `name`, `provider`, `runtime`, `active`, lifecycle and recorded-price fields, `has_credentials`, and an `availability` object. Models needing a key can still appear in the list.

| `availability.status` | Meaning | Selectable |
| --- | --- | --- |
| `missing_key` | No active credential for the provider | No |
| `key_rejected` | The last credential check was rejected | No |
| `unverified` | Access has not been checked recently, or the result was incomplete | Yes, for a compatible answering model |
| `listed` | A recent check listed the model for the saved key | Yes, for a compatible answering model |
| `not_listed` | A recent complete check did not list the model | No |
| `retired` | The catalog marks the model inactive | No |

`availability` also contains `label`, `message`, `selectable`, and `checked_at`. Use `selectable` and the message rather than treating `has_credentials` as proof of availability. Embedding models cannot be comparison candidates for answers.

A check older than a day becomes unverified. A provider listing does not guarantee quota, request compatibility, or successful inference. Retest credentials in the console when access changes.

## Read a model

`GET /v1/models/:id` returns one active model or `404`. The list also includes retired models that still need a replacement on an active release.

## Handle retirement

Retired models cannot be used for new work or live inference. Historical comparisons and releases retain their references. Compare an available replacement on the task’s examples before creating a new release. The catalog’s public feed describes models; organization-specific access remains private.
