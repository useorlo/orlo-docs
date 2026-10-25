---
title: "Complete agent workflow tests"
description: "Version scenarios, run paired complete-agent trials, inspect evidence, and bind production sessions to an adopted configuration."
---

# Complete agent workflow tests

Scenario tests compare complete agent configurations over frozen multi-turn workflows. Orlo schedules bounded trials, records governed run evidence, keeps outcome and permission checks separate, and applies a fixed paired decision across declared scenario families. Your application runs the agent and test environment.

## Endpoint groups

| Purpose | Endpoints | Authorization |
| --- | --- | --- |
| Scenario standards | `GET/POST /v1/tasks/:taskId/scenarios`, `GET /v1/scenario-versions/:id` | Reads use `tasks.read`. Creating a version is a people-only task change. |
| Comparisons | `GET/POST /v1/tasks/:taskId/scenario-comparisons`, `GET /v1/scenario-comparisons/:id` | Reads use `tasks.read` or `evaluations.read` by route. Starting a comparison is people-only. |
| Trial runners | `POST /v1/scenario-comparisons/:id/trials/claim`, `POST /v1/scenario-trials/:trialId/receipt`, `POST /v1/scenario-trials/:trialId/resume` | `agent_governance.run` |
| Evidence | `GET /v1/scenario-comparisons/:id/trials` | `evaluations.read` |
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

At least one mandatory verifier must check `authoritative_state`. A `permission_receipt` verifier is evaluated from Orlo’s saved governed decisions and cannot be supplied by a runner.

## Fixed paired comparison

`POST /v1/tasks/:taskId/scenario-comparisons` freezes a plan and all candidate manifests. The plan declares the baseline, alternative candidates, exact scenario versions and family labels, repetitions, confidence, and maximum permitted success loss. Each candidate manifest identifies the complete tested configuration.

The response returns immediately with the planned trial count. Read the comparison for status, progress, candidates, result, and qualifications. Read its trials separately for paginated attempt evidence.

## Runner lifecycle

Claim one assignment with a stable `runner_id`. A successful claim returns a one-trial execution token, scenario, candidate manifest, repetition, attempt, and lease deadline. Use the token in `test_context` when creating the trial’s agent session and send it as `X-Orlo-Scenario-Token` on receipt or resume requests.

The receipt is idempotent by `receipt_id`. A completed receipt includes verifier results and optional metrics. An approval pause includes the approval ID and an opaque checkpoint reference. Resume succeeds only after that exact approval is approved.

## Qualification

Only a passing comparison made entirely from confirmatory scenarios can qualify a candidate. Adoption records its manifest and configuration hash, deactivates the prior active qualification, and leaves history available for rollback. A task in required mode expects `{ qualification_id, manifest }` in `POST /v1/agent-sessions`.

The [OpenAPI reference](/platform-api/openapi) gives complete field definitions and request and response examples. [Run assignments with the SDK](/engineers/test-complete-agent-workflows).
