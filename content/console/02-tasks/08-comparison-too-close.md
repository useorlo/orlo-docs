---
title: "What does “too close to call” mean?"
description: "Read overlapping confidence intervals and decide what evidence to add next."
sidebar_title: "Too close to call"
order: 8
---

# What does “too close to call” mean?

The comparison has returned scores, but their confidence intervals overlap. The evidence does not clearly favor one candidate. Inspect disagreements, add representative examples, and compare again, or keep the current release if it still meets your requirements.

## Decide what evidence is missing

Open examples side by side and compare the answers, failed rules, and judge reasoning. Add cases that matter to your users, including failures seen in production; do not select examples only because they favor one model. Keep the rubric and judge choice consistent when assessing the change.

Cost and latency can help choose between suitable candidates, but they do not remove uncertainty about answer quality. More examples may narrow the interval; they do not guarantee a winner.

If no usable answers returned, this is a [failed comparison](/console/tasks/comparison-failed), not a close result.
