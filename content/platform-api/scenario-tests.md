---
title: "Complete agent workflow tests"
description: "Version scenarios, run paired complete-agent trials, inspect evidence, and bind production sessions to an adopted configuration."
---

# Complete agent workflow tests

Scenario tests compare complete agent configurations over frozen multi-turn workflows. Orlo schedules bounded trials, records governed run evidence, keeps outcome and permission checks separate, and applies a fixed paired decision across declared scenario families. Your application runs the agent and test environment.

## Endpoint groups

| Purpose | Endpoints | Authorization |
| --- | --- | --- |
| Scenario standards | `GET/POST /v1/tasks/:taskId/scenarios`, `GET /v1/scenario-versions/:id` | Task lists use `tasks.read`; a direct version read uses `evaluations.read`. Creating a version is a people-only task change. |
| Comparisons | `GET/POST /v1/tasks/:taskId/scenario-comparisons`, `GET /v1/scenario-comparisons/:id` | Reads use `tasks.read` or `evaluations.read` by route. Starting a comparison is people-only. |
| Trial runners | `POST /v1/scenario-comparisons/:id/trials/claim`, `POST /v1/scenario-trials/:trialId/receipt`, `POST /v1/scenario-trials/:trialId/resume` | `agent_governance.run` |
| Evidence | `GET /v1/scenario-comparisons/:id/trials`, `GET /v1/scenario-trials/:trialId/evidence` | `evaluations.read` |
| Lifecycle | `POST /v1/scenario-comparisons/:id/cancel`, `POST /v1/scenario-comparisons/:id/finalize`, `POST /v1/scenario-trials/:id/retry` | People-only |
| Qualifications | `GET /v1/tasks/:taskId/scenario-qualifications`, adoption and activation endpoints | Reads require task/evaluation access. Adoption and activation are people-only. |

People-only requests are made by an authorized console member or management integration. A runtime key cannot start, cancel, finalize, retry, adopt, or restore a comparison result, even if the key has every scope.

## Frozen scenario

`POST /v1/tasks/:taskId/scenarios` creates an immutable version. The request includes:

- `version: 1`, `key`, `name`, `family_key`, and `partition`;
- versioned `environment` and `simulator` identities;
- `initial_state` and ordered `interactions`;
- available test `tools` with schema hashes and effect classes;
- declared `verifiers`; and
- `budgets` for turns, tool calls, duration, and optional cost.

At least one mandatory verifier must check `authoritative_state`. A `permission_receipt` verifier is evaluated from Orlo’s saved governed decisions and cannot be supplied by a runner. Use development scenarios while changing an agent. Reserve confirmatory scenarios for the final decision: each confirmatory version can belong to one comparison, so evidence that has been revealed cannot quietly become the next test set. Use development scenarios while changing an agent. Reserve confirmatory scenarios for the final decision: each confirmatory version can belong to one comparison, so evidence that has been revealed cannot quietly become the next test set.

## Fixed paired comparison

`POST /v1/tasks/:taskId/scenario-comparisons` freezes a plan and all candidate manifests. The plan declares the baseline, alternative candidates, exact scenario versions and family labels, repetitions, confidence, and maximum permitted success loss. Each candidate manifest identifies the complete tested configuration.

The response returns immediately with the planned trial count. Read the comparison for status, progress, candidates, result, and qualifications. Read its trials separately for paginated attempt evidence.

## Runner lifecycle

Claim one assignment with a stable `runner_id`. A successful claim returns a one-trial execution token, scenario, candidate manifest, repetition, attempt, and lease deadline. Use the token in `test_context` when creating the trial’s agent session and send it as `X-Orlo-Scenario-Token` on receipt or resume requests.

The receipt is idempotent by `receipt_id`. A completed receipt includes verifier results plus `turns`, `tool_calls`, and `duration_ms`; `cost_usd` is also required when the scenario declares a cost budget. Orlo checks reported tool calls against its own governed step receipts. An approval pause includes the approval ID and an opaque checkpoint reference. Resume is idempotent, capacity-limited, time-bounded, and succeeds only after that exact approval is approved.

Failed agent behavior and exceeded budgets remain part of the fixed evidence. Orlo permits manual retry only when it classifies the failure as safe to repeat. A runner that disappears after possible external work becomes uncertain evidence and is not replayed automatically. Every attempt contributes to the recorded cost. Use the trial evidence endpoint to inspect each frozen verifier result and its bounded evidence payload.

## Qualification

Only a passing comparison made entirely from confirmatory scenarios can qualify a candidate. Each confirmatory scenario version is reserved for one comparison. Each confirmatory scenario version is reserved for one comparison. Adoption records its manifest and configuration hash, deactivates the prior active qualification, and leaves history available for rollback. A task in required mode expects `{ qualification_id, manifest }` in `POST /v1/agent-sessions`.

The [OpenAPI reference](/platform-api/openapi) gives complete field definitions and request and response examples. [Run assignments with the SDK](/engineers/test-complete-agent-workflows).
