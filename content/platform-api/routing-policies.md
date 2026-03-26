---
title: Routing Policies
description: Define routing objectives and SLA preferences per task
---

# Routing Policies

Routing policies store task-level preferences for model selection and fallback.

## Endpoints

### `POST /v1/routing-policies`

Create a routing policy.

Common fields:

- `task_id`
- `weight_accuracy`
- `weight_latency`
- `weight_cost`
- `weight_validation`
- `min_accuracy`
- `max_latency_ms`
- `min_validation_rate`
- `max_cost_per_1k`
- `sla_latency_p95_ms`
- `sla_availability`
- `sla_max_error_rate`
- `fallback_model_id`

### `GET /v1/routing-policies`

List policies, optionally filtered by `task_id`.

## Notes

- Routing policy records are part of Orlo's control-plane data model.
- Deployment snapshots can freeze the latest routing policy for a task at deployment time.

