---
title: "Authentication"
description: "Connect your application with a runtime key and handle scopes, retries, errors, and rate limits."
order: 1
---

# Authentication

Send application and SDK requests to the API with a runtime key:

```bash
curl https://api.useorlo.com/v1/tasks \
  -H "Authorization: Bearer $ORLO_API_KEY"
```

The key selects the organization. Do not send an organization header. Keep keys on your server or agent runtime, never in a public browser bundle. Console users sign in as people; AI-app connections use their own OAuth consent flow.

## Scopes

Each route needs one scope, listed in [Sign up and create a key](/start/sign-up-and-keys#scopes). A key with a scope it does not need is a wider key than you want; give an application that only runs a task `inference.run` alone.

## People-only actions

Deciding approvals, changing tool rules and limits, writing skills, and deleting or archiving tasks are refused to every key with `403 PEOPLE_ONLY`. They happen in the console under a person’s sign-in, so the record says who.

## Idempotency

Send `Idempotency-Key` on a write you might retry, such as creating a session, governing a step, or submitting feedback. Reuse the same key only for the same method, path, and body. The SDKs reuse it for transport retries.

A stored response can be replayed within the replay window. A request still in progress can return `409 IDEMPOTENCY_IN_PROGRESS` with `Retry-After`. Replay protection is best effort during a service failure; it is not an exactly-once guarantee. Use your tool or downstream service’s own idempotency key for payments, messages, and other external side effects.

## Errors

Errors are JSON with `error` and `message`:

```json
{ "error": "INSUFFICIENT_SCOPE", "message": "This key lacks inference.run" }
```

| Status and code | Meaning |
| --- | --- |
| `401 MISSING_API_KEY` | No bearer token |
| `401 INVALID_API_KEY` | The key is unknown, revoked, or expired |
| `403 INSUFFICIENT_SCOPE` | The key lacks the route’s scope |
| `403 PEOPLE_ONLY` | A person must do this in the console |
| `400 INVALID_INPUT` | A required field is missing or wrong; the message names it |
| `404 NOT_FOUND` and the resource’s own codes | The id is not in this organization |
| `409` with a named code | The record changed under you, for example `FEEDBACK_CHANGED` or `SKILL_PUBLICATION_CHANGED` |
| `429` | Rate limited; wait for `Retry-After` |
| `502 UPSTREAM_UNAVAILABLE`, `504 UPSTREAM_TIMEOUT` | The service was unavailable or the request timed out |

## Rate limits

The gateway limits requests per key per minute, and an admin can set a different limit on a key when creating it. A `429` carries `Retry-After` in seconds.
