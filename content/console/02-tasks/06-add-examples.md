---
title: "How do I add examples to a task?"
description: "Upload expected answers as a new dataset version without rewriting earlier comparison results."
sidebar_title: "Add examples"
order: 6
---

# How do I add examples to a task?

Upload inputs and expected answers in the task’s **Standard** tab as CSV, JSON, or JSON Lines. Each upload creates a new dataset version. Comparisons keep the version they tested, so adding examples does not rewrite earlier results or change a live release.

## Prepare representative examples

Examples are inputs with the answer your reviewers expect. Upload a CSV, JSON, or JSON Lines file; in a CSV the first column is the input and the other columns are the answer fields. Each upload makes a new dataset version, and the previous one stays. A comparison names the dataset version it ran on.

Known organization credentials and recognizable secret values are removed from examples. Ordinary fields such as `token` or `session` keep their names and value types. When content changes, the console asks you to inspect it before comparing models.

Examples also come from production: a reviewer’s correction, once promoted, becomes a new example, and an agent step can be added to the task’s examples. See [Checking answers](/console/tasks/live-answers-and-corrections).

Include normal requests, difficult cases, and cases the task should refuse. Match each expected answer to the task’s answer shape. Inspect any protected-value warning before starting the comparison.

[Use production corrections as examples](/console/tasks/improve-from-production).
