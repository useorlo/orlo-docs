---
title: "Sign up and access"
description: "Create an organization in the console, invite people, and create a runtime key with the scopes your application needs."
order: 1
---

# Sign up and access

Everything in Orlo belongs to an organization. People sign in to the console; applications and agents use runtime keys.

## Sign up

Open `https://app.useorlo.com` and choose sign up. It asks for an account name, your email, and a password, and it creates your organization with you as its owner. There is no waiting list; Orlo is open as a sandbox to any organization.

To sign in later you need your email, your password, and, if you belong to more than one organization, which one to open.

## People and roles

Invite people from **Settings → People**. An invitation gives someone one of three kinds of access:

| Access | Can |
| --- | --- |
| Limited access (member) | Only what their access presets allow: for example decide approvals, review corrections, or read evidence. At least one preset is chosen at invitation, and access can be given an expiry date. |
| Admin here | Manage all work, people, and keys in this organization: tasks, rules, comparisons, releases, skills, provider keys, runtime keys |
| Admin, whole account | Everything an admin can, in every organization of the account; only the account owner can grant it |

An invitation arrives by email and can point the person at one piece of work, such as an approval or a comparison, that their access includes. Accepting it sets a password and a display name. The presets are listed in [People, keys, and notifications](/console/settings/people-keys-and-notifications).

## Provider keys

Orlo calls the models you choose with your own provider credentials. Add them under **Settings → Keys** (provider keys): OpenAI, Anthropic, or an endpoint you run with vLLM or llama.cpp. A credential belongs to the organization and is encrypted at rest. Use **Test key** to check access. The catalog can also show models that need a key. A saved key or a model listing does not guarantee remaining quota or a successful model call.

## Runtime keys

A runtime key lets an application or an agent call Orlo. Create one under **Settings → Keys** (runtime keys): give it a name, choose its scopes, and optionally an expiry. The key is shown once. Only owners and admins can create keys.

Send it as a bearer token to the gateway:

```bash
curl https://api.useorlo.com/v1/tasks \
  -H "Authorization: Bearer $ORLO_API_KEY"
```

The key selects the organization. Do not send an organization header. You need a runtime key only when connecting an application or an agent SDK; console work and personal AI-app connections use your sign-in.

### Scopes

Give a key only the scopes it needs.

| Scope | Lets the key |
| --- | --- |
| `inference.run` | Run a task (`POST /v1/tasks/:id/run`) and call chat completions |
| `tasks.read`, `tasks.write` | Read and change tasks and their versions |
| `datasets.read`, `datasets.write` | Read and upload examples; promote corrections and agent steps into examples |
| `evaluations.read`, `evaluations.write` | Read and start comparisons |
| `deployments.read`, `deployments.write` | Read and create releases |
| `documents.read`, `documents.write` | Read and add a task’s sources |
| `feedback.read`, `feedback.write` | Read and submit corrections |
| `agent_governance.run`, `agent_governance.read` | Start agent runs and ask for step decisions; read rules, limits, and approvals |
| `skills.read` | Read published skills and install them |
| `credentials.read`, `credentials.write` | Read and manage provider credentials |
| `models.read`, `models.write` | Read the catalog; register adapters |
| `routing.read`, `routing.write`, `rubrics.read`, `rubrics.write` | Routing policies and judge rubrics |
| `monitoring.read`, `inference_logs.read`, `audit.read` | Signals, answer logs, audit events |
| `org_config.read`, `org_config.write` | Organization settings, judge choice, notification endpoints |

An agent key typically needs `agent_governance.run` and `agent_governance.read`, plus `skills.read` if it loads shared skills. An application that only calls a task needs `inference.run`.

### What a key can never do

Some actions belong to people, whatever scopes a key has: deciding approvals, changing tool rules and limits, creating, editing, publishing, or retiring skills, and deleting, archiving, or restoring a task. A key that tries gets `403 PEOPLE_ONLY`. Do those in the console.

### Errors

| Status and code | Meaning |
| --- | --- |
| `401 MISSING_API_KEY` | No bearer token on the request |
| `403 INSUFFICIENT_SCOPE` | The key lacks the scope the route needs |
| `403 PEOPLE_ONLY` | The action is reserved for signed-in people |
| `429` | Rate limit exceeded; wait for the `Retry-After` header |
| `502 UPSTREAM_UNAVAILABLE` | The service was temporarily unavailable |

## Next

[Your first task](/start/first-task) walks through the console from a new task to a checked answer.
