---
title: Agent Governance Overview
description: How Orlo Platform governs agent steps without becoming the runtime
---

# Agent Governance Overview

Orlo governs agentic execution **step by step** without becoming an agent runtime.

## What Orlo governs

- agent sessions
- governed steps
- tool permission checks
- runtime limits
- approvals
- trajectory events and traces

## Scope boundaries

- planning loops
- workflow orchestration
- long-lived agent memory systems
- general-purpose tool execution runtime

## Adoption model

The most important developer surface is the SDK and adapter layer, but the machine interface remains the Platform API.
