---
title: "What happens when an answer fails a rule?"
description: "Handle rejection, fallback, warnings, and required checks that could not execute."
sidebar_title: "Failed answer checks"
order: 13
---

# What happens when an answer fails a rule?

Orlo follows the task’s failure behavior: reject the answer, try a configured fallback, or return the answer marked invalid for your application to handle. A required check that cannot run is different: Orlo refuses the answer as indeterminate with `abstain: true`, even when the task normally warns.

## Handle the outcome

| Outcome | Application action |
| --- | --- |
| Checks pass | Use the answer according to your workflow. Passing configured checks is not a guarantee of factual correctness. |
| Reject | Handle `422 VALIDATION_FAILED`; no answer is returned. Use the trace ID to inspect the failed checks. |
| Retry | Orlo checks the configured, available fallback’s answer too. Handle the final validation result. |
| Warn | Inspect `valid: false` and the warnings before deciding whether to show, hold, or review the answer. |
| Indeterminate | Treat `abstain: true` as unusable. Fix the check that could not execute; changing the model does not repair it. |

The task endpoint returns a validation block. Successful chat completions expose the status in `x-orlo-validation`; rejected requests return an error. Always check the HTTP status first.

[Validation fields and examples](/engineers/run-a-task#the-validation-block). [Configure task rules](/console/tasks/the-standard#rules).
