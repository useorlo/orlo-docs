---
title: "How do I choose the model that judges a comparison?"
description: "Choose a comparison judge and understand which setting takes precedence."
sidebar_title: "Choose a judge"
order: 6
---

# How do I choose the model that judges a comparison?

Set a task’s judge under **Standard → Models**, or an organization default under **Settings → Models**. A judge scores candidate answers against the rubric and cannot be one of the candidates in that comparison. The comparison records which judge it used.

## Selection order

The judge is the model that scores answers against the rubric in a comparison. It is never a candidate in the comparison it judges. Which model judges is chosen in this order:

1. the comparison request names one,
2. the task names one, under its **Standard → Models** section,
3. the organization names one, under **Settings → Models**,
4. otherwise Orlo picks automatically from the models the organization has a key for.

The judge used is stored with each comparison. A second judge with an agreement threshold flags examples where the two disagree. **Judge shift** opens a signal when the judge’s view of the same model on the same examples moves between two comparisons.

Reviewer corrections improve the examples the judge scores against.

[Compare models on your task](/console/tasks/compare-and-release). A judge score is evidence to review alongside the returned answers and rule results.
