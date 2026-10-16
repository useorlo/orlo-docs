---
title: "How do I identify an agent configuration for measured permissions?"
description: "Declare the model and application revision when starting a run so permission evidence stays scoped."
sidebar_title: "Declare agent configuration"
order: 19
---

# How do I identify an agent configuration for measured permissions?

Set `metadata.permission_context.model` and `metadata.permission_context.runtime_version` when creating an agent session. Use the model identifier and the version of the application that runs the agent. Orlo binds independent review evidence to that declaration and the saved task, permissions, skills, and call context.

```bash
curl https://api.useorlo.com/v1/agent-sessions \
  -H "Authorization: Bearer $ORLO_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "task_id": "11111111-1111-4111-8111-111111111111",
    "goal": "Review an eligible refund request",
    "metadata": {
      "permission_context": {
        "model": "your-provider/model-version",
        "runtime_version": "refund-agent-2026.10.1"
      }
    }
  }'
```

Replace the task ID, model, and application revision with your own. The runtime key needs `agent_governance.run`. With an SDK, pass the same metadata when creating the session; no separate model integration is required.

## When the configuration changes

Start a new session with the new declaration when you change the model or application revision. Use specific versions where available: an unchanged alias cannot tell Orlo that its underlying model changed. If a tool call also supplies a model name, it must agree with the session declaration to use measured permission.

Orlo does not independently attest which external model executed. Accurate declarations remain your application’s responsibility. Missing declarations or an unfamiliar configuration cannot earn automatic permission; calls governed by the measured band return to approval.

An application key cannot enable or resume a band. An authorized person does that in the console after inspecting evidence. [Set up measured permissions](/console/agent-runs/measured-permissions) and [report what happened after a tool call](/engineers/report-action-outcomes).
