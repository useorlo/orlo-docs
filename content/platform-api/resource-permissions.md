---
title: "How do resource permissions use the existing agent API?"
description: "Resource scope extends tool permissions, session identity, governed steps, approvals and execution reports."
order: 9
---

# How do resource permissions use the existing agent API?

Resource permissions extend the existing tool rule and governed-action lifecycle. Send a versioned resource with the tool request, proceed only on an allowing decision and a supported matching contract, then apply every returned limit before releasing data. There is no separate resource-decision API or required gateway.

| Surface | Added fields |
| --- | --- |
| Tool permissions | `resource_selector`, `context_conditions`, `access_limits`, `expected_policy_version` |
| Create session | Optional write-only `identity_token`; response `resource_identity` summary |
| Govern step | `resource`, optional `identity_token`; response `resource_contract` and identity summary |
| Request approval | Exact `tool_name`, `arguments` and `resource_contract` in `request_payload` |
| Report execution | `resource_access` with authorization hash, limit types and applied/unsupported/failed/unknown status |
| Workflow scenarios | Tool resource selectors; exact permission receipt checks alongside an independent outcome verifier |

Runtime keys use the existing `agent_governance.run` and `agent_governance.read` scopes. Permission writes require a signed-in member with permission-management access. Identity profiles require an owner or admin; runtime and management keys cannot configure identity trust.

The [OpenAPI reference](/platform-api/openapi) includes the request fields, constraints, examples and responses. Start with [apply limits in TypeScript](/engineers/resource-permissions), [verify a person](/engineers/agent-identity), or [set limits in the console](/console/agent-runs/resource-permissions).

## What happens when configuration changes?

`POLICY_VERSION_CHANGED` asks the editor to reload before saving. `RESOURCE_PERMISSION_SPECIFICATION_CHANGED` requires qualification against the current permission specification. A pending approval never overrides current restrictions.

`IDENTITY_SUBJECT_CHANGED` requires a new run for a different person. `IDENTITY_TOKEN_NOT_NEWER` refuses stale or ambiguous same-time changed facts; `IDENTITY_REFRESH_CONFLICT` means another refresh won. Identity summaries explain missing, expired, unsupported or stale identity without returning token or claim values.

`APPROVAL_REQUEST_CHANGED` and `APPROVAL_LIMITS_CHANGED` reject a changed approval request. `RESOURCE_REPORT_MISMATCH` rejects a report that does not match the governed action. `ACTION_REPORT_CHANGED` refuses changed content under an existing report ID.
