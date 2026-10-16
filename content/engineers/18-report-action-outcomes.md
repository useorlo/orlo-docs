---
title: "How do I report whether an agent action succeeded?"
description: "Record execution and business outcomes against a governed action without changing permission."
sidebar_title: "Report action outcomes"
order: 18
---

# How do I report whether an agent action succeeded?

Use the `action_id` returned by a governed tool request to append an execution report or a named business outcome with `POST /v1/agent-sessions/:sessionId/actions/:actionId/reports`. The runtime key needs `agent_governance.run`. Reuse the same `report_id` and body when retrying; changed content with that ID returns `409 ACTION_REPORT_CHANGED`.

```json
{
  "report_id": "11111111-1111-4111-8111-111111111111",
  "kind": "execution",
  "outcome": "succeeded",
  "duration_ms": 135
}
```

Execution outcomes are `succeeded`, `failed`, `not_executed`, or `unknown`. A business report uses `kind: "business"`, a named `criterion`, and outcome `met`, `not_met`, or `unknown`. For example, a completed refund API call and a later confirmed refund are separate facts.

For a later business outcome, send a new report ID against the same action:

```json
{
  "report_id": "22222222-2222-4222-8222-222222222222",
  "kind": "business",
  "criterion": "Refund confirmed by the payment service",
  "outcome": "met"
}
```

Generate a unique UUID for each new report and retain it for retries. The response returns `report_id`, `recorded_at`, and `source: "application_report"`. Keep that receipt. A new outcome is a new report; it does not overwrite the earlier record.

Reports may arrive after the run ends. They are application-reported evidence; they do not prove independent success, approve a tool call, or relax permissions. Missing reports remain unknown. Imported traces cannot impersonate governed actions.

In **Agent runs**, expand the tool action with **Why**, then select **Reported execution and outcomes** to see execution and business outcomes separately. The GET endpoint for the same path returns the latest outcome of each kind and paginated history; it needs `agent_governance.read`.

![Action reports showing execution and business outcomes separately in the run inspector](./assets/images/console/action-outcomes.jpg)

*Permission, execution, and a later business outcome remain separate records.*

## SDK delivery choices

Use the HTTP endpoint above with the published TypeScript 0.0.2 and Python 0.1.1 packages; those versions do not include the new reporting helpers. Opt-in execution reporting and explicit report methods are available in SDK source, pending a package release. Check the installed version before using them.

Background SDK reporting is best effort. Applications needing recovery after a restart retain their own queue and stable report IDs. A reporting failure must not replace the original tool result or error.
