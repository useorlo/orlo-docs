---
title: Agent Governance Overview
description: How Orlo Platform governs agent steps without becoming the runtime
---

# Agent Governance Overview

Orlo governs agentic execution **step by step** without becoming an agent runtime.

## What Orlo governs

- agent sessions
- governed step envelopes
- tool permission checks
- runtime limits
- approvals
- event timelines and live event streams
- trace samples and trace review
- trajectory results and step-level path metrics

## What Orlo returns

At the API layer, Orlo can return:

- policy decisions for individual steps
- approval requirements and timeout behavior
- citations and retrieval evidence
- state change evidence
- session-level trajectory results
- step-level trajectory metrics

## Why this matters

This lets teams do more than validate final text. They can review whether an agent:

- used the right tools
- respected approval boundaries
- changed state safely
- retrieved relevant context
- followed an acceptable path to the outcome

## Scope boundaries

Orlo does not own:

- planning loops
- workflow orchestration
- long-lived agent memory systems
- general-purpose tool execution runtime

## Adoption model

The most important developer surface is the SDK and adapter layer, but the machine interface remains the Platform API.
