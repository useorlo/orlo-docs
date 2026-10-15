---
title: "How do I compare models and release one for a task?"
description: "Run candidates on the same examples with the same scoring, read the confidence intervals, release the winner, and undo if you must."
sidebar_title: "Compare and release"
order: 1
---

# How do I compare models and release one for a task?

Open the task’s **Changes** tab, compare candidates on the same examples and rubric, inspect their returned answers, and release an eligible model. The release pins the task version and records the comparison when linked, so later requests can be traced to the configuration you chose.

*Who can do this: Admins here. Task observers can read every comparison and release.*

## Start a comparison

Open a task’s **Changes** tab and pick candidates: up to twelve models with a provider key. The same examples, the same rubric, and the same judge are used for every candidate. Set a budget if you want one: a cap on tokens, cost, or minutes. A run that hits its budget keeps the results it has.

Before queuing work, Orlo checks the saved provider-access information, model status, judge eligibility, and rubric. Known unavailable choices are refused. This preflight does not make a fresh provider call; unverified access can still be tried, and provider failures or charges can occur once the run starts.

## How scoring works

Three layers, in order:

1. **Rules.** Each answer runs through the task’s rules. Rule results contribute to scoring; inspect failed checks as well as the combined score.
2. **Match.** The answer is compared with the expected answer: exact for classification, semantic for free text.
3. **Judge.** A model that is never a candidate scores the answer against the rubric. It sees exactly what the candidate saw. With two judges and an agreement threshold, examples where they disagree are flagged for a person.

Each candidate’s score is an average across examples with a 95% confidence interval estimated from the scored examples. A candidate that is clearly behind after enough examples is dropped early to save budget.

## Reading the result

The result lists candidates with their score and interval. When two intervals overlap, Orlo says they are **too close to call** and does not recommend one. That is the honest answer: more examples would narrow the interval; a bigger model would not change the fact.

Open any example to read the answers side by side, the rule results, the judge’s reasoning, and the passages used when the task has sources.

## Release

**Release** pins the selected model and task version and snapshots validation and routing settings, then makes the release live. [Sources and retrieval settings remain live](/console/tasks/sources#changes-to-sources). The release records who made it and which comparison chose the model. A release linked to a comparison must use a matching task version and strategy, with an eligible model that returned usable results. Review the answers and your acceptance criteria; eligibility alone is not a guarantee of suitability.

A release can also be made without a comparison, from first-run setup, from “release with sources,” or through the API. The record then shows no comparison, so a reviewer can tell the two apart.

A release that points at a draft skill or a retired skill version is refused, with the version named.

## Undo

[Undo an eligible release](/console/tasks/undo-a-release). Earlier releases remain in history, but an unavailable model or configuration must be replaced.

## When a provider retires a model

[Replace a deprecated or retired model](/console/tasks/model-retired). The Inbox links to affected releases. A replacement needs a deliberate comparison and release decision.

## Related questions

- [What if no answers returned?](/console/tasks/comparison-failed)
- [What does too close to call mean?](/console/tasks/comparison-too-close)
