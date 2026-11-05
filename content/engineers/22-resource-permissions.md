---
title: "How do I limit the records and fields an agent can access?"
description: "Release one permission for a resource, then apply its exact fields, filters and limits in your application."
order: 22
---

# How do I limit the records and fields an agent can access?

Add resource limits to a tool permission, then apply the returned contract inside the tool's data handler. Orlo makes one permission decision for the action. Your application applies its fields, filters, and ceilings before releasing data. The same contract works inside a tool, application, or external gateway; no gateway service is required.

Use TypeScript SDK 0.0.3 or later and the matching Orlo server. Python wrappers stop on resource contracts; they do not apply field or record limits.

## What does the permission contain?

For example: support staff may read a customer's name and account status, only for an open case assigned to them, up to one record. The staff member's ID comes from their verified sign-in. The case's status and assignee are predicates your data system checks against its own records.

In the task's existing permission editor, select the tool and decision. Enable **Limit access to a resource**, enter its type and operation, then set the permitted fields, record filters, and result limit. Optional limits remain collapsed until needed. Existing organization restrictions still apply: a task-level allow cannot override an organization-level reject.

The corresponding tool-policy fields are:

```json
{
  "tool_name": "read_customer_profile",
  "action_class": "read",
  "decision": "allow",
  "resource_selector": {"resource_type": "customer_profile", "operation": "read"},
  "context_conditions": [{
    "path": "/subject/groups", "operator": "contains", "value": "support",
    "required_source": "authentication_verified", "identity_provider": "corp-sso"
  }],
  "access_limits": {
    "allowed_fields": ["customer_name", "account_status"],
    "required_filters": [
      {"field": "case_assignee_id", "operator": "eq", "value_from": "/subject/id",
       "required_source": "authentication_verified", "identity_provider": "corp-sso"},
      {"field": "case_status", "operator": "eq", "value": "open"}
    ],
    "max_rows": 1
  }
}
```

Include the task ID when creating a task-specific rule. Use `expected_policy_version` when editing it. Field sets intersect, filters combine with AND, and ceilings take the smallest value. Removed fields win over masks. Conflicting masks, empty field intersections, unresolved identity references, and incompatible filters block the action.

## How is the person verified?

Orlo verifies an application-supplied signed person token against an admin-managed identity profile. Caller metadata cannot assert verified membership. See [verify the person using an agent](/engineers/agent-identity) for configuration, token refresh and unknown identity responses.

## How do I apply the limits in TypeScript?

Register a handler with the limit types it can implement. This example uses a typed repository adapter whose implementation must parameterize its queries, apply all predicates before retrieval, and project fields before delivery. It is not a generic SQL query builder.

```ts
import {OrloAgentClient, OrloAgentRun, createToolRegistry} from '@orlo/agent-sdk';

const client = new OrloAgentClient({
  baseUrl: process.env.ORLO_API_URL!,
  orgId: process.env.ORLO_ORG_ID!,
  headers: {Authorization: `Bearer ${process.env.ORLO_API_KEY}`},
  identityTokenProvider: () => signInSession.getFreshIdentityToken(),
});
const run = await OrloAgentRun.start(client, {task_id: taskId});
const tools = createToolRegistry({run, reportExecution: true, tools: {
  read_customer_profile: {
    actionClass: 'read',
    resource: {
      resolve: (args: {customer_id: string}) => ({version: 1,
        resource_type: 'customer_profile', operation: 'read', resource_id: args.customer_id}),
      supportedLimitTypes: ['allowed_fields', 'required_filters', 'max_rows',
        'removed_fields', 'masked_fields'],
    },
    execute: async (args, contract, limits) => {
      if (!contract) throw new Error('Missing resource permission');
      // This adapter must refuse unknown columns/operators/masks and apply every limit.
      const rows = await customerRepository.readWithinPermission(args.customer_id, contract.access_limits);
      limits?.applied(); // Say so only once every limit has taken effect.
      return rows;
    },
  },
}});
await tools.invoke('read_customer_profile', {customer_id}, {stepId: stableActionId});
await run.flush();
```

Only declare limit types your handler actually implements. Call `limits.applied()` once the handler has enforced every limit, or `limits.applied(['max_rows'])` for the ones it enforced. Without that call a successful run is reported with limit status `unknown`, because only the handler knows whether its limits took effect. The SDK checks contract version, resource identity, and supported limits, freezes the contract, and blocks before invoking an incompatible handler. Empty permitted field or destination sets block; empty removal, masking, and filter lists impose no additional operation. Resource operations stop when Orlo is unavailable, including reads with an ordinary fail-open setting. It cannot protect direct source calls outside the wrapped path.

Source credentials stay with your data adapter. Do not forward results, tokens, query text, or resolved confidential filters into general log, metadata, or business-report detail fields.

## What happens when approval is required?

The existing review queue holds the action. A reviewer opens **Review access limits** to inspect its exact fields, filters, ceilings, and expiry. Those confidential values load on demand for authorized reviewers; runtime status reads contain a safe summary.

After approval, retry the same step ID, arguments, resource, and limits. Orlo checks current restrictions and atomically consumes one approval. It cannot authorize another resource or a changed permission. Applications still need execution idempotency for crashes or ambiguous network outcomes.

## How can another application or gateway use the contract?

Use the existing task/session/action lifecycle. Send a tool request with its versioned `resource` to `POST /v1/agent-sessions/{session_id}/steps/govern`. Proceed only on `allow` or `allow_with_warning` and a valid matching `resource_contract`. Apply every returned limit before data access or delivery. Return no rows for an invented identifier or a record that fails required filters.

Reject unsupported contract versions, unknown limit types, or constraints your executor cannot implement. Never remove a filter, widen a field set, raise a ceiling, or substitute an identifier. Additional local restrictions are permitted. The contract is returned over the authenticated connection; it is not a portable signed token and does not attest to an external gateway.

The [API reference](/platform-api/openapi) describes these additive fields, identity profiles, examples, and errors. Existing scopes and the existing approval endpoints apply; there is no second resource-decision endpoint or new role.

## What does the evidence prove?

**Orlo decided** records the permission. **Application reported** records the executor's claim. **Independently checked in a test** identifies a verifier that observed fixture state. A successful application report does not prove that a real external system applied the limits.

The SDK reports safe resource outcomes through existing action reports and suppresses resource arguments/results in ordinary step evidence. Stored envelopes contain resource type, operation, policy versions, limit names, and keyed hashes. Evidence filters find those actions by resource and operation. Confidential review values are encrypted and expire after 30 days; completed-session identity state expires after 30 days. Raw identity tokens are never persisted.

To test a permission, add a resource selector to the scenario's tool declaration. A `permission_receipt` verifier can require an exact resource selector and resolved `access_limits`; Orlo checks its own recorded decision and limit hash. A separate `authoritative_state` verifier must inspect the fixture's resulting records or state. The runner cannot substitute its own successful permission receipt.

Get `permission_specification_hash` from `GET /v1/tool-policies?task_id=...` for the candidate manifest. Resource-qualified sessions reject a stale permission specification. Existing tool-only measured bands do not authorize a new resource scope. Historical previews without verified context remain unknown; they are not successful resource tests.

