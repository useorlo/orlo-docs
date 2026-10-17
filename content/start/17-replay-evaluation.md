---
title: "How do I replay an evaluation without a model key?"
description: "Inspect the public support-routing studies and reproduce their scores without an Orlo account or provider calls."
sidebar_title: "Replay a saved evaluation"
order: 17
---

# How do I replay an evaluation without a model key?

Clone [Orlo Open Evals](https://github.com/useorlo/open-evals) and run the replay commands below. They verify the saved dataset and reproduce the published grades without an Orlo account, provider key or model call. Start with the 20-ticket study, then inspect the separate 500-case study.

## 1. Replay the first 40 answers

Use Node.js 20 or later:

```sh
git clone https://github.com/useorlo/open-evals.git
cd open-evals
git checkout b0cea0bdaf35d72e9c825809d887dece0cf1cf71
node replay-study.mjs
```

The output reports **40 verified answers**, zero model calls and **19 of 20 reference matches for each model**. This replays dataset 0.1.0. It does not run or score the newer 500-case dataset.

Both models chose Technical for `support-008`, while the provisional reference chose Security. The policy had overlapping rules for security questions and API how-to questions. That agreement exposed a policy decision to review; it did not establish which answer was correct.

[Read the original case study](https://github.com/useorlo/open-evals/blob/b0cea0bdaf35d72e9c825809d887dece0cf1cf71/studies/support-routing-2026-10-16/support-routing/case-study.md), inspect its [saved answers](https://github.com/useorlo/open-evals/blob/b0cea0bdaf35d72e9c825809d887dece0cf1cf71/studies/support-routing-2026-10-16/support-routing/study-results.json), or [watch the captioned console walkthrough](https://github.com/useorlo/open-evals/blob/b0cea0bdaf35d72e9c825809d887dece0cf1cf71/studies/support-routing-2026-10-16/support-routing/media/support-routing-walkthrough.mp4). The video uses edited captures of the completed comparison and has no audio.

## 2. Replay the expanded study

This separate experiment ran dataset **0.3.1**, with 500 synthetic tickets across 91 scenario families. Verify all six score reports, then display each model's evaluation-partition result:

```sh
node --test verify-expanded.test.mjs
node cli.mjs score studies/support-routing-2026-10-17/answers-openai.json --dataset . --split evaluation
node cli.mjs score studies/support-routing-2026-10-17/answers-anthropic.json --dataset . --split evaluation
```

| Whole answers matching provisional references | GPT-5.4 | Claude Sonnet 4.6 |
| --- | ---: | ---: |
| Development | 400 of 400 | 363 of 400 |
| Evaluation | 94 of 100 | 89 of 100 |
| All cases | 494 of 500 | 452 of 500 |

![Whole-answer matches by reference queue for the 500-case study](./assets/images/evals/support-routing-queue-matches.svg)

*Each bar counts answers matching all three fields within a reference queue. Source: [Orlo Open Evals, 17 October 2026](https://github.com/useorlo/open-evals/blob/b0cea0bdaf35d72e9c825809d887dece0cf1cf71/studies/support-routing-2026-10-17/README.md), CC BY 4.0.*

Claude's differences included 34 replies that did not meet the JSON-only contract, 11 unnecessary escalations and three valid answers assigned to another queue. GPT's six priority differences were all in one expired-invitation family. [Read the findings and methods](https://github.com/useorlo/open-evals/blob/b0cea0bdaf35d72e9c825809d887dece0cf1cf71/studies/support-routing-2026-10-17/README.md) before interpreting the totals.

The scoring test covers development, evaluation and all cases for both models. Related variants stay in the same partition, and failed or missing answers remain in the denominator. Replaying saved answers is deterministic; a new provider call can produce a different answer.

## 3. Use the data for your own comparison

Follow the [support-routing tutorial](/start/support-routing-tutorial) to import the policy and examples into Orlo, run models and review their answers. The [public dataset release](https://github.com/useorlo/open-evals/releases/tag/support-routing-v0.3.1) also works outside Orlo and includes a standalone scorer, policy, output schema, review worksheet and integration templates.

The synthetic references have not received independent human review. These studies show what happened under their recorded settings; they do not establish production accuracy or a general model winner. The original and expanded studies used different policies and cases, so their scores are not a before-and-after measure of improvement.
