---
title: Boundary Rules
description: Keep Open Core and private Platform responsibilities separate
order: 4
---

# Boundary Rules

## Open Core must not depend on

- private API modules
- worker internals
- database migrations
- private control-plane persistence
- private retrieval orchestration

## Why

The value of Open Core depends on keeping it reusable, understandable, and honest about what it includes.
