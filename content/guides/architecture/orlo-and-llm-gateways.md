---
title: Orlo And LLM Gateways
description: How Orlo fits beside LLM gateways for regulated, reviewable AI decision paths
---

# Orlo And LLM Gateways

LLM gateways are useful infrastructure. They help teams centralize model access, route requests, apply rate limits, manage credentials, observe traffic, and control spend.

Orlo is adjacent, but it is not trying to be the same category.

Orlo is the control plane for domain intelligence. It proves AI decisions are correct, justified, and reviewable.

## The Difference In One Line

A gateway helps route model traffic.

Orlo helps prove a domain AI decision should be trusted.

That difference matters most when AI is used in regulated or high-consequence workflows: fraud triage, risk review, claims handling, compliance operations, contract review, public services, policy Q&A, or any workflow where a wrong answer must be explained later.

## Where Gateways Usually Stop

A gateway usually sees a request and response:

- which application called a model
- which provider or model served the request
- how long it took
- how much it cost
- whether the request succeeded or failed
- what basic policy, budget, or routing rule applied

That information is useful. It is not enough to prove a regulated decision was correct.

A traffic log can show that a model answered. It usually cannot show whether the model was the right model for the task, whether it was evaluated against domain examples, whether another model was statistically too close to call, whether the system should have abstained, whether the response matched the approved output contract, whether the answer was grounded in approved sources, or whether a human approved a sensitive action.

## Where Orlo Goes Deeper

Orlo works at the task and decision layer.

| Question | Gateway-Centric View | Orlo View |
| --- | --- | --- |
| What was the AI supposed to do? | A route or application label | A versioned task with schema, prompt, owner, validation, and context |
| Why this model? | Provider/model selected for traffic | Evaluation across candidate models on task data |
| Was the result strong enough? | Response succeeded or failed | Scores, confidence intervals, uncertainty, and abstention behavior |
| What was deployed? | Model endpoint or route | Frozen deployment snapshot with task version, model, strategy, and controls |
| Was the output valid? | Maybe status code or policy result | Deterministic validation against task-specific constraints |
| Was it grounded? | Request/response text | Retrieval attribution and source evidence |
| Who reviewed it? | External workflow, if any | Approval records, reviewer decisions, timeouts, and trace evidence |
| Can audit reconstruct it? | Traffic logs | Decision artifacts tied to task, evaluation, deployment, runtime, feedback, and approvals |
| Did production improve the system? | Logs retained | Reviewed feedback promoted into future evaluation data |

The product boundary is different. Orlo is not only watching model traffic. It is operating the evidence loop around domain AI.

## Regulated Decision Paths

Fraud triage is a useful example.

A gateway can route a fraud alert to a model and record the request. Orlo can define the fraud triage task, evaluate candidate models on labeled alerts, decide whether the result is statistically meaningful, freeze the winning model into a deployment, validate the live output, capture debug and audit metadata, and turn analyst corrections into future evaluation data.

That creates an evidence trail:

- the fraud task and output contract
- the labeled dataset used to test candidate models
- the evaluation result and confidence intervals
- the deployment snapshot used in production
- the live inference record and validation result
- the reviewer correction or analyst feedback
- the next dataset created from reviewed production evidence

For teams in fraud, risk, compliance, and audit, that evidence matters more than a model traffic log.

Start with [Fraud Triage Quickstart](/guides/platform/quickstarts/fraud-triage) to see this loop in practice.

## Evaluation Rigor

Orlo treats model choice as evidence, not preference.

Teams can evaluate multiple models, prompts, retrieval strategies, and rubrics on task-specific examples. Results can include confidence intervals and uncertainty-aware recommendations. When candidates are too close to call, Orlo should say so rather than force false certainty.

This is where abstention matters.

For regulated decision paths, the right answer is sometimes "do not automate this decision." Orlo can support fallback, review routing, validation failure handling, and abstention patterns when confidence, grounding, or structure is not good enough.

That is different from simply routing the request to another model.

## Decision Artifacts, Not Just Traffic Logs

Gateways are good at producing operational logs. Orlo produces decision artifacts.

| Artifact | What It Proves |
| --- | --- |
| Task version | What the AI system was approved to do |
| Dataset | What examples were used to test the system |
| Evaluation result | Why a model or strategy was selected |
| Confidence interval | Whether the observed difference is meaningful |
| Deployment snapshot | What configuration was live at decision time |
| Validation result | Whether the output satisfied the approved contract |
| Retrieval attribution | Which sources supported the answer |
| Approval record | Which human oversight happened and why |
| Feedback item | What production correction should improve future evaluations |
| Agent session | What path an agent took through tools, retrieval, approvals, and decisions |

These artifacts are useful to platform teams, but they are also useful to business owners, risk, compliance, legal, security, and internal audit.

## Agent Steps Gateways May Never See

Many agent actions happen outside a single model gateway call.

An agent may retrieve context, decide which tool to call, request a write action, wait for approval, receive a tool result, update state, and continue. A gateway may only see some model calls in that path. It may never see the tool authorization decision, approval timeout, state-change evidence, or trajectory quality.

Orlo governs agent steps in external runtimes without becoming the runtime:

- create an agent session
- check a tool request against policy
- govern a step envelope
- require approval for sensitive actions
- record timeout behavior
- inspect session events
- promote reviewed traces into datasets
- score the trajectory, not only the final text

Start with [Agent Governance Quickstart](/guides/platform/quickstarts/agent-governance) for a concrete tool-policy and approval flow.

## How They Work Together

Orlo and an LLM gateway can coexist.

A gateway can remain the infrastructure boundary for model access, credentials, rate limits, cost controls, and traffic routing. Orlo can sit above or beside that boundary as the control plane for tasks, evaluations, deployments, runtime validation, retrieval attribution, approvals, feedback, and evidence.

Orlo Platform also has its own hosted gateway for authentication, tenant context, API keys, scopes, rate limits, licensing, and audit events. That gateway is the access boundary for Orlo Platform. It is not the whole product.

The deeper value is the decision control plane.

## When A Gateway Is Enough

A gateway may be enough when:

- the use case is low risk
- the system only needs centralized model access
- traffic observability and cost controls are the main requirements
- model choice does not need domain-specific proof
- there is no need for task-level validation, human oversight, or audit evidence

## When Orlo Is Needed

Orlo becomes important when:

- a decision must be correct, justified, and reviewable
- model choice must be proven on domain examples
- evaluation uncertainty and confidence intervals matter
- the system needs abstention, fallback, or review routing
- output validation must enforce task-specific contracts
- retrieval attribution is part of the evidence
- production feedback should improve future evaluations
- agent tools or state changes need policy and approval
- risk, compliance, security, legal, or audit need decision artifacts

That is the practical distinction: a gateway helps manage model traffic. Orlo helps govern AI decisions.
