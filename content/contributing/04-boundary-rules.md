---
title: Boundary Rules
description: Keep Open Core and Platform responsibilities separate
order: 4
---

# Boundary Rules

## Open Core must not depend on

- platform API modules
- background job modules
- database migrations
- platform persistence
- platform retrieval orchestration

## Why

The value of Open Core depends on keeping it reusable, understandable, and honest about what it includes.
