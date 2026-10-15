---
title: "Signals"
description: "What Orlo raises on its own, what each signal means, and what to do about it."
order: 2
---

# Signals

*Who can do this: Admins here. Task observers can see open signals.*

The Inbox collects what needs a person: approvals waiting for a decision, comparisons that are too close to call, corrections to review, and signals.

## Signals

A signal is something Orlo noticed without being asked. Each names the task and the release, and stays open until the condition clears or someone dismisses it. Dismissing records who did it and keeps the same signal from reopening.

| Signal | Opens when | What to do |
| --- | --- | --- |
| Pass-rate drop | A live release’s pass rate over the last day is at least ten points below its rate over the seven days before, with at least 30 requests in the day and 100 before; it clears when the gap is under five points | Open recent answers in Evidence, look at which rule fails, and decide whether the model, the inputs, or the rule changed |
| Judge shift | The judge’s score for the same model on the same examples moves by at least ten points between two comparisons | Check whether the judge model or rubric changed; run the comparison again before trusting either result |
| Model deprecated | The catalog marks a live release’s model deprecated | Add the replacement as a candidate and compare now, while the old model still answers |
| Model retired | The catalog marks a live release’s model retired, so its requests fail | Release a model that passed a comparison, or undo to an earlier release on a model that still runs |

The signal tells you; you choose when to run the comparison and what to release.

## Approvals

An approval shows the agent’s run, the tool and arguments it wants to use, the rule that asked for a person, and how long is left. Approve or reject with a comment. See [Inbox and approvals](/console/inbox/approvals).

## Comparisons too close to call

A comparison whose top candidates overlap lands here. Add examples where the models disagree and run it again, or keep the release you have.
