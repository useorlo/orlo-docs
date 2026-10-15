---
title: "How does my application resume an approved agent action?"
description: "Read the current approval and resume the exact saved agent step safely."
sidebar_title: "Resume approved actions"
order: 16
---

# How does my application resume an approved agent action?

After an approval notification, read the current approval status and retry the original governed step in the original open session. Keep the same step ID, tool, action class, and arguments. Orlo rechecks the request and consumes the approval before the wrapper executes the tool; the webhook alone is not permission to execute.

## Save and resume the exact step

When a wrapper reports that approval is required, save the organization, session ID, step ID, approval ID, tool name, action class, and exact arguments in your runtime. Keep the original session open while waiting.

After a webhook, read the current approval with a key that has `agent_governance.read`:

```sh
curl "$ORLO_API_URL/v1/agent-approvals/$APPROVAL_ID" \
  -H "Authorization: Bearer $ORLO_API_KEY"
```

| Current status | What your worker does |
| --- | --- |
| `pending` | Keep waiting; escalation is not an approval |
| `approved`, with `consumed_at` unset | Retry the original governed step in the original session |
| `rejected` | Stop that action and return the decision to your workflow |
| `expired` | Handle the configured timeout outcome; do not treat expiry as approval |
| `approved`, with `consumed_at` set | Reconcile the saved operation; do not execute it again just because another event arrived |

The retry must use the same session, step ID, tool name, action class, and arguments. Orlo checks the request and current run state before the wrapper executes the tool. A webhook is a notification, not permission to bypass that check. A changed request needs a new decision.

A consumed approval records authorization, not proof that the external action finished. Use your tool provider’s idempotency key and your own durable result record to handle a crash between authorization and execution. A closed or timed-out session cannot be resumed by an approval notification.

The current published SDKs can retry governed steps after your application reads the status. TypeScript 0.0.2 and Python 0.1.1 do not provide durable waiting or process recovery. Preserve run state in your application and use the methods documented for your installed SDK version.

[Set up signed approval webhooks](/engineers/webhooks-and-approvals).
