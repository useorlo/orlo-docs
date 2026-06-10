---
title: Monitoring
description: Dashboard monitoring for quality, drift, validation, and runtime health
---

# Monitoring

Monitoring shows whether deployed AI systems are behaving acceptably after they go live.

Orlo monitoring is focused on the AI control plane. It complements infrastructure logging and tracing; it does not replace them.

## Who Uses It

- platform and ML teams watching runtime behavior
- reliability teams checking operational health
- risk teams looking for review pressure or drift
- domain owners watching failure patterns

## What It Shows

Monitoring can surface:

- validation failure rates
- inference volume and latency
- routing and fallback behavior
- circuit-breaker state
- retrieval or attribution issues
- judge drift and evaluation drift signals
- feedback volume and correction patterns
- task or deployment health

## Why It Matters

An AI system can pass a launch evaluation and still degrade in production.

Monitoring helps teams see when production evidence no longer matches the launch assumption.
