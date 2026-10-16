---
title: "Integrate with Orlo"
description: "Connect an application or an agent to Orlo with a runtime key: the task API, the OpenAI-compatible endpoint, the TypeScript SDK, the Python adapter, and skills in AI tools."
order: 0
---

# Integrate with Orlo

**For task answers**, send Orlo an input. It selects a release, calls the model with your provider credential when needed, and checks the complete answer before returning it.

**For agents**, keep the model call in your runtime. The SDK asks Orlo before tools act; your provider’s native stream can stay direct. See [both request paths and their diagrams](/start/how-orlo-works).

Application APIs and SDKs use a runtime key at `https://api.useorlo.com`. Employees connect their AI app with an Orlo sign-in and OAuth; start with [Use shared skills](/start/team-skills). An admin creates the key with the scopes you need; see [Sign up and create a key](/start/sign-up-and-keys).

| Page | For |
| --- | --- |
| [Authentication](/engineers/authentication) | Bearer keys, scopes, idempotency, errors, rate limits |
| [Provider key security](/engineers/provider-key-security) | How credentials are protected, used, and revoked |
| [Run a task](/engineers/run-a-task) | Call a task’s live release and act on the rule results |
| [Chat completions](/engineers/chat-completions) | Call a task through the OpenAI-compatible endpoint without changing your client |
| [Agent SDK for TypeScript](/engineers/agent-sdk-typescript) | Keep your model connection and check tool actions from Node.js |
| [Python and LangGraph](/engineers/python-and-langgraph) | The same, from a LangGraph or LangChain application |
| [Skills in your AI tools](/engineers/skills-in-tools) | Claude and ChatGPT through the connector, Claude Code through the installer, your own agents through the SDK |
| [Feedback and corrections](/engineers/feedback-and-corrections) | Send scores and corrections from your application |
| [Declare agent configuration](/engineers/permission-context) | Identify the model and application revision used for measured permission evidence |
| [Report action outcomes](/engineers/report-action-outcomes) | Record tool execution and later business results separately |
| [Webhooks and approvals](/engineers/webhooks-and-approvals) | Receive signed decisions and resume a saved agent step |

The full endpoint list is in the [API reference](/platform-api).

## Find a specific answer

[Browse questions about tasks, skills, access, and agent behavior](/start/find-an-answer). Each question has a direct answer and a focused guide.

## Related questions

- [Can I keep streaming?](/engineers/streaming)
- [What happens when a rule cannot run?](/engineers/answer-check-fails)
- [How do I export traces?](/engineers/export-traces)
- [How do I recover failed webhook delivery?](/engineers/webhook-delivery-fails)
