---
title: "How do I reduce repetitive approvals without granting broad access?"
description: "Use typed argument conditions, independent review, and explicit permission eligibility."
sidebar_title: "Measured permissions"
order: 2
---

# How do I reduce repetitive approvals without granting broad access?

Create a task-scoped permission band for a named tool and typed argument conditions. Start in **shadow** to compare the proposal with observed calls, then move to **earning**. An authorized member can enable one configuration only after its independent review evidence meets the thresholds. Until then, calls continue to require approval.

*Who can do this: Agent permissions managers and admins configure bands. Reviewers assess independent samples. Runtime keys cannot enable or resume a band.*

For example, a refund permission can require an amount below a limit and an allowed currency. Conditions use exact types and field paths; missing or wrongly typed values require review. The strictest matching organization permission still applies.

## Cold start and shadow mode

A new band starts with no earned authority. Historical preview replays the proposed permission against up to 200 recorded tool requests. It does not execute tools or simulate run budgets. In shadow mode, new calls produce observations without changing the live decision. Editing a permission starts a new revision with new evidence.

Orlo selects an independent 20% random sample of eligible observed calls, including calls already permitted. Reviewers assess the action without seeing the original decision. Ordinary approvals and successful execution reports do not substitute for these judgments. [Review an independent sample](/console/agent-runs/independent-review).

## Read eligibility before enabling

Open **View evidence and status** on the permission. Evidence is scoped to the task version, permissions, declared model and application revision, shared skills, environment, action class, and risk. The application declares its model and runtime revision when starting the run; Orlo does not independently attest which external model executed.

The initial policy requires an agreement lower bound of at least 95%, a potential-harm upper bound of at most 1%, at least 100 independent reviews, and 90% usable coverage. Evidence must be fresh within one day. The confidence bounds can require far more than 100 reviews: a conservative 1% harm bound can need tens of thousands even with no harmful judgments. Missing reviews do not count as agreement or harmlessness.

These are frequentist confidence bounds, not Bayesian probabilities of safety. The bounds permit repeated inspection under the sampling and labeling assumptions. A separate deterioration detector can suspend eligibility; it cannot grant it. These measurements describe reviewed calls, not a guarantee about future actions or reviewer correctness.

![Permission evidence card showing the agreement, potential-harm, and review-coverage requirements](./assets/images/console/permission-evidence.jpg)

*An early evidence card shows what is missing before a person can enable automatic permission.*

[Read the confidence bounds](/console/agent-runs/confidence-bounds). For integration, [declare the model and application revision](/engineers/permission-context) when starting each run.

## What happens after enabling?

Enablement requires an authorized member, the selected configuration, and a recorded reason. An agent key cannot enable or resume a band. Calls outside the conditions, missing facts, or unfamiliar configurations return to approval instead of inheriting another configuration’s evidence.

Changed configuration, stale or delayed evidence, or deterioration suspends automatic permission, including for existing runs. Investigation and an explicit member action are required to resume. Retirement ends automatic permission while keeping the action reviewable. One-call human approvals remain separate and bound to the exact arguments. Calls already dispatched before a suspension cannot be recalled.

## Related questions

- [What happens before a permission has enough evidence?](/console/agent-runs/permission-cold-start)
- [Why did automatic permission pause?](/console/agent-runs/permission-paused)
