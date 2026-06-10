---
title: What Is Orlo?
description: Orlo's role as the control plane for domain intelligence
order: 1
---

# What Is Orlo?

Orlo is the **control plane for domain intelligence**: the operating system that turns model choice, retrieval, validation, guardrails, approvals, monitoring, and feedback into an auditable production loop.

It sits between applications, model providers, retrieval systems, tools, and the teams accountable for AI outcomes. Its job is to help organizations prove which AI configuration works for a domain task, deploy it safely, govern what happens at runtime, and improve the system from real feedback.

The shortest version:

> Orlo helps teams prove their AI works, keep it working, and show the operational evidence behind both.

## The Problem Orlo Solves

Teams adopting AI for real operational work face the same questions:

- Which model actually works best for this task?
- Are the results measured on our data or on generic benchmarks?
- If two models are close, is the difference real or noise?
- What exact prompt, model, validation rules, and retrieval settings were live when a decision happened?
- Is every production response checked before it reaches a user?
- Which documents or sources supported the answer?
- If an agent wants to call a tool or change state, is that allowed?
- Who approved sensitive actions?
- Can risk, compliance, audit, or operations review the evidence later?

Orlo exists because these questions are not solved by a model endpoint, a prompt tool, a dashboard, or an eval script by itself.

## The Orlo Loop

Orlo organizes production domain AI as a loop:

```text
Define -> Evaluate -> Deploy -> Govern -> Observe -> Improve
```

Each stage creates evidence for the next one.

| Stage | Purpose |
| --- | --- |
| Define | Turn a workflow into a versioned task with schemas, prompts, validation, and ownership |
| Evaluate | Compare candidate models and strategies on task data with budget and uncertainty controls |
| Deploy | Freeze a model, task version, routing strategy, and validation policy into a reproducible endpoint |
| Govern | Validate outputs, route safely, retrieve grounded context, gate tool actions, and require approvals |
| Observe | Review logs, traces, retrieval attribution, monitoring signals, approvals, and feedback |
| Improve | Promote reviewed corrections and trace samples into future evaluation datasets |

This is the core product model. Everything in Orlo should make one part of this loop more reliable.

## What Orlo Owns

Orlo owns the control-plane layer:

- task definition and versioning
- domain datasets
- evaluations and recommendations
- deployment snapshots
- runtime routing and fallback
- deterministic validation
- retrieval and attribution
- feedback staging and promotion
- agent step governance
- approvals, runtime limits, containment signals, and trace evidence
- monitoring surfaces and audit-ready operational records

Orlo can work with external model providers, self-hosted models, retrieval corpora, existing applications, and external agent frameworks.

## What Orlo Does Not Own

Orlo is not:

- a chatbot platform
- a general-purpose LLM gateway
- a prompt management tool
- a model provider
- a fine-tuning platform
- a workflow orchestrator
- an agent runtime
- a compliance management system

For agents, Orlo governs consequential steps. It does not plan the workflow or replace the runtime.

For compliance, Orlo produces runtime evidence. It does not replace legal classification, risk registers, formal sign-off, or regulatory filings.

## Open Core And Platform

Orlo has two connected surfaces.

### Orlo Open Core

Open Core provides reusable building blocks:

- `@orlo/shared`
- `@orlo/validation`
- `@orlo/runtime-adapters`
- `@orlo/agent-sdk`
- `@orlo/studio`

Use Open Core when you want to adopt Orlo's primitives inside your own engineering stack.

### Orlo Platform

Orlo Platform is the full managed control plane:

- tasks and datasets
- evaluations and recommendations
- deployments and inference
- retrieval and document ingestion
- feedback promotion
- monitoring and traces
- credentials, API keys, users, and org context
- agent sessions, tool policies, runtime limits, approvals, and trajectory evidence

Use Orlo Platform when you need one operating system for multiple teams, models, providers, and production AI tasks.

## Where Orlo Is Strongest

Orlo is strongest when AI is used for structured domain work:

- classification
- extraction
- scoring
- grounded Q&A
- triage
- document review
- policy interpretation
- agent/tool action governance

It is especially useful when the cost of a bad answer is not trivial and the organization needs evidence that the system was tested, governed, and improved.
