---
title: Adoption
description: Adoption guidance for Orlo Open Core and Orlo Platform
---

# Adoption

Orlo can be adopted as open-core primitives, a managed platform, a hosted SaaS product, or a self-hosted/on-prem control plane. The right path depends on what the organization needs to prove and operate.

## The Main Adoption Question

Ask:

> Are we exploring Orlo's primitives, or do we need a shared operating system for production domain AI?

If you need a package, start with Open Core. If you need a repeatable operating model across teams, start with Orlo Platform.

## Choose Your Path

| Situation | Best Starting Point | Why |
| --- | --- | --- |
| One technical team wants validation or adapters | [Open Core](/guides/open-core) | Low-friction adoption inside an existing stack |
| A platform team is standardizing AI across teams | [Platform](/guides/platform) | Shared tasks, evaluations, deployments, monitoring, and governance |
| A domain team needs to prove a model works | [Platform Quickstarts](/guides/platform/quickstarts) | Task-first workflow without building an eval harness |
| Risk or compliance needs evidence | [Governance](/governance) | Policy-to-control mapping and operational proof |
| Agents can use tools or change state | [Agent Governance Overview](/guides/platform/agent-governance-overview) | Step-level policy, approvals, runtime limits, and traces |
| Data residency or sovereign deployment matters | [Platform Overview](/guides/platform/platform-overview) | Provider-agnostic and self-hostable operating model |

## Adoption Stages

### Stage 1: Prove Fit

Bring one task and representative examples.

- define the task
- upload a dataset
- evaluate two or more candidate models
- inspect confidence intervals and failure cases
- confirm whether Orlo's task model fits the workflow

### Stage 2: Prove Production Control

Deploy the best acceptable candidate behind Orlo.

- freeze task version and deployment configuration
- enable validation
- capture inference logs
- inspect routing and debug/audit metadata
- submit feedback and verify promotion flow

### Stage 3: Expand Across Teams

Move from one task to a shared operating model.

- create tenant/org structure
- issue scoped API keys
- define user roles and reviewer responsibilities
- standardize datasets, rubrics, routing policies, and validation patterns
- monitor feedback pressure, validation failure rates, latency, and cost

### Stage 4: Govern Agents And High-Risk Actions

Add step-level governance when agents can use tools, retrieve sensitive context, or change external state.

- create agent sessions
- define tool policies
- set runtime limits
- require approvals for high-risk actions
- promote reviewed traces into datasets
- score trajectories, not just final text

### Stage 5: Operational Assurance

Use Orlo as evidence infrastructure.

- review deployment snapshots
- inspect validation and retrieval attribution
- audit approval decisions
- monitor drift and circuit breakers
- export or sample traces for internal review
- feed incidents and corrections back into evaluation

## Read Next

- [When to Use Open Core](/guides/adoption/when-to-use-open-core)
- [When You Need Orlo Platform](/guides/adoption/when-you-need-orlo-platform)
- [Migration Path to Platform](/guides/adoption/migration-path-to-platform)
- [Governance](/governance)
