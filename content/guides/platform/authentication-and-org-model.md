---
title: Authentication and Org Model
description: How auth and tenant context work in Orlo Platform
---

# Authentication and Org Model

Orlo Platform uses authenticated, org-scoped request context on `api.useorlo.com`.

## What Orlo expects

- validating the trusted org context
- applying org-scoped request handling
- enforcing row-level tenant isolation

## Org header

Orlo expects a trusted `X-Orlo-Org-Id` header on org-scoped requests.

If the header is missing, malformed, or unknown, the request is rejected.

## Task header

The OpenAI-compatible chat completion path also requires a trusted `X-Orlo-Task-Id` header so Orlo knows which deployed task to execute.
