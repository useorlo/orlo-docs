---
title: Control Plane vs Open Core
description: How Orlo separates reusable code from the hosted control plane
---

# Control Plane vs Open Core

Open Core gives you code.

The control plane gives you governed operation.

## Open Core

Open Core is portable and reusable. It should be possible to understand and adopt these packages without owning Orlo’s database or deployment infrastructure.

## Control Plane

The control plane is where Orlo becomes a product:

- org-scoped persistence
- state transitions
- async jobs
- approval workflows
- deployment lifecycle
- retrieval orchestration

That is why staging and production demos should still run from the private repo.
