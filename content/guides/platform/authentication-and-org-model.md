---
title: Authentication and Org Model
description: How auth and tenant context work in Orlo Platform
---

# Authentication and Org Model

Orlo Platform assumes authentication is handled by an upstream gateway in front of `api.useorlo.com`.

## Responsibility split

### Auth gateway

The gateway is responsible for:

- authenticating the caller
- applying access policy
- mapping the caller to an organization
- forwarding trusted tenant context to Orlo

### Orlo API

The Orlo API is responsible for:

- validating the trusted org context
- applying org-scoped request handling
- enforcing row-level tenant isolation

## Org header

Orlo expects a trusted `X-Orlo-Org-Id` header on org-scoped requests.

If the header is missing, malformed, or unknown, the request is rejected.

:::warning
For hosted deployments, callers should integrate through the auth gateway rather than manually inventing tenant headers in untrusted client code.
:::

## Task header

The OpenAI-compatible chat completion path also requires a trusted `X-Orlo-Task-Id` header so Orlo knows which deployed task to execute.
