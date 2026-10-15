---
title: "Compare and release"
description: "Run candidates on the same examples with the same scoring, read the confidence intervals, release the winner, and undo if you must."
order: 1
---

# Compare and release

*Who can do this: Admins here. Task observers can read every comparison and release.*

A comparison answers one question: does this candidate do my task as well as the one that is live, on my examples, by my rubric? A release puts the selected model in front of traffic with a pinned task version and a snapshot of its validation and routing settings.

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

The previous release stays. **Undo** makes an eligible earlier release live again; a retired model or unavailable configuration must be replaced instead. Every answer names the release that produced it, so the switch is visible in the record.

## When a provider retires a model

A signal opens in the Inbox when the catalog marks a live release’s model deprecated or retired. Add the replacement as a candidate and run the comparison on the same examples. The judge, rubric, and dataset version are recorded with each run, so two comparisons on the same examples are comparable. Orlo does not re-run the comparison on its own.
