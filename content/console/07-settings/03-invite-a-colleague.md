---
title: "How do I invite someone with limited access?"
description: "Invite colleagues with combined access presets or full organization admin access."
sidebar_title: "Invite with limited access"
order: 3
---

# How do I invite someone with limited access?

In **Settings → People**, invite the person by email, choose **Limited access**, and select one or more presets. Presets combine: a skill specialist can manage skills without seeing task results, while an Evidence auditor can read history metadata. Choose **Admin here** to grant full organization access; you do not need to select every preset.

## Choose access

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

![People and their organization access](./assets/images/console/people.png)

[What if a page or action is missing?](/start/missing-access)
