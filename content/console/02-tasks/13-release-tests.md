---
title: "How do I require a passing test before a release?"
description: "Tie a release decision to a tested model, task standard, and source snapshot."
sidebar_title: "Require a release test"
order: 13
---

# How do I require a passing test before a release?

Run a **release test** in the task’s **Changes** tab, release a passing candidate, then set **Release policy** to required. Orlo checks that policy when a release is created, activated, and used. The pass belongs to the tested configuration, including its instructions, rules, shared skills, model offering, and source snapshot.

## Set the test before it runs

Choose a baseline and candidates, the number of paired examples, confidence, and allowed score loss. A live release supplies its saved baseline configuration. Selecting the same model again tests the current task standard against that release. Without a live release, choose a reference model explicitly.

The test uses a fixed set of examples and compares each candidate with the baseline on those same examples. It does not stop early to declare a pass. Candidate identities keep two configurations of the same model separate.

## Read the verdict

| Verdict | Meaning | Next step |
| --- | --- | --- |
| Passed | The candidate meets the declared non-regression threshold and mandatory checks | Inspect the examples, then release that candidate |
| Regressed | Evidence shows unacceptable loss, or a mandatory candidate rule failed | Review the standard and failing examples |
| Inconclusive | The evidence does not establish a pass or regression | Add representative examples and start a new test |
| Invalid | Required calls, rule checks, or scoring evidence are missing | Resolve the failures and run a new test |

The interval uses a conservative bound on paired scores, adjusted for the number of alternatives. It measures the evidence in the declared examples; it does not establish judge accuracy or guarantee future answers. A small test can remain inconclusive even when both candidates score well. [Inspect where answers differ](/console/tasks/regression-regions).

## Adopt the policy on a live task

First create and activate a release from a passing test. Then require testing. If the live release lacks qualifying evidence, the policy change is refused and the current release stays in place. Only an authorized member can change the policy in the console.

A stricter policy can require another test. Earlier releases remain available for rollback only while they meet the current policy and availability requirements. Required testing uses the tested generation settings: temperature zero where supported and a 4,096-token output budget. Consensus and LoRA releases do not have a qualifying test path. A fallback also needs a qualifying release for the same standard and source snapshot.

Advisory tasks keep optional comparisons. Required tasks cannot bypass the gate through another release or inference entry point. Calls already dispatched before a policy change cannot be recalled.
