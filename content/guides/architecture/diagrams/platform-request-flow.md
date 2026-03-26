---
title: Platform Request Flow
description: High-level request flow through Orlo Platform
order: 2
---

# Platform Request Flow

This diagram shows the public request boundary for Orlo Platform.

```mermaid
flowchart LR
    A["Applications and Integrations"] --> G["Auth Gateway"]
    B["Agent Runtimes"] --> G
    G --> C["Orlo Platform API<br/>api.useorlo.com"]

    C --> D["Evaluation and Deployment Control Plane"]
    C --> E["Inference and Validation Layer"]
    C --> F["Retrieval and Document Ingestion"]
    C --> H["Agent Governance Layer"]
```

## What this shows

- callers integrate through the gateway in front of `api.useorlo.com`
- Orlo relies on trusted upstream auth and org context
- Orlo then routes the request into the appropriate control-plane capability

## What this intentionally omits

- admin and internal-only routes
- queue names and worker topology
- persistence internals
- provider-specific routing internals

