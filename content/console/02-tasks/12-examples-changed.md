---
title: "What happens if someone changes examples while I am reviewing them?"
description: "Recover dataset and feedback conflicts by reviewing the latest baseline before promotion."
sidebar_title: "Conflicting example changes"
order: 12
---

# What happens if someone changes examples while I am reviewing them?

Orlo refuses promotion against a stale baseline. `DATASET_BASE_CHANGED` means the dataset changed; `FEEDBACK_CHANGED` means the accepted correction set changed. Reload, inspect the new examples and total, then confirm again. Do not automatically retry against a baseline you have not reviewed.

## Recover without losing the review

Return to the task’s standard and open the promotion preview again. Check which examples are already present and which accepted corrections or saved steps will be added. Confirm only when the updated set is the one you intend to test.

A successful promotion creates a new dataset version. Earlier comparisons retain their original dataset IDs and results. Creating the dataset does not change the live release; compare the updated examples before releasing a new task version.

[Follow the production-to-release workflow](/console/tasks/improve-from-production). API integrations can inspect the conflict codes in [Datasets](/platform-api/datasets) and [Feedback](/platform-api/feedback).
