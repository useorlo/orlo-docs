---
title: "Orlo documentation"
description: "Test AI against your team’s standard, check production answers, and decide which agent actions may proceed."
---

# Orlo documentation

Orlo connects model comparisons, task releases, agent permissions, shared instructions, and the evidence from production. Your team defines the expected work, checks what happened, and uses reviewed examples to improve the next release.

## Put your team’s rules into production

**Run a task through Orlo.** Send an input and receive a complete answer checked against the task’s rules. Orlo handles release selection, source retrieval when needed, the model request, and configured fallback behavior.

**Connect an agent in your runtime.** Keep your model, provider, and native stream. Orlo checks proposed tool actions before they run, and records the submitted work for review.

[See how both paths work, with diagrams](/start/how-orlo-works).

## Choose your first result

:::cards
- [Test an AI task](/start/first-task) Start with a built-in example, compare models, and send a request to a release.
- [Connect an agent](/start/first-agent) Run a harmless tool through the SDK and inspect its permission decision.
- [Use shared skills](/start/team-skills) Retrieve your team’s published instructions in an AI app under your own sign-in.
:::

New here? [Create an account or accept an invitation](/start/sign-up-and-keys). If you have work waiting, [start with review](/start/review-work).

## How the work connects

| Work | What Orlo records | Where to start |
| --- | --- | --- |
| Define a task | Versioned instructions, answer rules, examples, and pinned skills | [Tasks](/console/tasks/the-standard) |
| Compare and release | Candidate answers, scores, uncertainty, and the version selected for requests | [Compare and release](/console/tasks/compare-and-release) |
| Check production answers | Rule results, model, release, and retrieved passages for each logged request | [Live answers](/console/tasks/live-answers-and-corrections) |
| Set agent permissions | Submitted steps, permission decisions, limits, and human approvals | [Agent runs](/console/agent-runs/agent-rules) |
| Share instructions | Published skill versions, where they are pinned, and app retrievals | [Skills](/console/skills/shared-skills) |
| Improve from production | Reviewed corrections and saved steps in a new dataset version | [Review to release](/console/tasks/improve-from-production) |

## Find a guide

[Find a direct answer to your question](/start/find-an-answer), including setup, permissions, failure behavior, and recovery.

- [Console](/console): tasks, skills, agent runs, review, and settings.
- [Integrate](/engineers): task API, SDKs, and shared skills in applications.
- [API reference](/platform-api): request fields, responses, permissions, and errors.
- [Evidence and governance](/governance): records, responsibilities, and review.
- [Operate](/operators): deployment, backups, upgrades, and recovery.
- [Open source](/open-source): public SDK source and verified releases.

## Addresses

| Surface | Address |
| --- | --- |
| Console | [app.useorlo.com](https://app.useorlo.com) |
| API | `https://api.useorlo.com` |
| Documentation | [docs.useorlo.com](https://docs.useorlo.com) |
| Website | [useorlo.com](https://useorlo.com) |
