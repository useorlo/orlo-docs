---
title: Monitoring
description: Platform health and evaluation monitoring endpoints
---

# Monitoring

Monitoring endpoints are org-scoped and surface runtime and evaluation diagnostics.

## Endpoints

### `GET /v1/monitoring/pgvector`

Return pgvector health metrics.

### `GET /v1/monitoring/circuit-breakers`

Return current circuit breaker states.

### `GET /v1/monitoring/judge-drift`

Run or retrieve judge-drift analysis.

Optional query parameter:

- `threshold`

## Notes

- These endpoints are useful for platform operators and Studio diagnostics.
- They are not a substitute for infrastructure-level metrics, logs, or tracing.

