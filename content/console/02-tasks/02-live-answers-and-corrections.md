---
title: "How do I review and correct a task answer?"
description: "Read live answers with their rule results and sources, score them, and add corrections that become examples."
sidebar_title: "Review and correct answers"
order: 2
---

# How do I review and correct a task answer?

Open a task’s **Live** tab or a review-queue item, inspect the answer and rule results, then record a score and the expected answer when a correction is needed. Accepted corrections can become a new dataset version for comparison; they do not change a live answer or release automatically.

*Who can do this: Members with the Reviewer preset score and correct answers; Task observers read them; admins do both.*

## Read an answer

Open a task and its live answers. Each shows the input, the answer, the model and release that produced it, each rule’s result, warnings, and whether the answer was marked to escalate. For a task with sources, the passages the model saw are beside the answer, labeled by document and page.

## Score and correct

Score an answer as right, wrong, or neutral. For a wrong answer, add a correction: the answer that should have been returned, in the task’s answer shape. A correction that does not fit the shape is refused with the field named.

A correction is **pending** until a reviewer or admin reviews it. A reviewed correction is **staged**; a rejected one is kept with the reason. Staged corrections are promoted together into a new dataset version, so the next comparison tests candidates on what production taught you. If the examples changed under you while you were working, the promotion asks you to look again rather than overwriting.

## Agent steps

A step in an agent run can be added to the task’s examples from the run’s timeline, with the input and what the agent did. A step can also be promoted to a trace sample, annotated, and promoted into a dataset.

## What a reviewer cannot do

A reviewer does not change rules, release models, or publish skills. Admins manage task rules and releases. Skill managers and admins can publish skills. These actions are recorded.
