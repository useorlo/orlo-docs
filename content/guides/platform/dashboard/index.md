---
title: Dashboard Surfaces
description: The Orlo Platform dashboard pages and who uses each one
---

# Dashboard Surfaces

The Orlo dashboard is the human operating surface for the control plane.

The API is how applications integrate with Orlo. The dashboard is how platform teams, domain owners, reviewers, administrators, and governance stakeholders understand what is live, what changed, what needs review, and what evidence exists.

## Surfaces

| Surface | Primary Users | What It Helps Answer |
| --- | --- | --- |
| [Mission Control](/guides/platform/dashboard/mission-control) | Platform leaders, AI owners, operators | What is live, healthy, failing, or waiting for review? |
| [Monitoring](/guides/platform/dashboard/monitoring) | Platform, ML, reliability, risk | Are quality, drift, validation, and runtime signals visible? |
| [Approvals](/guides/platform/dashboard/approvals) | Reviewers, risk, compliance, business owners | Which sensitive actions need human oversight? |
| [Sessions](/guides/platform/dashboard/sessions) | Agent owners, platform, audit | What did the agent do step by step? |
| [Feedback](/guides/platform/dashboard/feedback) | Domain reviewers, operations, ML teams | Which corrections should improve future evaluations? |
| [Credentials](/guides/platform/dashboard/credentials) | Admins, security, platform | Which provider and storage credentials are available to the org? |
| [API Keys](/guides/platform/dashboard/api-keys) | Developers, platform, security | Which integrations can call Orlo, under what scope? |
| [Users](/guides/platform/dashboard/users) | Admins, platform, governance leads | Who can operate, review, and administer Orlo? |

## Why The Dashboard Matters

Many AI tools expose an API and leave accountability to the application team. Orlo exposes the API and the operating surface around it.

That matters because responsible production AI needs more than a successful response. Teams need to see:

- which tasks and deployments are active
- which evaluations justified a model choice
- which requests failed validation
- which agent actions required approval
- which feedback items should become future test data
- which credentials and API keys can reach the system
- which users can review or administer the workflow

The dashboard turns those operational facts into a shared workspace.
