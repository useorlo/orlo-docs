---
title: Evaluation to Deployment Loop
description: Conceptual flow from task definition to deployed governed inference
order: 3
---

# Evaluation to Deployment Loop

This is the core product loop behind Orlo Platform.

```mermaid
flowchart LR
    A["Define Task"] --> B["Upload Dataset"]
    B --> C["Run Evaluation"]
    C --> D["Compare Models"]
    D --> E["Create Deployment"]
    E --> F["Activate Deployment"]
    F --> G["Serve Governed Inference"]
    G --> H["Collect Feedback"]
    H --> I["Promote Corrections"]
    I --> B
```

## What this shows

- Orlo is designed as a closed improvement loop, not just a single inference endpoint
- evaluation informs deployment
- feedback and promotion feed future dataset versions

## Why this is safe to publish

It communicates the product shape without revealing the statistical or orchestration internals that make the loop work.

