---
title: Fraud Triage Quickstart
description: Build and test a transaction fraud triage workflow in minutes
---

# Fraud Triage Quickstart

This walkthrough mirrors the `Example: Fraud Triage` sample in the tenant Postman collection.

## Scenario

A fintech compliance team wants to triage transaction alerts into `high_risk`, `medium_risk`, `low_risk`, or `false_positive` before analysts review them.

## What you will build

- a fraud triage task
- a labeled evaluation dataset
- an evaluation across two candidate models
- one active deployment
- one live inference request

## Step 1: Create the task

Create a task that accepts transaction alert fields and returns a structured risk decision.

```bash
curl https://api.useorlo.com/v1/tasks \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "name": "Transaction Fraud Triage",
    "description": "Classify transaction alerts by risk level and recommended action.",
    "input_schema": {
      "type": "object",
      "properties": {
        "transaction_amount": { "type": "number" },
        "merchant_category": { "type": "string" },
        "customer_country": { "type": "string" },
        "merchant_country": { "type": "string" },
        "is_first_transaction": { "type": "boolean" },
        "alert_reason": { "type": "string" }
      },
      "required": ["transaction_amount", "merchant_category", "alert_reason"]
    },
    "output_schema": {
      "type": "object",
      "properties": {
        "risk_level": { "type": "string", "enum": ["high_risk", "medium_risk", "low_risk", "false_positive"] },
        "risk_score": { "type": "number" },
        "recommended_action": { "type": "string", "enum": ["block", "review", "monitor", "approve"] }
      },
      "required": ["risk_level", "risk_score", "recommended_action"]
    },
    "prompt_template": "You are a fraud detection analyst. Classify the alert and recommend an action. Respond with JSON only."
  }'
```

Save:

- `task_id`
- `task_version_id`

## Step 2: Upload a labeled dataset

Upload a small gold set. The Postman sample includes 12 examples; this shortened example is enough to understand the shape.

```bash
curl https://api.useorlo.com/v1/datasets \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "task_id": "TASK_ID",
    "name": "Fraud Alerts Labeled Set v1",
    "samples": [
      {
        "input": {
          "transaction_amount": 14999,
          "merchant_category": "cryptocurrency_exchange",
          "customer_country": "US",
          "merchant_country": "RU",
          "is_first_transaction": true,
          "alert_reason": "High value cross-border to sanctioned region"
        },
        "expected_output": {
          "risk_level": "high_risk",
          "risk_score": 0.95,
          "recommended_action": "block"
        }
      },
      {
        "input": {
          "transaction_amount": 49.99,
          "merchant_category": "grocery",
          "customer_country": "US",
          "merchant_country": "US",
          "is_first_transaction": false,
          "alert_reason": "Velocity — 3 transactions in 5 minutes"
        },
        "expected_output": {
          "risk_level": "false_positive",
          "risk_score": 0.1,
          "recommended_action": "approve"
        }
      }
    ]
  }'
```

Save `dataset_id`.

## Step 3: Choose candidate models

List the models available to your org and pick two with credentials.

```bash
curl https://api.useorlo.com/v1/models \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID'
```

Pick two model IDs where `has_credentials=true`.

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
      "max_tokens": 50000,
      "max_cost_usd": 2.0,
      "max_runtime_minutes": 15
    }
  }'
```

Save `evaluation_id`.

## Step 5: Poll the result

```bash
curl https://api.useorlo.com/v1/evaluations/EVALUATION_ID \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID'
```

Wait for `status=completed`, then note the best model.

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

## Step 7: Run live inference

```bash
curl https://api.useorlo.com/v1/tasks/TASK_ID/run \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "input": {
      "transaction_amount": 7500,
      "merchant_category": "cryptocurrency_exchange",
      "customer_country": "US",
      "merchant_country": "KY",
      "is_first_transaction": false,
      "alert_reason": "Large crypto purchase to offshore jurisdiction"
    },
    "explain": "debug"
  }'
```

You should get:

- structured fraud output
- validation result
- latency and deployment details in `debug` mode

## Step 8: Capture analyst feedback

If an analyst disagrees with the output, submit a correction:

```bash
curl https://api.useorlo.com/v1/feedback \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "inference_log_id": "LOG_ID_FROM_STEP_7",
    "score": -1,
    "correction": {
      "risk_level": "high_risk",
      "risk_score": 0.93,
      "explanation": "Cayman Islands is a known laundering jurisdiction for crypto",
      "recommended_action": "block"
    }
  }'
```

## What success looks like

By the end of this flow you have:

- proved at least one model works on your fraud task
- deployed it behind a stable task endpoint
- recorded live inference with explainability
- opened the path to dataset improvement through feedback
