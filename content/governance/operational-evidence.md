---
title: Operational Evidence
description: What proof Orlo creates for governed AI systems
---

# Operational Evidence

Static AI policy says what should happen. Operational evidence shows what happened.

Orlo is built to create evidence at each stage of the AI production loop: definition, evaluation, deployment, runtime control, observation, and improvement.

## Evidence Types

| Evidence | What It Shows |
| --- | --- |
| Task definition | The intended AI job, owner, schema, prompt, validation behavior, and domain context |
| Task version | The exact task configuration bound to evaluations and deployments |
| Dataset | The examples or reviewed traces used to test quality |
| Evaluation result | How candidate models, prompts, and strategies performed on task data |
| Recommendation | Which option was selected and how much confidence the comparison supports |
| Deployment snapshot | The frozen task version, model, strategy, validation policy, and runtime configuration |
| Inference record | What was requested, how it was routed, what output was produced, and what checks ran |
| Retrieval attribution | Which documents, chunks, or sources supported a grounded answer |
| Approval record | Which action required review, who approved it, and when |
| Agent session | The sequence of governed steps, tool decisions, limits, and trajectory evidence |
| Feedback item | What users or reviewers corrected and whether it became future evaluation data |
| Monitoring signal | Trends, drift, failures, review pressure, latency, and quality signals |

## Why This Matters

Evidence lets teams answer practical governance questions:

- Was this AI task approved for production?
- Which model and prompt were live at the time?
- Was the response checked before use?
- Was the answer grounded in approved material?
- Did an agent request a sensitive action?
- Was approval required, granted, denied, or timed out?
- Did feedback lead to a better future evaluation?
- Can an auditor reconstruct the decision path later?

## Evidence Is Not Certification

Orlo does not certify a system as compliant. It also does not replace:

- legal classification
- risk registers
- policy registers
- remediation task management
- procurement review
- DPIA or FRIA workflows
- audit-pack sign-off
- regulatory filings

Those systems still matter. Orlo makes them stronger by supplying runtime facts instead of screenshots, claims, and one-time assessment artifacts.

## Practical Output

A useful Orlo evidence pack usually includes:

- the approved task and owner
- the evaluated model candidates and result
- the active deployment snapshot
- validation and routing behavior
- retrieval attribution for grounded tasks
- approval history for sensitive actions
- representative traces
- feedback and issue history
- monitoring trend summaries

The pack should be reviewable by business, risk, compliance, security, legal, and audit teams without requiring them to inspect application code.
