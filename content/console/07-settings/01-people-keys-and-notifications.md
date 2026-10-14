---
title: "People, keys, and notifications"
description: "Invite people with a role, create runtime keys with scopes, and set where approval notices go."
order: 1
---

# People, keys, and notifications

*Who can do this: Admins here; account-wide admins and the owner for account roles.*

![Settings, People: each person with their access, when they accepted, and Change access, Account role, and Remove](./assets/images/console/people.png)

## People

**Settings → People** lists everyone with access to this organization and what they can do. Invite someone by email with one of three kinds of access; the invitation lasts a week by default. A person who belongs to several organizations chooses one at sign-in. Removing a person ends their console access and any AI-tool connections they made.

| Access | What it means |
| --- | --- |
| Limited access | A member with one or more presets, below. Presets cover an area across the whole organization; they do not limit someone to a single task, agent, or skill. |
| Admin here | All work, people, and keys in this organization. |
| Admin, whole account | Admin in every organization of the account. Only the account owner grants it, and the owner’s own role is managed with the account. |

### Access presets

| Preset | Lets the person |
| --- | --- |
| Task observer | Read task standards, comparisons, and live results |
| Skill contributor | Read skills, import packages, and save drafts |
| Skill manager | Create, publish, and retire skills |
| Agent observer | Inspect agent runs, steps, and permission decisions |
| Agent operator | Set up agents, inspect runs, and save steps for review; an admin supplies the runtime key |
| Agent permissions manager | Inspect runs and change tool rules and limits |
| Agent approver | Review held agent actions and approve or reject them |
| Reviewer | Review labels, saved steps, and proposed corrections |
| Evidence auditor | Read recorded history and metadata without changing work; the content of each event is withheld |

A limited member sees only the pages and actions their presets cover; everything else is refused, and new features stay unavailable to limited members until they are classified. An invitation can carry an expiry date, after which the person has no access until an admin renews it. An invitation can also point the person at one piece of work, such as an approval, a comparison, a run, or a skill version, as long as the chosen access includes it.

Changing someone’s access shows what they have now and asks you to look again if another admin changed it meanwhile. You cannot change your own access. Every change is recorded in the audit log with who made it, and what the access was before and after. Members invited before presets existed keep their earlier member access until an admin sets presets for them.

Some actions are reserved for people, whatever a runtime key’s scopes: deciding approvals, changing tool rules and limits, authoring, publishing, or retiring skills, and deleting, archiving, or restoring a task.

## Runtime keys

A runtime key lets an application or an agent call Orlo. **Settings → Keys** creates one with a name, scopes, and an optional expiry; the key is shown once. A key can be rotated, which issues a new secret and ends the old one. The scopes are listed in [Sign up and create a key](/start/sign-up-and-keys#scopes).

Give an application that calls a task only `inference.run`. Give an agent `agent_governance.run` and `agent_governance.read`, and `skills.read` if it loads skills.

## Notifications

**Settings → Notifications** sets where approval notices go. Email goes to the people who can decide, when the deployment has email set up. A webhook receives every event you choose:

| Event | When |
| --- | --- |
| `approval.requested` | A step is waiting for a person |
| `approval.expiring` | The approval is near its deadline |
| `approval.escalated` | Nobody decided in time and the rule says escalate |
| `approval.expired` | The approval timed out |
| `approval.approved` | A person approved the waiting action |
| `approval.rejected` | A person rejected the waiting action |

Adding a webhook returns a signing secret once. Each delivery carries `X-Orlo-Signature`, an HMAC of the body with that secret, and `X-Orlo-Event-Id`. A failed delivery is tried again after 1, 5, 15, 60, and 180 minutes and then marked failed; a retry goes to every target the event had, so receivers should treat the event id as the key.

Use **Edit events** to add decision events to an existing webhook. Its address and secret stay unchanged. Final approval and rejection events go to webhook receivers; they do not create extra reviewer emails. See [Webhooks and approvals](/engineers/webhooks-and-approvals) for signature verification and application recovery.

## Audit

**Evidence** shows the organization’s audit events: releases, publications, approvals, key changes, and connector activity, with who did each. See [Evidence](/console/evidence/evidence).
