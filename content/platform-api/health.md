---
title: Health
description: Liveness and dependency health endpoints
---

# Health

Health endpoints do not require org context.

## `GET /health`

Returns a full health check for:

- API process
- PostgreSQL
- Redis

### Response

```json
{
  "status": "ok",
  "service": "orlo-api",
  "timestamp": "2026-03-25T12:00:00.000Z",
  "checks": {
    "database": { "status": "ok", "latencyMs": 4 },
    "redis": { "status": "ok", "latencyMs": 2 }
  }
}
```

When dependencies are degraded, Orlo returns `503` with per-check error details.

## `GET /health/live`

Lightweight liveness probe.

### Response

```json
{ "status": "ok" }
```

