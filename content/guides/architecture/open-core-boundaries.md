---
title: Open Core Boundaries
description: What belongs in Orlo Open Core and what belongs to Orlo Platform
---

# Open Core Boundaries

Open Core is where Orlo exposes reusable primitives.

## Open Core includes

- contracts and types
- validation
- runtime adapters
- Studio components
- agent governance SDK

## Orlo Platform includes

- API control plane
- workers
- database schema and migrations
- retrieval orchestration
- feedback promotion services
- persistent governance state

This boundary keeps Open Core easy to adopt while leaving the managed platform responsible for long-lived system behavior and operations.
