---
title: Authentication
description: Authentication requirements and Orlo request context
---

# Authentication

Orlo Platform is exposed at `https://api.useorlo.com`.

Authentication requirements vary by deployment. This page focuses on the request context and headers that Orlo expects after a caller has been authenticated.

## What Orlo validates

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

Your deployment may also require additional authentication headers, cookies, or tokens. Document those alongside your environment setup.

## API scope

This API reference focuses on the routes used by applications and integrations.
