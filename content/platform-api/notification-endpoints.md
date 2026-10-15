---
title: "Notification endpoints"
description: "Register signed approval webhooks and update their event subscriptions."
---

# Notification endpoints

Register organization-scoped HTTPS receivers for approval events. Listing needs `org_config.read`; creating, editing, and deleting need `org_config.write`. Admins can do the same in **Settings → Notifications**.

For signature verification, retries, and safely resuming a waiting agent, see [Webhooks and approvals](/engineers/webhooks-and-approvals).

## `GET /v1/notification-endpoints`

Returns `{ "endpoints": [...], "email_notifier": true }`. Each endpoint includes its ID, selected events, active state, creation time, creator, and masked `url_hint`. Secrets and full addresses are not returned. `email_notifier` reports whether reviewer email is configured.

## `POST /v1/notification-endpoints`

```json
{
  "url": "https://example.com/orlo",
  "events": ["approval.approved", "approval.rejected", "approval.expired"]
}
```

Returns `201` with `{ "endpoint": {...}, "secret": "..." }`. Store `secret` securely; it is shown only once. The receiver URL must pass Orlo’s public HTTPS address checks.

Omitting `events` subscribes to all six supported events: `approval.requested`, `approval.expiring`, `approval.escalated`, `approval.expired`, `approval.approved`, and `approval.rejected`. An empty list or unknown event returns `400 INVALID_WEBHOOK_EVENTS`.

## `PATCH /v1/notification-endpoints/:id`

Replace an existing subscription’s selected events:

```json
{ "events": ["approval.approved", "approval.rejected", "approval.expired"] }
```

`events` is required and must contain at least one supported event. The address and secret stay unchanged. Returns the updated endpoint with a masked address, or `404` if it does not exist in this organization. Existing subscriptions are not automatically expanded when new event types are introduced.

## `DELETE /v1/notification-endpoints/:id`

Returns `204` when removed, or `404` if it does not exist in this organization. Removing the endpoint stops future sends; a request already in flight may still arrive.

## Delivery history and replay

`GET /v1/notification-endpoints/:id/deliveries` returns `{ "deliveries": [...] }` with up to 50 recent records: `id`, `event_id`, `label`, `status`, `attempts`, `replays`, `last_error`, `created_at`, and `finished_at`. The read needs `org_config.read`; payloads and secrets are not included.

`POST /v1/notification-endpoints/:id/deliveries/:delivery/replay` needs `org_config.write` and queues a failed delivery again, returning `{ "queued": true, "id": "..." }`. It preserves the event ID and respects destination cooldown. A full queue returns `409 QUEUE_FULL`; a delivery that is not failed returns `409 NOT_REPLAYABLE`.

[Retry and retention behavior](/engineers/webhook-delivery-fails) explains the limits. An event notification never replaces the governed-step decision.
