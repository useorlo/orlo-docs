---
title: API Keys
description: Integration access, scopes, rotation, and revocation for Orlo Platform
---

# API Keys

API keys are the integration access surface for applications and services that call Orlo.

They should be managed as production credentials: scoped, rotated, reviewed, and revoked when no longer needed.

## Who Uses It

- developers integrating applications with Orlo
- platform teams managing service access
- security teams reviewing machine credentials
- administrators rotating or revoking access

## What It Shows

API key management should show:

- key label
- scope or intended use
- issuing user or service owner
- creation time
- last-used signal where available
- rotation and revocation controls
- audit events

## Why It Matters

The control plane is only as safe as its access boundary.

API keys help teams connect applications to Orlo while keeping machine access reviewable.
