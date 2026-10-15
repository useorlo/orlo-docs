---
title: "What happens when a comparison fails to run?"
description: "Recover provider and request failures before interpreting comparison quality."
sidebar_title: "Failed comparisons"
order: 7
---

# What happens when a comparison fails to run?

A model that returned no usable answers has no quality result to compare. Open the failed examples, fix the reported provider, model, or request problem, and retry. Do not interpret failed requests as a zero-quality answer or as evidence that the models are equally good.

## Recover the comparison

1. Open the comparison from **Changes** or the Inbox and inspect a failed example.
2. For rejected credentials, ask an admin to update the provider key and choose **Test key**.
3. For an unavailable model, check its catalog status and the provider account’s access. Select an eligible replacement when needed.
4. For an incompatible request, fix the task or model configuration named by the error.
5. Retry the comparison and inspect returned answers before choosing a release.

If only part of the comparison completed, review the completed count, failures, and budget. Partial evidence may not be enough for the intended decision. A saved key and a provider model listing do not guarantee a successful model call.

[How do I compare and release a model?](/console/tasks/compare-and-release)
