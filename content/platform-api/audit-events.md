---
title: "Audit events"
description: "The organization’s record of who did what: releases, publications, approvals, key changes, connector activity."
---

# Audit events

## `GET /v1/audit-events`

List the organization’s audit events, newest first. Use `task_id`, `limit` (up to 500), and `before` (a timestamp) to filter and page. The key needs `audit.read`. Each event has a type such as `deployment.created`, `skill.published`, `approval.decided`, `membership.access_changed`, `connector.connected`, or `skill.retrieved`, the actor (a person, a key, or `system:catalog`), the target, a payload, and the time.

Account and membership changes are available to authorized administrators in the console.

The record is written once and not edited by the product.
