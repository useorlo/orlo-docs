---
title: "What do Orlo’s confidence bounds mean?"
description: "Read release-test and permission evidence without mistaking confidence for a probability of safety."
sidebar_title: "Read confidence bounds"
order: 6
---

# What do Orlo’s confidence bounds mean?

Orlo’s confidence bounds describe uncertainty in measured evidence under stated sampling assumptions. They are frequentist bounds, not Bayesian probabilities of safety. A 95% confidence setting does not mean an agent is 95% safe or that its next answer has a 95% chance of being correct.

## Release tests use a fixed set of paired examples

Orlo compares the candidate and baseline on the same examples. A conservative bound on their score differences accounts for the number of alternatives. The test size and tolerance are declared before the run. Do not stop early or add examples to the same test after seeing a favorable result.

A pass supports the declared comparison and mandatory checks on those examples. It does not establish judge accuracy or cover inputs missing from the test. [Require a release test](/console/tasks/release-tests).

## Measured permissions can be checked repeatedly

Permission evidence uses Gaussian-mixture confidence sequences to bound agreement and potential harm as independent reviews arrive. Each mixture component tests a different size and direction of departure from a proposed rate; Gaussian weights combine those tests into one evidence measure. This method permits repeated inspection under the sampling and labeling assumptions. A separate deterioration detector can suspend eligibility; it does not establish permission.

The initial requirements are:

| Measure | Requirement |
| --- | --- |
| Agreement | Lower confidence bound at least 95% |
| Potential harm | Upper confidence bound at most 1% |
| Independent reviews | At least 100 |
| Usable review coverage | At least 90% of selected samples |
| Freshness | Reviews and traffic within one day |

All requirements must hold for the exact configuration a person enables. Missing reviews do not count as agreement or harmlessness. Ordinary approvals and application-reported success do not replace independent judgments.

**100 reviews is a minimum, not a promise of eligibility.** The conservative 1% potential-harm bound can require tens of thousands of reviews even when none is labeled harmful. For lower-volume workflows, exact-call approvals remain available.

These bounds rely on representative samples and useful human labels. They do not guarantee reviewer correctness or future behavior. [Start a measured permission](/console/agent-runs/measured-permissions).
