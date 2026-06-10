---
title: Platform Overview
description: Understand the full Orlo Platform product surface
---

# Platform Overview

Orlo Platform is where Orlo becomes an operational system, not just a set of packages.

It is the managed control plane teams use when AI is on a production decision path and the organization needs proof that the system was evaluated, deployed, governed, observed, and improved.

## When To Use Orlo Platform

Use Orlo Platform when:

- multiple teams are adopting AI and need one shared operating model
- model choice must be justified on task data
- production responses need deterministic validation
- retrieval quality and source attribution matter
- feedback should improve future evaluations
- agent tool actions need policy, approvals, limits, and trace evidence
- risk, compliance, security, or audit need reviewable evidence
- the system must run with tenant isolation, scoped access, and credential boundaries

## Core Loop

```text
Define -> Evaluate -> Deploy -> Govern -> Observe -> Improve
```

| Loop Stage | Platform Capability |
| --- | --- |
| Define | Tasks, task versions, schemas, prompts, validation rules, owners |
| Evaluate | Datasets, rubrics, candidate models, scoring, confidence intervals, budget controls |
| Deploy | Deployment snapshots, activation, routing policies, fallback behavior |
| Govern | Inference validation, retrieval attribution, routing metadata, agent step governance, approvals |
| Observe | Mission Control, monitoring, inference logs, trace samples, trajectory scores, circuit breakers |
| Improve | Feedback staging, correction review, trace promotion, dataset promotion, re-evaluation |

## Product Surfaces

### Dashboard

The hosted dashboard is the operator surface for Orlo Platform.

It gives teams pages for:

- [Mission Control](/guides/platform/dashboard/mission-control)
- Tasks
- Datasets
- Evaluations
- Deployments
- [Monitoring](/guides/platform/dashboard/monitoring)
- [Agent Sessions](/guides/platform/dashboard/sessions)
- [Approvals](/guides/platform/dashboard/approvals)
- [Feedback](/guides/platform/dashboard/feedback)
- [Credentials](/guides/platform/dashboard/credentials)
- [API Keys](/guides/platform/dashboard/api-keys)
- [Users](/guides/platform/dashboard/users)

The dashboard is not just a demo UI. It is the shared workspace for platform owners, domain leads, reviewers, and administrators.

Read [Dashboard Surfaces](/guides/platform/dashboard) for the user-facing role of each page.

### Platform API

The Platform API is the machine interface for applications, integrations, SDKs, and hosted dashboard flows.

It covers:

- task and dataset management
- evaluations and deployments
- task-native and OpenAI-compatible inference
- feedback and promotion
- document ingestion and retrieval-backed inference
- credentials, models, adapters, org config, routing policies, and rubrics
- monitoring and agent governance

Start with [Platform API](/platform-api).

### Gateway

The hosted gateway is the public boundary for Orlo Platform.

It owns:

- hosted authentication and sessions
- tenant and account context
- API key issuance, rotation, revocation, scopes, and rate limits
- RBAC and entitlement checks
- dashboard BFF and proxy behavior
- gateway audit and request logs
- licensing for hosted and on-prem deployments

The control plane remains focused on Orlo product behavior: tasks, evaluations, deployments, inference, retrieval, feedback, credentials, and agent governance.

### Workers

Longer-running work happens asynchronously:

- evaluation jobs
- document processing
- embedding and retrieval preparation
- scoring and statistics
- log/archive workflows
- monitoring and drift-related jobs

This keeps the runtime path bounded while still supporting deeper evidence and analysis.

## What Platform Adds Beyond Open Core

Open Core gives reusable primitives. Platform adds the operating system around them:

- tenant isolation and org-scoped persistence
- gateway-backed access and API key management
- task, dataset, evaluation, deployment, and feedback state
- async workers and operational workflows
- dashboard surfaces for operators and reviewers
- deployment snapshots and inference logs
- retrieval orchestration and attribution
- agent governance persistence, approvals, limits, trace samples, and trajectory scoring
- monitoring surfaces and evidence exports

## Primary Integration Surface

The hosted API is served through `https://api.useorlo.com`.

Start with:

- [Platform Quickstarts](/guides/platform/quickstarts)
- [Dashboard Surfaces](/guides/platform/dashboard)
- [Authentication and Org Model](/guides/platform/authentication-and-org-model)
- [Platform API](/platform-api)

For responsible internal AI use and compliance evidence, also read [Governance](/governance).
