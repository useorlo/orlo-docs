---
title: "How do I approve or reject an agent action?"
description: "What an approval shows, how to decide it, and what the record keeps."
sidebar_title: "Decide an approval"
order: 1
---

# How do I approve or reject an agent action?

Open the approval from the Inbox or review queue, inspect the exact tool and arguments, then approve or reject it with a comment. Approval authorizes that call once; the agent must retry it through Orlo in its original open session before the tool runs.

*Who can do this: Agent approvers and admins decide. Agent observers can see what is waiting.*

![An agent run paused for approval: the tool, its exact arguments, the rule that held it, the time left, and Approve and Reject](./assets/images/console/approval.png)

## What you see

- The task and the agent run, with the steps that came before this one.
- The tool the agent wants to call and the exact arguments.
- The rule that asked for a person, and the action class the agent declared.
- How long is left, and what happens if nobody decides: reject, escalate, or contain.

## Decide

**Approve** lets that exact call run once. The agent retries with the same arguments and proceeds; if it retries again, a new approval opens. If the agent changes the arguments, that is a new call and needs a new approval.

**Reject** stops the call. The agent is told the step was rejected and why.

A comment is kept with either decision. The record stores who decided, from your sign-in, not from anything the agent sent.

## Expiry

When nobody decides in time, the rule’s timeout action applies. Reject stops the action. Escalate gives admins another review window while the action remains pending; escalation is not approval. Contain stops the run with a recommended action.

[How the application resumes after a decision](/engineers/resume-an-approved-step) explains pending, expired, rejected, and consumed approvals.

## Where the decision shows up

The step in **Agent runs** shows the decision, the approval, and your name. **Evidence** lists it as an audit event.
