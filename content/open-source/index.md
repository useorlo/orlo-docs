---
title: "Open source"
description: "Use the public agent SDK, Python adapter and evaluation datasets, with worked examples and reusable scoring tools."
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

## Public evaluation datasets

[Orlo Open Evals](https://github.com/useorlo/open-evals) publishes synthetic cases, written policies, reference answers and dependency-free scoring tools. The first dataset covers support-ticket routing: 500 cases across 91 scenario families, with 400 development cases and 100 evaluation cases. The references remain provisional pending independent human review.

Use the [support-routing tutorial](/start/support-routing-tutorial) to compare models in Orlo, or [replay the published studies](/start/replay-evaluation) without an account or provider key. The data and scorer also work with other evaluation tools.

Data and documentation are **CC BY 4.0**; the tools are **MIT** licensed. [Download the versioned release](https://github.com/useorlo/open-evals/releases/tag/support-routing-v0.3.1) or [contribute a case or policy clarification](https://github.com/useorlo/open-evals/blob/main/CONTRIBUTING.md).

## The platform

The Orlo platform is licensed software, available for self-hosting through fineSample; see [Operate Orlo](/operators).
