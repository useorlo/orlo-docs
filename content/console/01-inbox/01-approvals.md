---
title: "Approvals"
description: "What an approval shows, how to decide it, and what the record keeps."
order: 1
---

# Approvals

*Who can do this: Agent approvers and admins decide. Agent observers can see what is waiting.*

An agent step that a rule marks **require approval** stops and waits for you. The Inbox lists waiting approvals by deadline: near their deadline, escalated, and waiting.

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

When nobody decides in time, the rule’s timeout action applies. **Reject** stops the call. **Escalate** rejects the call and sends a notice to whoever is configured. **Contain** stops the run with a recommended action, such as read-only mode or handing over to a person. Notices go out by email and webhook at request, near expiry, on escalation, and on expiry, when the organization has set them up.

## Where the decision shows up

The step in **Agent runs** shows the decision, the approval, and your name. **Evidence** lists it as an audit event.
