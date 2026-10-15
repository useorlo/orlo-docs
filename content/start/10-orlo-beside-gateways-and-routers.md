---
title: "Can I use Orlo with an existing gateway or router?"
description: "Keep your existing model infrastructure while adding task checks, agent permissions, and production evidence."
sidebar_title: "Existing gateways and routers"
order: 10
---

# Can I use Orlo with an existing gateway or router?

Yes. Keep your existing gateway or router for model infrastructure, and use Orlo for task releases and answer checks or for permissions around agent tools. The two integrations have different request paths; shared skills can also reach employees’ AI apps without routing their model traffic through Orlo.

## Task requests

An application calls [the task API](/engineers/run-a-task) for saved instructions and validation, or [chat completions](/engineers/chat-completions) when the caller supplies its own messages. If you route these requests through an existing gateway, preserve Orlo’s authorization and task headers and handle its error and validation responses.

## Agent steps

Your agent continues to run in its own framework. The [SDK](/engineers/agent-sdk-typescript) asks Orlo for a decision before a wrapped tool runs, then reports the result. The integration must enforce the decision; tools outside that path are not covered.

## Shared instructions

Employees’ AI apps retrieve published instructions through [the skills connector](/start/team-skills). This does not route their model calls through Orlo or collect their conversation history.

Start with one of these paths and add the others when the workflow needs them. Their records help the team inspect the work and decide what to improve next.
