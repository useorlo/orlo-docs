---
title: "How do I run complete agent workflow tests?"
description: "Execute Orlo scenario assignments in your own test environment with bounded concurrency, independent verification, approvals, and safe receipt retry."
sidebar_title: "Run workflow tests"
order: 20
---

# How do I run complete agent workflow tests?

Create and start the comparison in the console, then let a dedicated runner claim its frozen assignments and execute your existing agent against an isolated test environment. The SDK starts a test-scoped governed run, enforces the scenario deadline and budgets, collects your environment’s outcome evidence, cleans up, and records one idempotent receipt.

Your agent code, model client, tools, and checkpoints stay in your runtime. Orlo does not download or execute the application.

## Implement the environment boundary

The runner needs three operations:

1. `prepare` creates the frozen initial state in a test environment.
2. `verify` reads outcome evidence from the authoritative test system after the agent finishes.
3. `cleanup` removes or resets test state and reports whether cleanup succeeded.

If an approval can pause the test, also implement `restore` and persist the agent state under an opaque checkpoint reference in your system. Do not send checkpoint contents or secrets to Orlo.

```ts
import {
  OrloAgentClient,
  OrloScenarioRunner,
  evaluateAuthoritativeStateVerifier,
} from '@orlo/agent-sdk';

const client = new OrloAgentClient({
  baseUrl: process.env.ORLO_API_URL!,
  headers: { Authorization: `Bearer ${process.env.ORLO_API_KEY}` },
});
const runner = new OrloScenarioRunner(client);

await runner.run(assignment, {
  async prepare(initialState) {
    await testCases.reset(initialState);
  },
  async verify(declarations) {
    const state = await testCases.read();
    return declarations.map(declaration =>
      evaluateAuthoritativeStateVerifier(declaration, state, `case:${state.id}:revision:${state.revision}`)
    );
  },
  async cleanup() {
    await testCases.remove();
    return { status: 'succeeded' };
  },
}, async ({ run, scenario, candidate, signal }) => {
  const result = await runSupportAgent({ run, scenario, candidate, signal });
  return {
    status: 'completed',
    metrics: {
      turns: result.turns,
      tool_calls: result.toolCalls,
      duration_ms: result.durationMs,
      cost_usd: result.costUsd, // Required when the scenario sets a cost budget.
    },
  };
});
```

The runtime key needs `agent_governance.run` to claim work and deliver receipts. Use a stable `runner_id`. Claim calls return one assignment or a `retry_after_ms`; respect that delay. Orlo limits active scenario work per organization and comparison, while `runScenarioTrials` limits concurrency inside your process.

A completed receipt must report non-negative `turns`, `tool_calls`, and `duration_ms`; it must also report `cost_usd` when the scenario has a cost budget. Orlo derives governed tool-call count from its own step receipts and compares it with the runner report. Missing or inconsistent coverage makes the trial invalid. Exceeding a declared budget makes it failed.

A completed receipt must report non-negative `turns`, `tool_calls`, and `duration_ms`; it must also report `cost_usd` when the scenario has a cost budget. Orlo derives governed tool-call count from its own step receipts and compares it with the runner report. Missing or inconsistent coverage makes the trial invalid. Exceeding a declared budget makes it failed.

## Handle approvals without repeating side effects

When a tool needs approval, save your application checkpoint and return:

```ts
return {
  status: 'awaiting_approval',
  approval_id: blocked.approval.id,
  checkpoint_reference: savedCheckpoint.id,
};
```

The receipt pauses the trial for a bounded continuation period. After the approval event arrives, read the approval’s current status. For an approval, call the runner again with the saved session and checkpoint reference. Resume is idempotent and re-enters the organization and comparison capacity limit. For a rejection, record the correct non-execution outcome; do not run the tool. Orlo binds approval to the exact original action and will not resume a rejected or expired trial.

## Retry delivery, not execution

Lifecycle receipts are idempotent. If `ScenarioTrialDeliveryError` is raised, store its `receipt` and redeliver that exact receipt with `recordScenarioTrialReceipt`. Do not rerun the agent or a tool merely because the receipt acknowledgement was lost.

Agent failures and budget failures stay in the fixed evidence. A person can retry only a failure that Orlo classifies as safe infrastructure failure. If a runner stops reporting after possible external work, Orlo marks the attempt uncertain and does not replay it automatically. Start a new comparison when the result may have produced a side effect.

Cleanup failure makes the trial invalid. Missing or contradictory mandatory evidence cannot qualify a configuration. A correct rejection can pass when the scenario expects the action to remain unapplied.

## Python

The Python adapter provides `OrloScenarioRunner`, `ScenarioTrialAssignment`, `ScenarioResume`, `evaluate_authoritative_state_verifier`, and `run_scenario_trials` with the same lifecycle. The environment implements asynchronous `prepare`, `verify`, and `cleanup` methods. [Connect a Python or LangGraph agent](/engineers/python-and-langgraph) for the normal governed-run setup.

[Define and inspect scenarios in the console](/console/tasks/test-complete-agent-workflows). [Scenario API endpoints](/platform-api/scenario-tests).
