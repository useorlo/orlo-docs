---
title: "Troubleshooting"
description: "Recover from provider failures, missing access, pending approvals, retired versions, and connector problems."
order: 8
---

# Troubleshooting

Start with the message on the affected task, run, or connection. Keep its ID when asking your administrator for help; do not share API keys or provider secrets.

| What you see | What to do |
| --- | --- |
| [No provider key](/console/settings/add-a-provider-key) | An admin adds one in Settings → Keys. Return to the saved task to continue. |
| [Key rejected or model not listed](/console/settings/add-a-provider-key) | Check the provider account’s model access and key, then choose Test key. A saved key alone does not confirm access. |
| Access not checked | Test the key, or try the comparison. An incomplete or old model-list check is not evidence that the model is unavailable. |
| [Every comparison example failed](/console/tasks/comparison-failed) | Read a failed example’s provider error. Fix credentials, model availability, or request compatibility, then retry. There is no quality score to interpret when no answers returned. |
| Partial comparison or budget reached | Inspect successful and failed examples and the completed count. Increase a budget or repair the failures if the evidence is insufficient. |
| [Candidates too close to call](/console/tasks/comparison-too-close) | Review disagreements and add representative examples. You can keep the current release; a narrow score difference is not proof of improvement. |
| [Release refused for a skill](/console/skills/pin-a-skill) | Publish the intended draft or replace a retired version, then compare the updated task. |
| [Live model retired](/console/tasks/model-retired) | Choose an available replacement, compare it, and release it. Undo is useful only when the older release still uses an available model and valid configuration. |
| [Agent call awaiting approval](/engineers/resume-an-approved-step) | An Agent approver decides in the queue. Preserve the session, step ID, and arguments; retry that call after the decision. Do not mark the session completed while waiting. |
| Connection check has no matching report | Check the SDK output, task ID, and runtime key. An imported trace does not establish a successful wrapper check. |
| [AI app connected but no skill retrieval](/start/skill-not-retrieved) | Enable Orlo in the conversation, send Copy request for the selected version, then Check retrieval. Connecting alone does not fetch a skill. |
| [Custom connector unavailable](/start/personal-ai-account) | Check the host app’s plan and workspace permissions. Hosted connectors need reachable HTTPS, not your computer’s localhost. |
| [Missing console page or action](/start/missing-access) | Ask an admin to check your presets and expiry in Settings → People. A Reviewer may need Task observer too; an auditor sees metadata only. |
| [Getting started is hidden](/start/getting-started) | Reopen it from the profile menu. If loading fails, use Reload starting path. |

## Changed examples or drafts

[Recover a changed dataset or correction set](/console/tasks/examples-changed) by reviewing the new baseline before retrying. For a skill edit or publication conflict, reload and inspect the other person’s version before saving again.

## Runtime errors

See [Authentication and retries](/engineers/authentication) for HTTP errors and [SDK outage behavior](/engineers/agent-sdk-typescript#when-orlo-is-unreachable) for fail modes. An API idempotency key does not make an external tool execution exactly once; use the downstream tool’s own idempotency mechanism for side effects.
