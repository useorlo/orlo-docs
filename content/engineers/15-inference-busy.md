---
title: "What should my application do when Orlo is busy?"
description: "Handle capacity limits with bounded retries, backoff, and an application deadline."
sidebar_title: "Capacity and retries"
order: 15
---

# What should my application do when Orlo is busy?

Handle `429 INFERENCE_BUSY` and `503 PROVIDER_BUSY` as capacity limits: wait for `Retry-After` when supplied, then retry with a bounded delay and jitter. Limit simultaneous requests in your application so retries do not add to the load. Stop retrying when the user’s deadline expires.

## Distinguish a busy service from a bad request

`INFERENCE_BUSY` limits admitted inference work. `PROVIDER_BUSY` means provider-call capacity is unavailable within the request’s time budget. `PROVIDER_PAUSED` means repeated failures have temporarily paused that provider; inspect the provider configuration and recent failures.

Do not retry validation failures, invalid input, or authentication errors unchanged. `EVIDENCE_UNAVAILABLE` means Orlo could not record the evidence required for a successful response; it does not prove a model call never happened. When `details.provider_completed` is `true`, the provider answered but Orlo could not save the required completion evidence. When `details.retry_recommended` is `false`, stop automatic retries and retain the trace ID and `details.provider_call_id` for investigation. Repeating the request can incur another charge.

Keep retry counts and elapsed time bounded. An Orlo idempotency key is not an exactly-once guarantee for an external tool or downstream side effect. [Authentication and retries](/engineers/authentication) and [inference error codes](/platform-api/inference#errors-and-recovery) define the contract.
