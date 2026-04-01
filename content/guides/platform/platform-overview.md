---
title: Platform Overview
description: Understand the full Orlo Platform
---

# Platform Overview

Orlo Platform is where Orlo becomes an operational system, not just a set of packages.

It is the governed layer you put on the production decision path when:

- the data changes every day
- model behavior can drift under real traffic
- retrieval quality matters to the answer
- a bad write or bad approval can create a real-world consequence

## Core loop

```text
Define → Evaluate → Deploy → Observe → Improve
```

## The operational surface

Orlo Platform covers the full production path:

- **before production** — define tasks, version schemas and prompts, upload datasets, compare models
- **during production** — route inference, validate outputs, retrieve grounded context, and govern agent steps
- **after production** — review traces, stage feedback, promote corrections, and score trajectories

## What the Platform adds beyond Open Core

- tenant isolation
- persistent task, dataset, evaluation, deployment, and agent-governance state
- async workers for evaluation and document processing
- governed inference with live routing metadata
- retrieval orchestration
- feedback promotion
- trace review and trace-to-dataset promotion
- agent-governance persistence, approvals, and trajectory scoring

## Primary integration surface

The main integration surface is the Platform API at `https://api.useorlo.com`.

Start with:

- [Platform Quickstarts](/guides/platform/quickstarts)
- [Authentication and Org Model](/guides/platform/authentication-and-org-model)
- [Platform API](/platform-api)
