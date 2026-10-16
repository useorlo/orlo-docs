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

Reports may arrive after the run ends. They are application-reported evidence; they do not prove independent success, approve a tool call, or relax permissions. Missing reports remain unknown. Imported traces cannot impersonate governed actions.

In **Agent runs**, open the tool action’s reports to see execution and business outcomes separately. The GET endpoint for the same path returns the latest outcome of each kind and paginated history; it needs `agent_governance.read`.

## SDK delivery choices

The prepared TypeScript and Python SDK source includes opt-in execution reporting, explicit durable-receipt methods, and separate business reporting. Check the installed version before using those helpers; these additions are not in the previously published TypeScript 0.0.2 or Python 0.1.1 archives. The HTTP interface is independent of an SDK release.

Background SDK reporting is best effort. Applications needing recovery after a restart retain their own queue and stable report IDs. A reporting failure must not replace the original tool result or error.
