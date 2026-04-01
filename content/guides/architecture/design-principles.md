---
title: Design Principles
description: Core design principles behind Orlo
---

# Design Principles

## Govern, do not orchestrate

Orlo governs meaningful steps. It does not aim to become a general-purpose workflow engine.

## Anchor to the production decision path

Orlo is designed for the operational surface where model output meets consequence: inference, retrieval, deployment, feedback, and agent-step decisions.

## Consequence before capability

A system that works in staging can still fail badly in production. Orlo is designed to make those failure modes visible before they become expensive, unsafe, or hard to unwind.

## Deterministic where possible

Validation and control logic should be deterministic and auditable.

## Keep the boundary honest

Public packages should stay reusable and free of platform-specific coupling.

## Fast gate, deep audit

Hot-path governance must stay bounded in latency. Richer auditing and history can go deeper without blocking the execution path.
