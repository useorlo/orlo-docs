---
title: Internal AI Governance Quickstart
description: Map an internal AI policy to Orlo controls and evidence
---

# Internal AI Governance Quickstart

This quickstart is for risk, compliance, security, platform, audit, and business owners who need responsible internal AI use without turning Orlo into a generic GRC system.

Orlo does not replace policy registers, legal approvals, formal risk registers, or audit sign-off. It gives those systems operational evidence from the AI runtime.

## Scenario

An enterprise wants employees to use AI for policy Q&A. The answers must use approved internal documents, cite sources, avoid unsupported claims, and route uncertain answers to review.

## What You Will Build

- a governed policy Q&A task
- a source-grounding expectation
- validation and fallback behavior
- a feedback review path
- an evidence pack risk and compliance teams can inspect

## Step 1: Define The Policy

Start with a plain-language policy:

| Policy Requirement | Orlo Control |
| --- | --- |
| Use approved policy documents only | Task-scoped document ingestion and retrieval attribution |
| Cite source material | Retrieval-backed inference with debug/audit attribution |
| Do not answer when confidence is weak | Validation, abstention, fallback, or review routing |
| Escalate sensitive answers | Approval or review workflow |
| Preserve evidence | Task versions, deployment snapshots, logs, traces, feedback |

## Step 2: Create The Task

Create a task for the internal policy workflow. The task should define the input, output, owner, and expected answer shape.

```bash
curl https://api.useorlo.com/v1/tasks \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "name": "Internal Policy Q&A",
    "description": "Answer employee policy questions using approved internal policy documents.",
    "input_schema": {
      "type": "object",
      "properties": {
        "question": { "type": "string" },
        "employee_region": { "type": "string" }
      },
      "required": ["question"]
    },
    "output_schema": {
      "type": "object",
      "properties": {
        "answer": { "type": "string" },
        "citations": { "type": "array" },
        "needs_review": { "type": "boolean" }
      },
      "required": ["answer", "citations", "needs_review"]
    },
    "prompt_template": "Answer from approved policy sources. Cite sources. If the answer is uncertain or unsupported, set needs_review=true."
  }'
```

Save `task_id` and `task_version_id`.

## Step 3: Attach Approved Documents

Ingest or attach approved policy documents to the task. For implementation details, see [Retrieval and Documents](/guides/platform/retrieval-and-documents) and [Documents and RAG](/platform-api/documents-and-rag).

The governance point is simple: approved sources become part of the task context, and retrieval attribution lets reviewers see what material supported an answer.

## Step 4: Evaluate Before Deployment

Upload representative policy questions and expected answers as a dataset, then run an evaluation across candidate models.

The evaluation should include:

- questions with clear answers
- questions that require regional policy distinctions
- questions where the model should abstain or request review
- questions with tempting but unsupported answers

## Step 5: Deploy With Controls

Deploy the acceptable model and strategy, then require runtime behavior that matches the policy:

- structured output
- citations
- validation
- fallback or review for unsupported answers
- debug/audit metadata for reviewers

## Step 6: Review Evidence

Ask risk, compliance, security, platform, audit, and the business owner to review the evidence pack:

| Evidence | Reviewer Question |
| --- | --- |
| Task definition | Is this a permitted internal AI use case? |
| Dataset and evaluation | Was the model tested on realistic policy questions? |
| Deployment snapshot | Which version and model were approved for use? |
| Retrieval attribution | Did the answer come from approved sources? |
| Validation result | Did the output match required structure and constraints? |
| Feedback items | Are employee corrections reviewed and reused? |
| Monitoring signals | Are failures, review pressure, and drift visible? |

## What Proof You Created

By the end of this flow, the governance team can see:

- the AI task and owner
- the policy mapped to runtime controls
- the model evaluation evidence
- the approved deployment snapshot
- source attribution for grounded answers
- validation and review behavior
- feedback that can improve future evaluations

That is the practical value of Orlo for internal AI governance: policy becomes controls, controls create evidence, and evidence improves the next version.
