---
title: "@orlo/runtime-adapters"
description: Reusable runtime adapters
---

# `@orlo/runtime-adapters`

Use `@orlo/runtime-adapters` for reusable model transport implementations.

## Included adapters

- OpenAI-compatible
- Anthropic
- vLLM
- llama.cpp

## Design rule

Adapters accept injected dependencies. They do not own credential storage, org management, or routing policy.
