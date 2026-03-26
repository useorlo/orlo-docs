---
title: Control Plane vs Open Core
description: How Orlo separates reusable code from the managed platform
---

# Control Plane vs Open Core

Open Core gives you code.

The platform adds governed operation.

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

That is why production deployments use Orlo Platform, while Open Core remains a portable package surface.
