---
title: "Routing Policies"
description: "Define routing objectives and SLA preferences per task"
---

# Routing Policies

Routing policies store task-level preferences for deployment selection and fallback.

When a live inference request does not pin a deployment explicitly, Orlo can evaluate the routing policy against the task's evaluated deployment candidates and rank eligible live releases using comparison evidence, cost, and latency preferences.

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
- `sla_availability`, `sla_max_error_rate`: stored preferences; these do not currently provide live provider-health selection
- `fallback_model_id`

### `GET /v1/routing-policies`

List policies, optionally filtered by `task_id`.

## Runtime effect

When routing is active for a request, Orlo exposes the result in two places:

- `x-orlo-routing-mode` on `POST /v1/chat/completions`
- `debug.routing` on `POST /v1/tasks/:task_id/run` when `explain` is `debug` or `audit`

## Notes

- Routing policies work against evaluated deployment candidates, not arbitrary models with no deployment snapshot.
- Routing policy records are part of the task’s release configuration.

## Provider failures and fallback

Routing ranks evaluated releases; it does not rank them by live provider health. Orlo checks the selected provider connection before dispatch. Repeated temporary failures can pause that connection. A configured, eligible fallback can answer within the remaining request time; without one, the request may return `PROVIDER_PAUSED`.

Use **Live settings → Fallback model** to choose the alternate model, and test it on the task’s examples. See [inference errors](/platform-api/inference#errors-and-recovery) for recovery guidance.
