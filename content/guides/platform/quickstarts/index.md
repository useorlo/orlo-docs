---
title: Platform Quickstarts
description: Fast-start walkthroughs that show the Orlo production loop and the proof it creates
order: 1
---

# Platform Quickstarts

These walkthroughs are the fastest way to see Orlo Platform working end to end.

Each guide shows a production pattern and the evidence Orlo creates:

| Quickstart | Best For | Proof Created |
| --- | --- | --- |
| [Fraud Triage Quickstart](/guides/platform/quickstarts/fraud-triage) | Risk operations, fintech, trust and safety | Evaluation result, deployment snapshot, validation, debug/audit output, feedback correction |
| [Support Classification Quickstart](/guides/platform/quickstarts/support-classification) | Support operations and customer experience | Task version, model comparison, routing output, validation, feedback loop |
| [Document Summarization Quickstart](/guides/platform/quickstarts/document-summarization) | Legal ops, procurement, policy review | Structured extraction, evaluated model choice, deployment snapshot, reviewer correction |
| [Agent Governance Quickstart](/guides/platform/quickstarts/agent-governance) | Agentic systems with tools or state changes | Tool policy decision, approval request, session timeline, trace sample |
| [Internal AI Governance Quickstart](/guides/platform/quickstarts/internal-ai-governance) | Risk, compliance, security, platform teams | Policy-to-control map, evidence pack, oversight workflow |

The task quickstarts walk through the same loop:

1. create a task
2. upload a labeled dataset
3. choose candidate models
4. run an evaluation
5. deploy the winner
6. send a live request
7. capture feedback when needed

The governance quickstarts show how that loop becomes reviewable by risk, compliance, security, platform, audit, and business owners.

## Before you start

Have these ready:

- an Orlo org ID
- access to `https://api.useorlo.com`
- at least one model provider credential configured for your org

If you prefer runnable requests over copy-paste examples, use the tenant Postman collection alongside these guides.
