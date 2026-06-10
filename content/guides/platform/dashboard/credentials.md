---
title: Credentials
description: Provider and storage credential management in the Orlo dashboard
---

# Credentials

Credentials let an org connect Orlo to model providers, self-hosted model endpoints, and supported storage services.

The dashboard makes credential availability visible to administrators without exposing decrypted secrets.

## Who Uses It

- platform administrators configuring providers
- security teams reviewing provider access
- ML teams validating model availability
- tenant administrators managing storage connections

## What It Shows

Credentials should show:

- provider type
- label
- status
- creation and update metadata
- whether a credential is available for evaluation or inference
- deactivation controls

## Why It Matters

AI governance is not only about model output. It also depends on who can connect which providers, models, and storage systems to production workflows.

Credentials give administrators a controlled surface for those connections.
