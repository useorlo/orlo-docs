---
title: "Connect"
description: "Connect an application, an agent, or an AI app to Orlo from the console, and run the connection check."
order: 1
---

# Connect

*Who can do this: Admins here create keys and run test requests; Agent operators run the agent connection check; members with skills access can connect their own AI app.*

**Connect** gathers everything that joins something to Orlo.

- **Connect your application.** Shows how to call a task with a runtime key and sends a test request against the live release from the console, so you see the answer and each rule’s result before writing code. See [Run a task](/engineers/run-a-task).
- **Connect your agent.** Shows the environment values for the SDK and runs the connection check, which wraps a harmless local tool and confirms Orlo’s decision end to end. See [Agent SDK for TypeScript](/engineers/agent-sdk-typescript) and [Python and LangGraph](/engineers/python-and-langgraph).
- **Use skills in your AI app.** The address of the read-only connector for Claude and ChatGPT, and the installer command for Claude Code. See [Skills in your AI tools](/engineers/skills-in-tools).
- **AI app connections.** The apps you connected under your own sign-in, each of which you can disconnect.
- **When an agent can’t reach Orlo** and **When nobody decides in time** explain SDK fail modes and approval timeout choices. The agent’s code determines its fail mode; the console does not discover or change that runtime setting.
