---
title: "What happens when a webhook cannot be delivered?"
description: "Inspect destination-specific retries, delivery history, and replay of failed webhook events."
sidebar_title: "Webhook delivery recovery"
order: 17
---

# What happens when a webhook cannot be delivered?

Orlo keeps a separate delivery record for each destination and retries temporary failures with increasing, staggered delays. A failed receiver does not cause a successful receiver to receive the same retry. After the retry or age limit, an admin can inspect the failed delivery and replay it; receivers must still handle duplicates.

## Retry behavior

The retry schedule starts around 1, 5, 15, 60, and 180 minutes, with jitter. Orlo respects a destination’s `Retry-After` up to 24 hours and pauses that destination between attempts. Network failures, HTTP `408`, `429`, and server errors are retryable; other HTTP errors fail the delivery. There are at most six attempts, and pending deliveries expire after 24 hours.

Every attempt uses the same event ID with a fresh signature timestamp. Delivery can be duplicated, delayed, or out of order. Verify the signature, save the event durably, deduplicate its signed ID, and return `2xx` within five seconds.

## Inspect and replay

In **Settings → Notifications**, open the destination’s delivery history, fix the receiver problem, and replay a failed delivery. The API provides the same [history and replay operations](/platform-api/notification-endpoints#delivery-history-and-replay). Replay keeps the event ID and respects any destination cooldown. It does not authorize executing an agent action twice.

History returns up to 50 recent delivery records; completed records are cleaned up after 14 days. A destination’s pending queue is bounded at 10,000 entries. Reconcile outstanding approvals by ID rather than depending on notifications as your only record.

[Verify webhook signatures](/engineers/webhooks-and-approvals). [Resume an approved step safely](/engineers/resume-an-approved-step).
