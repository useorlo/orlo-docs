---
title: "How do I receive approval decisions through webhooks?"
description: "Receive a signed approval decision, check its current status, and resume the right agent step."
sidebar_title: "Approval webhooks"
order: 8
---

# How do I receive approval decisions through webhooks?

Register a public HTTPS webhook in **Settings → Notifications** and select approval events. Orlo sends a signed notification when the chosen lifecycle event occurs. Verify and save it, then read the current approval status before resuming a saved agent step.

## Choose how to receive updates

| What your application needs | Use |
| --- | --- |
| The decision before a tool runs | The response from the governed-step request |
| Progress while a run is open | The session event stream |
| A notification when a person decides, including while your worker is offline | An approval webhook |
| Current status after a notification, reconnect, or restart | `GET /v1/agent-approvals/:id` |

Webhooks cover the approval lifecycle. They are not sent for every logged step or every immediate allow or reject decision. Those decisions are in the API response and the session’s recorded events.

## 1. Register a receiver

An admin opens **Settings → Notifications → Add a webhook**, enters a public HTTPS receiver URL, and selects events. For an application waiting for a final answer, select **Approved**, **Rejected**, and **Lapsed**. Select **Waiting for a decision** as well if the receiver also routes review requests.

Store the signing secret in your receiver’s secret store. Orlo shows it once. Use **Edit events** to change an existing subscription without changing its address or secret. Existing subscriptions keep their selected events until you edit them.

The [notification endpoint API](/platform-api/notification-endpoints) supports the same setup.

| Event | Meaning |
| --- | --- |
| `approval.requested` | A step is waiting for a person |
| `approval.expiring` | A pending approval is near its deadline |
| `approval.escalated` | The first deadline passed and the rule gives admins another review window; it is still pending |
| `approval.approved` | A person approved the request |
| `approval.rejected` | A person rejected the request |
| `approval.expired` | The request closed without a person’s decision; the configured timeout action applies |

Reviewer email handles requests and deadline notices when email is configured. Final approval and rejection events are for webhook receivers.

## 2. Verify each delivery

Orlo sends a JSON `POST` with these fields:

| Field | Purpose |
| --- | --- |
| `id` | Stable event ID; use it to deduplicate deliveries |
| `type` | One of the events above |
| `org_id` | Organization that owns the event |
| `occurred_at` | When the event was recorded |
| `approval` | Approval snapshot, including `approval_id`, `session_id`, `step_id`, `task_id`, `status`, and deadline fields; human decisions also carry `decided_at` and `decided_by` |

The headers include `X-Orlo-Event-Id`, `X-Orlo-Event-Type`, and `X-Orlo-Signature`. The signature has the form `t=<unix seconds>,v1=<hex digest>`.

Verify the exact raw request body **before** JSON parsing. The digest is HMAC-SHA256 over the timestamp, a period, and the raw body, using the signing secret exactly as returned. This Node.js example also rejects timestamps more than five minutes away from the receiver’s clock:

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

function verifyOrloSignature(rawBody, signature, secret, now = Date.now()) {
  if (!secret || typeof signature !== 'string') return false;
  const match = /^t=(\d+),v1=([a-f0-9]{64})$/.exec(signature);
  if (!match) return false;
  const timestamp = Number(match[1]);
  if (!Number.isSafeInteger(timestamp) || Math.abs(now / 1000 - timestamp) > 300) return false;
  const expected = createHmac('sha256', secret)
    .update(`${match[1]}.`).update(rawBody).digest();
  const received = Buffer.from(match[2], 'hex');
  return received.length === expected.length && timingSafeEqual(received, expected);
}
```

Use your HTTP framework’s raw-body support, with an appropriate request-size limit. Keep the receiver’s clock synchronized. Reject invalid signatures. After verification, validate the event type and organization, and use the signed body’s `id` as the deduplication key. Do not log the secret or full request payloads.

## 3. Accept quickly and process once

Save the verified event and queue your worker durably, then return `2xx` within five seconds. Deduplicate by the signed event ID. Do not wait for tool execution before acknowledging.

[Failed delivery, retries, and replay](/engineers/webhook-delivery-fails) explains the destination-specific retry schedule, back pressure, retention, and manual replay. Reconcile outstanding approvals by ID because delivery can be delayed or duplicated.

## 4. Read the decision and resume the saved step

[Resume the approved action](/engineers/resume-an-approved-step) using the current approval status and the original session, step ID, tool, action class, and arguments. Preserve that state before waiting. A notification does not authorize bypassing the governed-step check.

## Watch a running session

`GET /v1/agent-sessions/:id/events/stream` uses server-sent events. It includes `step:governed`, tool outcomes, and `approval:decided`. Reconnect with the last event ID using `Last-Event-ID` or the `after` query parameter. Read the approval by ID when resuming a durable job so that a missed or delayed event does not determine what runs.

See [Agent API](/platform-api/agent-governance), [TypeScript SDK](/engineers/agent-sdk-typescript), and [Python and LangGraph](/engineers/python-and-langgraph) for the governed call path.
