---
title: "How do I define what a task should do?"
description: "Describe a task, write its instructions, add examples and rules, and understand how versions work."
sidebar_title: "Define the standard"
order: 1
---

# How do I define what a task should do?

Open the task’s **Standard** tab to set its instructions, expected answer shape, examples, rules, and pinned skills. These define the work you will compare and release. Saving a new task version keeps earlier versions and does not replace the live release by itself.

*Who can do this: Admins here, or members with the Task observer preset to read.*

![The Standard tab of a task: version, instructions with a {{text}} placeholder, pinned skills, and rules with their severity](./assets/images/console/task-standard.png)

## Describe the task

**Tasks → New task** asks for a name, a one-line description, and an answer type. The answer type picks the starting rules and the comparison template: classification, extraction, summarization, or answering from sources. Choose **Agent steps with tools** when your application runs an agent and needs decisions before its tools run; such a task has rules and limits instead of examples and a release.

## Instructions

Instructions are the prompt a release sends the model. Use `{{field_name}}` to refer to an input field. Orlo supplies the input separately as data, so caller text does not become part of the saved instructions. The instruction preview shows this separation using an example. Compare models to test how instruction changes affect answers.

Pinned skills are prepended to the instructions in order, each labeled with its name and version. See [Shared skills](/console/skills/shared-skills).

## Examples

[Add examples to the task](/console/tasks/add-examples). Uploads and accepted production corrections create new dataset versions. Inspect any protected-value warning before comparing; ordinary fields such as `token` and `session` retain their value types.

## Rules

Rules run on every answer before it is returned, including reused answers when [response reuse is enabled](/platform-api/tasks#reuse-identical-answers).

| Rule | Checks |
| --- | --- |
| Schema | The answer matches the task’s JSON schema |
| Required fields | Named fields are present |
| Forbidden fields | Named fields are absent |
| Pattern | The answer matches, or must not match, a regular expression |
| Minimum and maximum length | The answer’s length |

Each rule is an error or a warning, and the task says what a failed error rule means: **reject**, **retry**, or **warn**. Reject refuses the request with the rules that failed, so nothing reaches the customer. Retry runs the request once more on the task’s fallback model and refuses it if that fails too. Warn returns the answer marked invalid and leaves the decision to your application. Warnings always come back with the answer, and enough of them mark it to escalate, so your application can route it to a person. A required check that cannot complete does not count as a pass. Orlo refuses that answer with an indeterminate validation result and `abstain: true`, even when the task normally warns. Fix the check before retrying.

## Rubric

A rubric is how a judge scores an answer in a comparison: weighted criteria, each with defined score levels. Write one under **Rubric**, or start from the template your answer type suggests. The rubric a comparison used is stored with it. A rubric says nothing about live answers; live answers are checked by rules.

## Versions

A task version is an immutable snapshot of instructions, schema, rules, and pinned skills. Saving a change makes a new version; the old one is kept, and the release that runs it keeps running it until you release a newer one. A comparison and a release both name the version they used, so what was tested is what runs.

## Lifecycle

A task with no history can be deleted. A task with comparisons, releases, or answers can only be archived, which stops new requests and keeps its record; an archived task can be restored. Only a signed-in admin or owner can do any of these; a runtime key cannot.
