---
title: Approvals
description: Human oversight for sensitive AI outputs and agent actions
---

# Approvals

Approvals are the human oversight surface for sensitive AI decisions and agent actions.

They are used when a workflow should not proceed on automation alone.

## Who Uses It

- business reviewers approving domain-specific actions
- risk and compliance reviewers checking policy-sensitive decisions
- support or operations managers approving customer-impacting actions
- security reviewers approving sensitive tool or data access

## What It Shows

The Approvals surface should make it clear:

- what action is waiting for review
- which policy reason triggered approval
- what context the reviewer needs
- when the request expires
- what happens on timeout
- who approved or rejected the request
- which session, task, deployment, or trace the approval belongs to

## Why It Matters

Human oversight should be recorded as part of the runtime path, not handled in a side channel.

Approvals give Orlo an explicit evidence trail for consequential AI actions.
