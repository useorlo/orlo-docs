---
title: "Quality signals"
description: "What Orlo noticed on its own about a live release: pass-rate drops, judge shifts, and models marked deprecated or retired."
---

# Quality signals

A signal is opened by Orlo, not by a request. The key needs `monitoring.read`.

## `GET /v1/quality-signals`

List signals. `status` filters `open` or `dismissed`. Each has a `kind`, the task and release it concerns, when it opened, and the figures behind it.

| Kind | Opens when |
| --- | --- |
| `pass_rate_drop` | A live release’s pass rate over the last 24 hours is at least ten points below the seven days before, with at least 30 requests in the day and 100 before; clears under five points |
| `judge_shift` | The judge’s score for the same model on the same examples moves at least ten points between two comparisons |
| `model_deprecated` | The catalog marks a live release’s model deprecated |
| `model_retired` | The catalog marks a live release’s model retired |

## `POST /v1/quality-signals/:id/dismiss`

Mark a signal seen. It records who dismissed it and keeps the same condition from reopening the signal. This write currently requires an all-scopes runtime key; `monitoring.read` only permits reading. Prefer dismissing signals in the [Inbox](/console/inbox/signals) under a person’s sign-in.
