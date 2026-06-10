---
title: When You Need Orlo Platform
description: Signals that you need the full Orlo Platform rather than only Open Core
---

# When You Need Orlo Platform

Open Core is useful when you need primitives. Orlo Platform is useful when you need an operating system.

Use Orlo Platform when the organization needs to answer:

- which AI tasks are running
- which model was selected for each task
- what evidence justified that selection
- which prompt, schema, validation, routing, and retrieval settings were live
- whether production outputs are being checked
- which documents supported grounded answers
- what feedback changed future evaluations
- whether agent tool actions were allowed, blocked, approved, or contained
- who can review, approve, administer, or operate the system

## Strong Signals

You likely need Orlo Platform when:

- more than one team is building AI into production workflows
- domain teams do not have ML engineers but still need model evaluation
- regulated or high-consequence work requires audit evidence
- model choice must remain provider-agnostic
- retrieval-backed answers need source attribution
- production feedback should become governed evaluation data
- agent workflows need tool policy, approvals, runtime limits, or trace review
- tenant isolation, credentials, API keys, roles, and monitoring matter
- on-prem, sovereign, or customer-controlled deployment is part of the strategy

## What Platform Adds

| Need | Platform Capability |
| --- | --- |
| Shared operating model | Tasks, datasets, evaluations, deployments, monitoring |
| Production control | Deployment snapshots, validation, routing, fallback, inference logs |
| Runtime evidence | Debug/audit metadata, retrieval attribution, trace IDs, validation results |
| Improvement loop | Feedback staging, correction review, promotion, re-evaluation |
| Agent governance | Sessions, step governance, tool policies, approvals, limits, trace samples |
| Enterprise access | Gateway auth, API keys, scopes, users, org context, dashboard |
| Deployment flexibility | Hosted, self-hosted, and on-prem packaging patterns |

## When Open Core Is Enough

Open Core may be enough when:

- one team owns one workflow
- you already have your own control plane
- you only need validation or runtime adapters
- you do not need persistent evaluation/deployment state
- you do not need dashboard workflows, tenant isolation, approvals, or audit evidence

If you are building the same surrounding infrastructure yourself, that is the signal to evaluate Platform.
