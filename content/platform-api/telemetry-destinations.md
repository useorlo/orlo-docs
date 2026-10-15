---
title: "Telemetry destinations"
description: "Configure, test, inspect, and replay delivery to an organization’s OTLP/HTTP JSON trace collector."
order: 30
---

# Telemetry destinations

Configure one organization-scoped OTLP/HTTP JSON trace collector. Reads need `org_config.read`; create, test, delete, and replay operations need `org_config.write`. Collector URLs must be public HTTPS, and authentication headers are never returned.

## Endpoints

| Method and path | Result |
| --- | --- |
| `GET /v1/telemetry-destinations` | `{ "destinations": [...] }` with `id`, `url_hint`, `created_at`, `last_delivered_at`, `last_error`, `pending_spans`, and `dropped_spans` |
| `POST /v1/telemetry-destinations` | `201` with `id` and `url_hint`; one destination per organization |
| `POST /v1/telemetry-destinations/:id/test` | Sends a test span; `{ "delivered": true }` when accepted |
| `DELETE /v1/telemetry-destinations/:id` | `204` when removed, `404` when absent |
| `GET /v1/telemetry-destinations/:id/deliveries` | The latest 50 delivery records, without payloads or authentication headers |
| `POST /v1/telemetry-destinations/:id/deliveries/:delivery/replay` | Queues a failed delivery; returns `{ "queued": true, "id": "..." }` |

## Create a destination

```json
{
  "url": "https://collector.example.com/v1/traces",
  "headers": { "Authorization": "Bearer <collector-token>" }
}
```

Supply authentication headers from a secret store. Do not put credentials in the URL. At most ten headers are accepted; transport headers, trace-context headers, cookies, and values containing line breaks are refused. An existing destination returns `409 DESTINATION_EXISTS`; remove it before configuring another.

## Delivery outcomes

The test returns `502 EXPORT_FAILED` if the collector does not accept the span. Delivery history includes `pending`, `delivered`, `failed`, and `partial`. Failed deliveries can be replayed. A partially accepted OTLP batch cannot be replayed because the collector does not identify each rejected span. Replay can return `409 NOT_REPLAYABLE` or `409 QUEUE_FULL`.

[Connect a collector and propagate trace context](/engineers/export-traces). Export is sampled and best effort at observation time; it does not replace stored evidence.
