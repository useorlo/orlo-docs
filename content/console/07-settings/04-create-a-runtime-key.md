---
title: "How do I create a key for my application or agent?"
description: "Create a scoped runtime key for a task caller or agent and keep it in server-side secrets."
sidebar_title: "Application and agent keys"
order: 4
---

# How do I create a key for my application or agent?

An admin creates a runtime key in **Settings → Keys**, chooses the scopes the integration needs, and copies the secret when it is shown. Store it in the application’s server-side secrets. A task caller needs `inference.run`; an agent usually needs `agent_governance.run` and `agent_governance.read`.

## Choose the smallest useful scope

A runtime key lets an application or an agent call Orlo. **Settings → Keys** creates one with a name, scopes, and an optional expiry; the key is shown once. A key can be rotated, which issues a new secret and ends the old one. The scopes are listed in [Sign up and create a key](/start/sign-up-and-keys#scopes).

Give an application that calls a task only `inference.run`. Give an agent `agent_governance.run` and `agent_governance.read`, and `skills.read` if it loads skills.

## Use the key

Send `Authorization: Bearer $ORLO_API_KEY` to `https://api.useorlo.com`. The key selects the organization. Do not put it in a public browser bundle, prompt, or skill. Add `skills.read` only if the agent loads published skills.

A runtime key cannot approve actions or change people-only settings. [Read authentication and retry behavior](/engineers/authentication). Employees using the console or the skills connector use their own sign-in instead.
