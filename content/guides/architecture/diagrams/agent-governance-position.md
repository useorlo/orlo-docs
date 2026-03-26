---
title: Agent Governance Position
description: Where Orlo sits in a governed agent architecture
order: 4
---

# Agent Governance Position

Orlo does not own the agent runtime. It governs consequential steps around it.

```mermaid
flowchart LR
    A["Agent Runtime"] --> B["Models"]
    A --> C["Tools"]
    A --> D["External Services"]

    A -. "governed steps" .-> E["Orlo Governance Layer"]
    E --> F["Policy Checks"]
    E --> G["Validation"]
    E --> H["Approvals"]
    E --> I["Audit and Trace"]
```

## What this shows

- the agent runtime still plans and executes
- Orlo governs meaningful step boundaries
- governance covers policy, validation, approvals, and auditability

## Why this matters

This shows Orlo’s role in an agentic system:

- not a workflow runtime
- not a general-purpose agent orchestrator
- a governance and control layer for production AI behavior
