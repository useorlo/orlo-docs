---
title: Feedback and Promotion
description: How corrections move through the Orlo feedback loop
---

# Feedback and Promotion

Orlo does not auto-inject corrections directly into production datasets.

## Feedback states

The feedback flow is governed:

- `pending`
- `staged`
- `rejected`
- `promoted`

## Why this matters

This keeps the improvement loop auditable and reduces the chance of poisoning datasets with malformed or low-quality corrections.

## Promotion outcome

When staged corrections are promoted, Orlo creates a new dataset version from those approved samples.
