---
title: Support Classification Quickstart
description: Build a support ticket routing workflow with Orlo Platform
---

# Support Classification Quickstart

This walkthrough mirrors the `Example: Support Classification` sample in the tenant Postman collection.

## Scenario

A support team wants to classify incoming tickets by category, urgency, and destination team before routing them to engineering, billing, product, customer success, or developer relations.

## What you will build

- a support routing task
- a labeled support dataset
- an evaluation across two models
- one active deployment
- one live ticket classification

## Step 1: Create the task

Create a task that accepts a support ticket and returns structured routing output.

```bash
curl https://api.useorlo.com/v1/tasks \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "name": "Support Ticket Router",
    "description": "Classify incoming support tickets by category, urgency, and assigned team.",
    "input_schema": {
      "type": "object",
      "properties": {
        "subject": { "type": "string" },
        "body": { "type": "string" },
        "customer_tier": { "type": "string", "enum": ["free", "pro", "enterprise"] }
      },
      "required": ["subject", "body"]
    },
    "output_schema": {
      "type": "object",
      "properties": {
        "category": { "type": "string", "enum": ["billing", "bug_report", "feature_request", "account_access", "integration", "onboarding"] },
        "urgency": { "type": "string", "enum": ["critical", "high", "medium", "low"] },
        "team": { "type": "string", "enum": ["billing_ops", "engineering", "product", "customer_success", "devrel"] },
        "suggested_response": { "type": "string" }
      },
      "required": ["category", "urgency", "team"]
    },
    "prompt_template": "You are an expert support ticket router. Classify the ticket and route it. Respond with JSON only."
  }'
```

Save:

- `task_id`
- `task_version_id`

## Step 2: Upload a labeled dataset

The Postman sample includes 10 labeled tickets. This shortened example shows the structure.

```bash
curl https://api.useorlo.com/v1/datasets \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "task_id": "TASK_ID",
    "name": "Support Tickets Labeled v1",
    "samples": [
      {
        "input": {
          "subject": "URGENT: Production API returning 500",
          "body": "All API calls to /v1/users are returning 500 and checkout is blocked.",
          "customer_tier": "enterprise"
        },
        "expected_output": {
          "category": "bug_report",
          "urgency": "critical",
          "team": "engineering",
          "suggested_response": "We are investigating the API 500 errors immediately."
        }
      },
      {
        "input": {
          "subject": "Invoice shows wrong amount",
          "body": "My March invoice shows $450 but I am on the $200 plan.",
          "customer_tier": "pro"
        },
        "expected_output": {
          "category": "billing",
          "urgency": "medium",
          "team": "billing_ops",
          "suggested_response": "I will review the invoice and correct any billing discrepancy."
        }
      }
    ]
  }'
```

Save `dataset_id`.

## Step 3: Choose candidate models

```bash
curl https://api.useorlo.com/v1/models \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID'
```

Pick two model IDs with `has_credentials=true`.

## Step 4: Run an evaluation

```bash
curl https://api.useorlo.com/v1/evaluations/run \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "task_id": "TASK_ID",
    "dataset_id": "DATASET_ID",
    "models": ["MODEL_ID_1", "MODEL_ID_2"],
    "budget": {
      "max_tokens": 80000,
      "max_cost_usd": 3.0,
      "max_runtime_minutes": 20
    }
  }'
```

Save `evaluation_id`.

## Step 5: Poll the result

```bash
curl https://api.useorlo.com/v1/evaluations/EVALUATION_ID \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID'
```

Wait for `status=completed`.

## Step 6: Create and activate a deployment

```bash
curl https://api.useorlo.com/v1/deployments \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "task_id": "TASK_ID",
    "task_version_id": "TASK_VERSION_ID",
    "model_id": "WINNING_MODEL_ID",
    "strategy": "prompt"
  }'
```

Then activate it:

```bash
curl -X PUT https://api.useorlo.com/v1/deployments/DEPLOYMENT_ID/activate \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID'
```

## Step 7: Classify a live ticket

```bash
curl https://api.useorlo.com/v1/tasks/TASK_ID/run \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "input": {
      "subject": "SSO login broken after your latest update",
      "body": "Since yesterday's update our team of 50 cannot login through Okta.",
      "customer_tier": "enterprise"
    },
    "explain": "debug"
  }'
```

You should get a routed result with:

- category
- urgency
- team
- validation and execution details

## What success looks like

By the end of this flow you have a live ticket router that can:

- route bugs to engineering
- send billing issues to billing ops
- handle onboarding and integration questions with the right team

This is a strong first Orlo workflow because the task is easy to reason about and easy to validate.
