---
title: Open Core vs Platform
description: High-level architecture boundary between Orlo Open Core and Orlo Platform
order: 1
---

# Open Core vs Platform

This diagram shows the high-level relationship between Open Core and Orlo Platform.

```mermaid
flowchart TB
    subgraph OC["Orlo Open Core"]
        OC1["@orlo/shared"]
        OC2["@orlo/validation"]
        OC3["@orlo/runtime-adapters"]
        OC4["@orlo/agent-sdk"]
        OC5["Orlo Studio Components"]
    end

    subgraph PL["Orlo Platform"]
        PL1["Tenant-facing API"]
        PL2["Evaluation and Deployment Control Plane"]
        PL3["Inference and Validation Layer"]
        PL4["Retrieval and Document Ingestion"]
        PL5["Feedback Promotion"]
        PL6["Agent Governance Persistence"]
    end

    OC --> PL
```

## What this shows

- Open Core provides reusable packages and UI surfaces.
- Orlo Platform is the managed system that turns those primitives into a multi-tenant governed product.
- The public packages are designed to complement the platform, not replace the full control plane.
