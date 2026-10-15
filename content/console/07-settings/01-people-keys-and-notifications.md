---
title: "How do I manage people, keys, and notifications?"
description: "Invite people with a role, create runtime keys with scopes, and set where approval notices go."
sidebar_title: "Settings overview"
order: 1
---

# How do I manage people, keys, and notifications?

Use **Settings** to invite colleagues, issue scoped runtime keys, connect model providers, and choose where notifications go. Admins manage these organization settings; limited members receive only the workflow access their presets grant.

*Who can do this: Admins here; account-wide admins and the owner for account roles.*

![Settings, People: organization access and invitation actions](./assets/images/console/people.png)

## People

[Invite someone with limited access](/console/settings/invite-a-colleague). Choose one or more presets for a limited member, or choose Admin here for all organization work. [Who does what](/start/who-does-what) lists the presets.

## Runtime keys

[Create a runtime key for an application or agent](/console/settings/create-a-runtime-key). Keys carry API scopes and are separate from people’s access presets and model provider credentials.

## Notifications

[Set up signed approval webhooks](/engineers/webhooks-and-approvals), [inspect failed deliveries and replay them](/engineers/webhook-delivery-fails), or [export runtime traces to an OTLP collector](/engineers/export-traces) from **Settings → Notifications**.

Reviewer emails cover requests and deadline notices when email is configured. Final approval and rejection events are sent to subscribed webhook receivers. Webhooks and telemetry share destination-specific delivery, retries, and history.

## Audit

**Evidence** shows the organization’s audit events: releases, publications, approvals, key changes, and connector activity, with who did each. See [Evidence](/console/evidence/evidence).
