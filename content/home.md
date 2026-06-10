---
title: Orlo Documentation
description: Documentation for Orlo, the control plane for domain intelligence
---

# Orlo Documentation

**Prove your AI works. Keep it working.**

Orlo is the **control plane for domain intelligence**: the operating system that turns model choice, retrieval, validation, guardrails, approvals, monitoring, and feedback into an auditable production loop.

It gives teams one place to evaluate models on their own data, deploy the right model for each task, validate live outputs, govern agent and tool actions, and turn traces and feedback into better future evaluations.

It is built for domain AI that has consequences: fraud triage, support classification, policy Q&A, contract review, claims processing, compliance workflows, public services, and other tasks where a bad answer, stale source, weak approval path, or unreviewed action can create real operational risk.

## The Orlo Loop

Orlo is organized around a continuous operating loop:

| Stage | What Orlo Does | What You Get |
| --- | --- | --- |
| Define | Capture the task, schema, prompt, validation rules, owner, and context | A versioned unit of domain work |
| Evaluate | Test candidate models, prompts, retrieval strategies, and rubrics on task data | Evidence with uncertainty, not guesses |
| Deploy | Freeze the winning model, task version, and strategy into a live endpoint | A reproducible production snapshot |
| Govern | Validate outputs, route safely, ground answers, gate agent actions, and require approval when needed | Runtime control on the decision path |
| Observe | Inspect logs, traces, retrieval attribution, approvals, drift signals, and feedback pressure | Operational visibility and audit evidence |
| Improve | Promote reviewed corrections and trace samples back into datasets | A loop that gets sharper from production |

That loop is the product. Guardrails are one part of it. Orlo is broader: it is the operating layer between models, applications, retrieval, tools, and the teams accountable for AI outcomes.

## Start With Your Goal

### I run the AI platform

Start with [Platform Overview](/guides/platform/platform-overview), [Dashboard Surfaces](/guides/platform/dashboard), and [Platform API](/platform-api). Orlo gives platform teams a shared control plane for tasks, evaluations, deployments, inference, retrieval, monitoring, credentials, API keys, and governed agent steps.

### I own a domain workflow

Start with [Platform Quickstarts](/guides/platform/quickstarts). Orlo helps domain teams prove which model works for a task, deploy it behind controls, inspect live evidence, and turn corrections into better future evaluations.

### I own risk, compliance, or oversight

Start with [Governance](/governance). It explains how risk, compliance, security, platform, audit, and business teams use Orlo to turn policy into controls and evidence.

### I want to see Orlo work quickly

Start with [Getting Started](/guides/getting-started), then run one of the [Platform Quickstarts](/guides/platform/quickstarts).

### I need the managed product surface

Start with [Platform Overview](/guides/platform/platform-overview). It explains the API, dashboard, evaluation loop, monitoring, approvals, feedback, and agent-governance surfaces.

### I want reusable open-core packages

Start with [Open Core](/guides/open-core) and [Packages](/packages). These cover validation, runtime adapters, Studio Web Components, and the agent SDK.

### I am integrating against the API

Start with [Platform API](/platform-api), then use the endpoint pages for tasks, datasets, evaluations, deployments, inference, feedback, documents, routing, credentials, monitoring, and agent governance.

## Product Surfaces

Orlo has two connected surfaces:

- **Orlo Open Core** gives developers reusable building blocks: validation, runtime adapters, Studio components, shared contracts, and the agent SDK.
- **Orlo Platform** gives organizations the full operating system: task and dataset management, evaluation, deployment, governed inference, retrieval attribution, feedback promotion, agent governance, monitoring, gateway-backed access, and dashboard workflows.

Use Open Core when you want primitives. Use Orlo Platform when you need the full production loop.

## What Orlo Is Not

Orlo is not a chatbot platform, prompt manager, generic LLM gateway, workflow orchestrator, fine-tuning platform, or agent runtime.

Gateways proxy requests. Orlo evaluates, routes, validates, governs, observes, and improves domain AI systems in production.

## Key Concepts

- **Task**: the unit of domain work.
- **Task Version**: a reproducible snapshot of schema, prompt, and validation behavior.
- **Dataset**: labeled examples or reviewed traces used for evaluation.
- **Evaluation**: budget-bounded model comparison with uncertainty-aware results.
- **Deployment**: a frozen binding of task version, model, and strategy.
- **Inference**: governed execution through the Orlo runtime path.
- **Feedback**: reviewed corrections that can become future evaluation data.
- **Agent Session**: a governed sequence of agent steps, tool decisions, approvals, and trace evidence.

:::info
Orlo Platform APIs are served through the hosted gateway at `api.useorlo.com`.
:::
