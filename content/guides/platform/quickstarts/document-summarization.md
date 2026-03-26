---
title: Document Summarization Quickstart
description: Build a contract term extraction workflow with Orlo Platform
---

# Document Summarization Quickstart

This walkthrough mirrors the `Example: Document Summarization` sample in the tenant Postman collection. The concrete scenario is contract term extraction.

## Scenario

A legal ops team reviews contracts and wants a model to extract key terms before human review:

- parties
- effective and termination dates
- value and payment terms
- obligations
- governing law
- termination clause

## What you will build

- a contract extraction task
- a labeled contract dataset
- an evaluation across two models
- one active deployment
- one live extraction request

## Step 1: Create the task

```bash
curl https://api.useorlo.com/v1/tasks \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "name": "Contract Term Extractor",
    "description": "Extract key terms from contracts for legal review.",
    "input_schema": {
      "type": "object",
      "properties": {
        "contract_text": { "type": "string" },
        "contract_type": { "type": "string" }
      },
      "required": ["contract_text"]
    },
    "output_schema": {
      "type": "object",
      "properties": {
        "parties": { "type": "array" },
        "effective_date": { "type": "string" },
        "termination_date": { "type": "string" },
        "auto_renewal": { "type": "boolean" },
        "total_value": { "type": "string" },
        "payment_terms": { "type": "string" },
        "key_obligations": { "type": "array" },
        "governing_law": { "type": "string" },
        "termination_clause": { "type": "string" }
      },
      "required": ["parties", "effective_date", "total_value", "key_obligations"]
    },
    "prompt_template": "You are a legal contract analyst. Extract the key terms from the contract and return JSON only."
  }'
```

Save:

- `task_id`
- `task_version_id`

## Step 2: Upload a labeled dataset

The Postman sample includes 8 labeled contracts. This shortened example shows the structure.

```bash
curl https://api.useorlo.com/v1/datasets \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "task_id": "TASK_ID",
    "name": "Contract Extraction Gold Set v1",
    "samples": [
      {
        "input": {
          "contract_text": "MASTER SERVICE AGREEMENT ... effective January 15, 2026 between Acme Technologies Inc. and GlobalBank Corp ... governed by Delaware law ...",
          "contract_type": "MSA"
        },
        "expected_output": {
          "effective_date": "2026-01-15",
          "termination_date": "2029-01-14",
          "auto_renewal": true,
          "total_value": "$450,000/year",
          "governing_law": "State of Delaware"
        }
      },
      {
        "input": {
          "contract_text": "CONSULTING AGREEMENT ... Effective March 1, 2026 between DataWise Consulting LLC and MedTech Solutions Inc. ... State of California ...",
          "contract_type": "Consulting"
        },
        "expected_output": {
          "effective_date": "2026-03-01",
          "termination_date": "2026-08-31",
          "auto_renewal": false,
          "total_value": "$180,000 fixed fee",
          "governing_law": "State of California"
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

For extraction tasks, choose models with enough context for long inputs.

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
      "max_tokens": 200000,
      "max_cost_usd": 5.0,
      "max_runtime_minutes": 30
    }
  }'
```

Save `evaluation_id`.

## Step 5: Poll the result

```bash
curl https://api.useorlo.com/v1/evaluations/EVALUATION_ID \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID'
```

Wait for `status=completed` and note the best model.

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

## Step 7: Extract terms from a new contract

```bash
curl https://api.useorlo.com/v1/tasks/TASK_ID/run \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "input": {
      "contract_text": "PROFESSIONAL SERVICES AGREEMENT ... fixed fee of $275,000 ... governing law State of Connecticut ...",
      "contract_type": "Professional Services"
    },
    "explain": "debug"
  }'
```

You should get structured contract terms plus validation and runtime detail.

## Step 8: Capture legal feedback

If a reviewer spots a missed obligation or incorrect term, submit a correction:

```bash
curl https://api.useorlo.com/v1/feedback \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "inference_log_id": "LOG_ID_FROM_STEP_7",
    "score": -1,
    "correction": {
      "effective_date": "2026-09-01",
      "termination_date": "2027-02-28",
      "auto_renewal": false,
      "total_value": "$275,000 fixed fee",
      "governing_law": "State of Connecticut"
    }
  }'
```

## What success looks like

By the end of this flow you have a repeatable extraction workflow that:

- compares models on real contract examples
- returns structured output for review
- captures reviewer corrections for future improvement
