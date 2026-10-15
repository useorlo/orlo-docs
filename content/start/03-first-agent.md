---
title: "How do I verify my first agent connection?"
description: "Verify a blocked and allowed tool call without invoking a model."
sidebar_title: "Verify an agent connection"
order: 3
---

# How do I verify my first agent connection?

Run the SDK connection check with a harmless tool blocked, add permission for that tool, and run the check again expecting it to be allowed. The console records both decisions. This verifies the wrapped call path without a model call or provider key.

This check proves that a wrapped tool reaches Orlo and that its decision is enforced. It does not need a model or provider key.

An **Agent operator** can set up the agent and inspect the run. An admin supplies a runtime key with `agent_governance.run` and `agent_governance.read`. An **Agent permissions manager** or admin changes the tool permission. One person can hold both presets.

## 1. Create the agent task

Choose **Connect an agent** in Getting started, or create a task with the **Agent steps with tools** answer type. Name it and open the connection check from setup or **Connect → Connect your agent**.

## 2. Install the SDK

Choose TypeScript or Python in the console. Use its versioned install command and copy the environment values for this task. Keep the runtime key in your environment or secret store.

For TypeScript:

```sh
npm install @orlo/agent-sdk@0.0.2
npx --no-install orlo-agent-check --expect blocked
```

For Python, install the [versioned adapter](/engineers/python-and-langgraph), then run:

```sh
python -m orlo_langgraph.check --expect blocked
```

The command proposes a harmless local tool named `orlo_setup_check`. With no matching permission, it must be blocked. If an existing wildcard rule allows it, inspect that rule before testing; a different decision is not a successful blocked check.

## 3. Allow that tool and check again

In the agent’s **Permissions**, add an allow rule for `orlo_setup_check`, scoped to this test task. Run the same command with `--expect allowed`. The wrapper now runs the local function and reports its result.

## 4. Verify the record

Follow the command’s console links. Confirm the run belongs to the intended task, inspect the permission decision, and check the matching wrapper report. Refresh the connection check if needed.

**Your first result:** a recorded decision with the matching SDK report. An imported trace alone does not verify enforcement.

## Connect real tools

Use the [TypeScript SDK](/engineers/agent-sdk-typescript) or [Python adapter](/engineers/python-and-langgraph) to wrap your dispatcher. Register the tools and their action classes, and test allowed, rejected, and approval-required actions. Calls outside that integration are outside Orlo’s decisions.

The SDK defaults to stopping calls when Orlo is unavailable. Keep the session and step state when a call needs approval; [approval handling](/engineers/agent-sdk-typescript#approvals) explains how to resume it.
