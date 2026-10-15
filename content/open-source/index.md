---
title: "Open source"
description: "What Orlo publishes as open source today: the agent SDK on GitHub and npm under Apache-2.0, and the Python adapter in the same public repository."
order: 0
---

# Open source

## The agent SDK

`@orlo/agent-sdk` is published on npm and developed in the open on GitHub under the Apache-2.0 license.

| | |
| --- | --- |
| Repository | [github.com/useorlo/agent-sdk](https://github.com/useorlo/agent-sdk) |
| Package | [@orlo/agent-sdk](https://www.npmjs.com/package/@orlo/agent-sdk), version 0.0.2, with npm provenance |
| Requires | Node.js 20 or later; no runtime dependencies |
| Includes | `OrloAgentClient`, `OrloAgentRun`, the generic runtime adapter, the tool registry, step callbacks, the `orlo-agent-check` connection check, and the `orlo-skills` installer for Claude Code |

How to use it is on [Agent SDK for TypeScript](/engineers/agent-sdk-typescript). Issues and pull requests are welcome on the repository.

## The Python adapter

`orlo-langgraph` is the adapter for LangGraph and LangChain applications. Its source is in the [public SDK repository](https://github.com/useorlo/agent-sdk), with a versioned archive on the [release page](https://github.com/useorlo/agent-sdk/releases/tag/v0.0.2). The console offers the same archive with its checksum and install command. See [Python and LangGraph](/engineers/python-and-langgraph).

## The platform

The Orlo platform is licensed software, available for self-hosting through fineSample; see [Operate Orlo](/operators).
