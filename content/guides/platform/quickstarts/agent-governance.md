---
title: Agent Governance Quickstart
description: Govern an agent tool call with policy, approval, and trace evidence
---

# Agent Governance Quickstart

This quickstart shows how Orlo governs an agent step without becoming the agent runtime.

The agent can still run in your own framework. Orlo provides the control plane around consequential steps: session records, tool-policy decisions, approvals, runtime limits, trace samples, and path-level evidence.

## Scenario

A support agent can read customer context and draft replies. It can also request a refund. Refunds over a threshold require human approval before the agent can act.

## What You Will Build

- an agent session
- a governed tool request
- a policy decision that requires approval
- an approval record
- a session timeline with trace evidence

## Step 1: Create An Agent Session

Create a session before the agent begins the trajectory.

```bash
curl https://api.useorlo.com/v1/agent-sessions \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "task_id": "TASK_ID",
    "name": "Refund review for enterprise customer",
    "metadata": {
      "case_id": "CASE-1042",
      "agent_runtime": "external"
    }
  }'
```

Save `session_id`.

## Step 2: Check A Tool Request

Ask Orlo whether the agent can call the refund tool.

```bash
curl https://api.useorlo.com/v1/agent-sessions/SESSION_ID/tools/check \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "tool_name": "issue_refund",
    "request_payload": {
      "customer_id": "cus_123",
      "amount_usd": 1200,
      "reason": "service outage SLA credit"
    }
  }'
```

The policy result should return a decision such as `require_approval`, `allow`, `warn`, or `reject`, depending on your configured tool policy.

## Step 3: Govern The Step

Record the tool request as a governed step so the decision is tied to the session timeline.

```bash
curl https://api.useorlo.com/v1/agent-sessions/SESSION_ID/steps/govern \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "step_type": "tool_request",
    "tool_name": "issue_refund",
    "request_payload": {
      "customer_id": "cus_123",
      "amount_usd": 1200,
      "reason": "service outage SLA credit"
    }
  }'
```

Save `step_id`.

## Step 4: Request Approval

If Orlo requires approval, create the approval record for the governed step.

```bash
curl https://api.useorlo.com/v1/agent-sessions/SESSION_ID/steps/STEP_ID/request-approval \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "policy_reason": "Refunds above $500 require manager approval.",
    "approval_timeout_seconds": 3600,
    "timeout_action": "contain",
    "request_payload": {
      "customer_id": "cus_123",
      "amount_usd": 1200
    }
  }'
```

Save `approval_id`.

## Step 5: Approve Or Reject

A reviewer can approve the step:

```bash
curl https://api.useorlo.com/v1/agent-approvals/APPROVAL_ID/approve \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "reviewer_note": "Approved because outage credit is documented in the account timeline."
  }'
```

Or reject it:

```bash
curl https://api.useorlo.com/v1/agent-approvals/APPROVAL_ID/reject \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID' \
  -d '{
    "reviewer_note": "Rejecting until finance verifies the SLA credit."
  }'
```

## Step 6: Review The Session

Fetch the session to inspect the governed trajectory.

```bash
curl https://api.useorlo.com/v1/agent-sessions/SESSION_ID \
  -H 'X-Orlo-Org-Id: YOUR_ORG_ID'
```

The session detail can include steps, lifecycle events, trajectory results, and step-level path metrics.

## What Proof You Created

| Proof | Where It Appears | Why It Matters |
| --- | --- | --- |
| Agent session | `GET /v1/agent-sessions/SESSION_ID` | Shows the governed trajectory and status |
| Tool policy decision | The tool check and governed step response | Shows whether the tool call was allowed, rejected, warned, or sent to approval |
| Approval record | The approval request and reviewer decision | Shows human oversight for a consequential action |
| Trace sample | Promoted session or step evidence | Lets teams review and reuse real trajectories |
| Runtime evidence | Session events and step metadata | Lets risk, support ops, platform, and audit reconstruct what happened |

This pattern lets teams adopt agents without giving the agent runtime unchecked authority over tools, data, and state changes.
