---
title: Control Plane vs Open Core
description: How Orlo separates reusable code from the managed platform
---

# Control Plane vs Open Core

Open Core gives you reusable primitives.

The control plane governs the production decision path.

## Open Core

Open Core is portable and reusable. It should be possible to understand and adopt these packages without owning Orlo’s database or deployment infrastructure.

Use it when you want:

- validation primitives
- runtime adapters
- agent-governance SDKs
- reusable UI components

## Control Plane

The control plane is where Orlo becomes a product.

This is the layer that sits on the path between a live request and a consequential outcome. It adds:

- org-scoped persistence
- state transitions
- async jobs
- approval workflows
- deployment lifecycle
- retrieval orchestration
- audit and trace review

That is why production deployments use Orlo Platform, while Open Core remains a portable package surface.
