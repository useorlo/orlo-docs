---
title: Evaluation to Deployment Loop
description: How tasks move from definition to live deployment in Orlo Platform
---

# Evaluation to Deployment Loop

The Orlo Platform loop is:

1. create a task
2. upload a dataset
3. run an evaluation
4. review the recommendation
5. create and activate a deployment
6. send inference traffic
7. collect feedback and improve

## Task versioning

Tasks are mutable heads with immutable task versions behind them. Deployments and evaluations bind to task versions for reproducibility.

## Evaluation posture

Evaluations are async and budget-bounded. The result surface is uncertainty-aware: if two models are statistically too close to call, Orlo says so.

## Deployment posture

Deployments freeze the task version, model, and strategy into a reproducible snapshot. Activation switches the active deployment for a task.
