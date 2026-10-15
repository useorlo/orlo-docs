---
title: "Shared skills"
description: "Author shared instructions once, publish versions, pin them to tasks, retire a bad version, and give them to the AI tools your people use."
order: 1
---

# Shared skills

*Who can do this: Skill managers create, publish, and retire; Skill contributors save drafts and import; admins do all of it.*

A skill is shared instructions with an owner and published versions. One skill can be pinned to several tasks, loaded by your own agents, used in Claude Code, and reached from Claude and ChatGPT. Each consumer can identify the exact version and its content hash. The SDK and installer verify that hash when they load a package.

![Published support-triage instructions with owner and exact-version selection](./assets/images/console/skill-version.jpg)

## Author

**Skills → New skill** takes a name (lowercase letters, numbers, and single hyphens, such as `support-triage`), an owner, a one-line description that says when to use it, and the instructions. A skill can carry up to 24 supporting text files under `references/`, `scripts/`, or `assets/`, plus a root `LICENSE`, `NOTICE`, or `README`, totaling at most 256 KiB. Scripts are distributed as text and never run.

Saving makes a new draft version; content is never edited in place. Two people editing at once get a conflict, and the second one reloads. Use **Import skill** for `.md`, `.zip`, `.skill`, or supported `.json` packages. Review the imported instructions and files before saving; import creates a draft, not a publication.

## Publish

A version is a draft until you publish it. Publishing makes it the skill’s default: the version the connector and the installer offer by default. Earlier published versions stay readable. A task that pins a draft can be compared, so you can test the draft on the task’s examples before publishing, but it cannot be released.

## Pin to a task

A task version pins up to eight skill versions in order, one version per skill. They are prepended to the task’s instructions. Pinning is by exact version: publishing a newer default does not change what a released task runs. To move a task to a newer version, pin it, compare, and release.

**Usage** on a version shows the tasks that pin it, the latest comparisons that ran with it, and the latest agent runs that declared it.

## Retire a version

Retire a version to prevent new retrievals and new bindings. Retirement asks for a reason of up to 1,000 characters, which is recorded with who retired it. After that:

- the version cannot be published again; save corrected instructions as a new version instead,
- runtime keys and the AI-tool connector can no longer discover or fetch it,
- a task that still pins it cannot be released until the task’s standard replaces it,
- existing records keep their reference, so the history still says what ran.

Retiring the default leaves the skill with no discoverable version until another is published. Existing task releases continue using their pinned versions until you replace the skill and release the updated task. Retirement does not stop those releases. If a task must stop immediately, archive it while you prepare the replacement. Retirement also cannot pull back files already installed or instructions already in an app’s context.

## Where a published version runs

| Where | How | Page |
| --- | --- | --- |
| Task releases | Pinned to the task version; released with it | this page |
| Claude and ChatGPT | A read-only MCP connector under each employee’s own sign-in | [Skills in your AI tools](/engineers/skills-in-tools) |
| Claude Code | `orlo-skills install` pins an exact version into a project and verifies its hash | [Skills in your AI tools](/engineers/skills-in-tools) |
| Your own agents | `OrloAgentRun.startWithSkills` loads exact versions; the run records them | [Agent SDK for TypeScript](/engineers/agent-sdk-typescript) |

## Connect a team member’s AI app

Choose **Use this version in an AI app** on the published version. The connection guide carries that version into **Copy request** and **Check retrieval**, so your colleague can confirm which instructions their app loaded.

![The console connection guide for support-triage version 1, with Copy request and Check retrieval](./assets/images/console/skill-connect.jpg)

Follow [Use shared skills](/start/team-skills) for the full employee workflow, including sign-in and disconnecting an app.

## What stays on record

Each publication records who published and when. Each retrieval through the connector records the person, the application, the skill version, and the content hash, without the content or the conversation. Each agent run records the versions it declared. These records say what was offered and what was declared, not that a model followed the instructions.

## Who can do what

Skill contributors can import and save drafts. Skill managers can also publish and retire versions. Admins have all these permissions. A runtime key with `skills.read` can list published versions and fetch packages. A key cannot create, edit, publish, or retire, whatever its scopes.
