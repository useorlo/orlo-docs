---
title: Open Core Boundaries
description: What belongs in Orlo Open Core and what stays private
---

# Open Core Boundaries

Open Core is where Orlo exposes reusable primitives.

## Open Core includes

- contracts and types
- validation
- runtime adapters
- Studio components
- agent governance SDK

## Private Platform includes

- API control plane
- workers
- database schema and migrations
- retrieval orchestration
- feedback promotion internals
- persistent governance state

This boundary is deliberate. It keeps Open Core useful while preserving the platform’s operational and enterprise moat.
