---
title: What Is Orlo?
description: High-level overview of Orlo Open Core and Orlo Platform
order: 1
---

# What Is Orlo?

Orlo is a **governed AI platform** built around a simple question:

> Will this AI system work for our task, and can we operate it safely in production?

Orlo answers that question with a combination of:

- evaluation
- deterministic validation
- deployment controls
- retrieval and attribution
- feedback-driven improvement
- agent-step governance

## Orlo Open Core

Open Core exposes reusable building blocks:

- `@orlo/shared`
- `@orlo/validation`
- `@orlo/runtime-adapters`
- `@orlo/agent-sdk`
- `@orlo/studio`

These are useful to developers, ML engineers, and platform teams building on Orlo concepts.

## Orlo Platform

Orlo Platform is the full managed platform:

- task and dataset management
- evaluation and recommendation
- deployment and inference
- retrieval and document ingestion
- feedback promotion
- agent governance APIs

This is the surface for teams that want the full evaluation, deployment, and governance loop in one system.

## What Orlo Is Not

- not a general-purpose agent runtime
- not a workflow orchestrator
- not just an LLM gateway
- not only a prompt management tool

Orlo is strongest in the governed middle layer between model providers and production use cases.
