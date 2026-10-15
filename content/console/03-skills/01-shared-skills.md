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

[How do I import an existing skill?](/console/skills/import-a-skill)

Open **Skills → Import skill** and upload a `.md`, `.zip`, `.skill`, or supported `.json` package. Review its instructions and files, then save a draft. A skill manager or admin must publish that version before employees or application agents can retrieve it.

## Publish

[How do I publish shared instructions?](/console/skills/publish-a-skill)

Open the skill, select the version you have reviewed, and publish it. Publication makes that version available to the organization’s skills connector and runtime keys, and sets it as the default. Existing task releases keep their exact pinned version.

## Pin to a task

[How do I use a skill in a task release?](/console/skills/pin-a-skill)

Pin an exact skill version in the task’s standard, compare the task, and release it. Orlo applies the pinned instructions before the task prompt. Publishing a newer skill does not change the released task.

## Retire a version

[What happens when I retire a skill version?](/console/skills/retire-a-skill)

Retirement blocks new retrievals and new bindings to that version. Existing task releases keep using their pinned instructions until you replace them and release again. If those tasks must stop now, archive them; retirement cannot remove instructions already downloaded or loaded into an AI conversation.

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
