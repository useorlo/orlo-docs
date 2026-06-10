---
title: Getting Started
description: Choose the fastest path into Orlo based on your goal
order: 1
---

# Getting Started

Start with the path that matches your job.

## I Want To Understand Orlo

Use this path if you are evaluating fit.

1. Read [What Is Orlo?](/guides/what-is-orlo)
2. Read [Who Orlo Is For](/guides/who-orlo-is-for)
3. Read [Platform Overview](/guides/platform/platform-overview)
4. Read [Open Core vs Platform](/guides/open-core-vs-platform)

By the end, you should know whether you need reusable primitives, the full platform, or neither.

## I Want To Run A Platform Workflow

Use this path if you want to see the full Orlo loop working end to end.

1. Read [Platform Overview](/guides/platform/platform-overview)
2. Run one of the [Platform Quickstarts](/guides/platform/quickstarts)
3. Read [Evaluation to Deployment Loop](/guides/platform/evaluation-to-deployment-loop)
4. Use [Platform API](/platform-api) when you need route-level detail

The core workflow is: task -> dataset -> evaluation -> deployment -> inference -> feedback.

## I Own Internal AI Governance

Use this path if your concern is responsible AI use, operational evidence, human oversight, or audit readiness.

1. Read [Governance](/governance)
2. Read [Internal AI Operating Model](/governance/internal-ai-operating-model)
3. Read [Operational Evidence](/governance/operational-evidence)
4. Read [Runtime Controls](/governance/runtime-controls)
5. Read [AI Act Readiness Evidence](/governance/ai-act-readiness-evidence)

This path explains how Orlo supports policy-to-control mapping without pretending to replace legal, risk, or compliance management systems.

## I Am Building With Open Core

Use this path if you want packages, SDKs, and reusable components.

1. Read [Open Core](/guides/open-core)
2. Read [Installation](/guides/installation)
3. Pick a package quickstart:
   - [Validation Quickstart](/guides/open-core/validation-quickstart)
   - [Runtime Adapters Quickstart](/guides/open-core/runtime-adapters-quickstart)
   - [Studio Quickstart](/guides/open-core/studio-quickstart)
   - [Agent SDK Quickstart](/guides/open-core/agent-sdk-quickstart)

Open Core is the low-friction way to understand and adopt Orlo primitives before committing to the full platform.

## I Am Integrating Against The Hosted API

Use this path if you are wiring Orlo into an application.

1. Read [Authentication and Org Model](/guides/platform/authentication-and-org-model)
2. Read [Platform API](/platform-api)
3. Start with these endpoint groups:
   - [Tasks](/platform-api/tasks)
   - [Datasets](/platform-api/datasets)
   - [Evaluations](/platform-api/evaluations)
   - [Deployments](/platform-api/deployments)
   - [Inference](/platform-api/inference)
   - [Feedback](/platform-api/feedback)

For agentic systems, also read [Agent Governance Overview](/guides/platform/agent-governance-overview) and [Agent Governance API](/platform-api/agent-governance).

## First 30 Minutes

The fastest product proof is:

1. Bring one domain task.
2. Bring 50 to 200 representative examples.
3. Evaluate two or more candidate models.
4. Deploy the best acceptable candidate.
5. Send one live request.
6. Inspect validation, routing, retrieval, and trace evidence.
7. Submit feedback and see how it can improve the next evaluation.

That is the Orlo loop in miniature.
