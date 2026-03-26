---
title: Authentication
description: Gateway-managed authentication and Orlo request context
---

# Authentication

Orlo Platform is exposed at `https://api.useorlo.com`, but **authentication is owned by the upstream gateway**, not by Orlo itself.

## Responsibility split

### The auth gateway handles

- caller authentication
- access policy
- mapping the caller to an Orlo tenant
- forwarding trusted request context to Orlo

### Orlo handles

- validating tenant context headers
- org-scoped request processing
- row-level tenant isolation
- task-scoped execution and governance

## Required headers

### `X-Orlo-Org-Id`

Required on org-scoped `/v1/*` requests.

If this header is missing, malformed, or unknown, Orlo rejects the request.

### `X-Orlo-Task-Id`

Required on `POST /v1/chat/completions`.

This tells Orlo which task deployment to execute on the OpenAI-compatible path.

### `Idempotency-Key`

Optional on mutating org-scoped requests.

When present, Orlo caches the first response and can replay it for retried requests with the same key.

## Example request shape

Examples in this API section show only the Orlo-specific headers:

```bash
curl https://api.useorlo.com/v1/tasks \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: <org-uuid>' \
  -d '{"name":"Fraud case classification"}'
```

Your deployment may also require gateway-specific auth headers, cookies, or tokens. Those are outside the Orlo API contract and should be documented by the gateway owner.

## Public vs non-public APIs

This public API reference covers:

- tenant-facing `/v1/*` routes
- public health endpoints

It does not cover:

- `/v1/internal/*`
- `/v1/admin/*`

