---
title: "The standard"
description: "Describe a task, write its instructions, add examples and rules, and understand how versions work."
order: 1
---

# The standard

*Who can do this: Admins here, or members with the Task observer preset to read.*

A task is one job you want AI to do. Its standard is everything an answer is held to: examples, rules, instructions, sources, and skills. Open a task and the **Standard** tab shows them together.

![The Standard tab of a task: version, instructions with a {{text}} placeholder, pinned skills, and rules with their severity](./assets/images/console/task-standard.png)

## Describe the task

**Tasks → New task** asks for a name, a one-line description, and an answer type. The answer type picks the starting rules and the comparison template: classification, extraction, summarization, or answering from sources. Choose **Agent steps with tools** when your application runs an agent and needs decisions before its tools run; such a task has rules and limits instead of examples and a release.

## Instructions

Instructions are the prompt a release sends the model. Write `{{field_name}}` where an input field goes; a field your application does not send stays visible as the placeholder, so a missing field shows up in the answer rather than disappearing. **Preview changes** fills in sample inputs without calling a model, and replays recent requests against the new instructions so you can see what would change.

Pinned skills are prepended to the instructions in order, each labeled with its name and version. See [Shared skills](/console/skills/shared-skills).

## Examples

Examples are inputs with the answer your reviewers expect. Upload a CSV, JSON, or JSON Lines file; in a CSV the first column is the input and the other columns are the answer fields. Each upload makes a new dataset version, and the previous one stays. A comparison names the dataset version it ran on.

Examples also come from production: a reviewer’s correction, once promoted, becomes a new example, and an agent step can be added to the task’s examples. See [Checking answers](/console/tasks/live-answers-and-corrections).

## Rules

Rules run on every answer before it is returned, including answers served from cache.

| Rule | Checks |
| --- | --- |
| Schema | The answer matches the task’s JSON schema |
| Required fields | Named fields are present |
| Forbidden fields | Named fields are absent |
| Pattern | The answer matches, or must not match, a regular expression |
| Minimum and maximum length | The answer’s length |

Each rule is an error or a warning, and the task says what a failed error rule means: **reject**, **retry**, or **warn**. Reject refuses the request with the rules that failed, so nothing reaches the customer. Retry runs the request once more on the task’s fallback model and refuses it if that fails too. Warn returns the answer marked invalid and leaves the decision to your application. Warnings always come back with the answer, and enough of them mark it to escalate, so your application can route it to a person. Custom patterns run in a sandbox; a pattern that cannot run safely is skipped and the skip is recorded as a warning.

## Rubric

A rubric is how a judge scores an answer in a comparison: weighted criteria, each with defined score levels. Write one under **Rubric**, or start from the template your answer type suggests. The rubric a comparison used is stored with it. A rubric says nothing about live answers; live answers are checked by rules.

## Versions

A task version is an immutable snapshot of instructions, schema, rules, and pinned skills. Saving a change makes a new version; the old one is kept, and the release that runs it keeps running it until you release a newer one. A comparison and a release both name the version they used, so what was tested is what runs.

## Lifecycle

A task with no history can be deleted. A task with comparisons, releases, or answers can only be archived, which stops new requests and keeps its record; an archived task can be restored. Only a signed-in admin or owner can do any of these; a runtime key cannot.
