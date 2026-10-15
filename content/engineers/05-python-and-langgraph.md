---
title: "How do I connect a Python or LangGraph agent to Orlo?"
description: "Govern a LangGraph or LangChain application with the orlo-langgraph adapter: a session, a governed model, a governed tool, and approvals."
sidebar_title: "Python and LangGraph"
order: 5
---

# How do I connect a Python or LangGraph agent to Orlo?

`orlo-langgraph` connects a LangGraph or LangChain application to agent governance. LangGraph owns the graph, your application calls its model and tools, and Orlo checks the steps you submit. It uses the standard library for HTTP and needs Python 3.10 or later.

Use `orlo-langgraph` 0.1.1 from the public [SDK release](https://github.com/useorlo/agent-sdk/releases/tag/v0.0.2). The console offers the same verified archive and install command. Download `orlo_langgraph-0.1.1.tar.gz` from that release and check its SHA-256 before installing:

```sh
shasum -a 256 orlo_langgraph-0.1.1.tar.gz
pip install './orlo_langgraph-0.1.1.tar.gz[langgraph]'
```

Expected SHA-256: `7bf790e4d2a55366f82b834416b85e695c9c701139ea7a3fb12c0a5380fdd2d6`. Install `langgraph` alongside it. The extra supplies optional LangChain integration dependencies. [Source and release notes](https://github.com/useorlo/agent-sdk) are public.

## Check the connection first

Set `ORLO_API_URL`, `ORLO_ORG_ID`, `ORLO_TASK_ID`, `ORLO_CONSOLE_URL`, and `ORLO_API_KEY`. The key needs `agent_governance.run` and `agent_governance.read`.

```sh
python -m orlo_langgraph.check --expect blocked
```

Then allow the `orlo_setup_check` tool in the console and run again with `--expect allowed`.

## Govern a graph

This integration sketch assumes your application defines `base_model` and `send_email_impl`. Build your graph with the governed `model` and `send_email` objects before compiling and invoking it. Adding callbacks to a graph that still uses raw tools does not enforce permissions.

```python
import os
from orlo_langgraph import (
    OrloLangGraphClient, OrloLangGraphSession, OrloLangGraphCallbackHandler,
    create_governed_model, govern_tool,
)

client = OrloLangGraphClient(
    base_url=os.environ["ORLO_API_URL"],
    org_id=os.environ["ORLO_ORG_ID"],
    headers={"Authorization": f"Bearer {os.environ['ORLO_API_KEY']}"},
)

async with OrloLangGraphSession(
    orlo_client=client, task_id=os.environ["ORLO_TASK_ID"],
    goal="Resolve a support escalation", framework="langgraph-python",
) as session:
    callbacks = [OrloLangGraphCallbackHandler(session=session)]
    model = create_governed_model(session=session, model=base_model, model_name="gpt-4.1-mini")
    send_email = govern_tool(session=session, tool_name="send_email", action_class="network")(send_email_impl)
    # Build and invoke your graph here using model and send_email.
    # Supply callbacks to record other reported steps.
```

`govern_tool` asks Orlo before the function runs and stops it on `reject`. The callback handler records evidence for steps you did not wrap; it cannot stop a call by itself, so wrap every tool whose call must be decided first. `GovernedToolRegistry` registers tools in one place, as the TypeScript registry does.

## Keep your model stream

Your application still calls its provider directly. `GovernedChatModel` supports `invoke` and `ainvoke` on completed responses; it does not add `stream` or `astream`. To keep native streaming, use your existing model client or framework and wrap the tools it dispatches.

Report the completed model output through the session. If the session marks `model_output` as blocking, wait for its decision before using the answer. Buffer the response when it must pass that check before display. [See the agent request diagram](/start/how-orlo-works#agent-permissions-check-actions-in-your-runtime).

## Approvals

A tool that requires approval raises `OrloApprovalRequired` with the step id and the approval id. Preserve the original session while waiting; do not leave a context that completes it. If the process may restart, persist its session and step state. When the decision is in, call the tool again with the same arguments and the saved step id as the reserved `orlo_step_id` keyword:

```python
try:
    await send_email("ops@example.com", subject="Escalation")
except OrloApprovalRequired as blocked:
    # Persist these with the exact tool arguments in your runtime's checkpoint.
    checkpoint = {
        "session_id": session.require_session_id(),
        "step_id": blocked.step_id,
        "approval_id": blocked.approval["id"],
    }
    # Suspend the workflow here without completing the session.
```

When your application has read an approved, unconsumed decision, resume the original session and retry only the saved step:

```python
await send_email("ops@example.com", subject="Escalation", orlo_step_id=checkpoint["step_id"])
```

Use [approval webhooks and exact status reads](/engineers/webhooks-and-approvals) to learn the decision. Python 0.1.1 does not wait automatically. Preserve session state and durable waiting in your application.

A rejected approval raises `OrloGovernanceBlocked`; an expired one applies the rule’s timeout action; changed arguments need a new approval.

## When Orlo is unreachable

Each attempt has a timeout (3 s) and one retry with the same idempotency key. After five failures the client raises `OrloUnavailableError` for 30 s. The session’s `fail_mode` decides per action class; the default is `{"default": "closed"}`, which stops every tool call. `session.close()` waits for background reports; `session.unsent_steps` counts reports that could not be delivered. Persist critical records in your application if they must survive a process failure.
