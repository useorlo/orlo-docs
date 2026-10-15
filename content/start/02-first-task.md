---
title: "Your first task"
description: "Compare models on a built-in task, inspect returned answers, release a model, and send a checked request."
order: 2
---

# Your first task

Use **Support ticket routing** to learn the workflow. Orlo includes its instructions, rules, and three fictional examples; you do not need to prepare a file.

You need admin access in the organization and a provider key. Model comparisons and live test requests use that provider account and can incur charges. Three examples demonstrate setup; add representative examples before relying on the result for production.

## 1. Choose the starter

Open **Tasks → New task**, choose **Start with an example**, then **Support ticket routing**. Keep its name or change it. Continue to read the instructions and examples before running anything.

One example routes “I was charged twice for the same order” to `billing`, with `high` priority and `escalate: true`. **Preview changes** fills in a sample input without calling a model.

## 2. Check provider access

Add your key under **Settings → Keys** and choose **Test key**. Return to the saved task to continue. Pick the models to compare; when judge scoring is used, the judge must be a different model from the candidates.

“Listed by provider” confirms the provider listed the model for the key. It does not confirm remaining quota or guarantee a successful request. “Access not checked” can still be tried. A rejected key, a retired model, or a model absent from a recent complete access check needs attention first.

## 3. Compare and inspect answers

Start the comparison. Read at least one returned answer alongside the expected answer and the checks that ran. Scores and confidence intervals describe this example set. Overlapping intervals mean the comparison does not establish a clear winner.

If no model returned an answer, there is no scored result to choose from. Check the failure message, fix provider access, and retry. Partial failures also need review before selecting a model.

**Your first result:** a completed comparison with actual returned answers you can inspect. A queued run or a failed provider call does not establish suitability.

## 4. Choose a model and release

Continue setup to select a model with usable results and create its release. For an existing task, use **Changes**. Check what was tested before deciding which model should answer requests.

The release pins the task version and model and snapshots validation and routing settings. It does not freeze the document collection; [sources remain live](/console/tasks/sources#changes-to-sources).

## 5. Send a test request

Use the setup test request or **Connect → Connect your application**. Send this input for the support starter:

```json
{ "message": "I was charged twice for the same order." }
```

Inspect the returned answer and validation result, then open the request in the task’s **Live** tab. The record identifies the model, release, and task version.

## Continue with your own work

Choose **Use your own task**, or adapt this starter. You can enter examples in the console, download a sample format, or upload CSV, JSON, or JSON Lines. [The standard](/console/tasks/the-standard) explains the formats and versions.

Connect your application with [Run a task](/engineers/run-a-task), then [review production results](/console/tasks/improve-from-production).
