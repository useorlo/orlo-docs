---
title: "How do I turn production results into better task examples?"
description: "Turn a reviewed answer or agent step into new examples, compare again, and release the next task version."
sidebar_title: "Improve from production"
order: 5
---

# How do I turn production results into better task examples?

Use a production result to improve a task’s examples without changing the dataset an earlier comparison used. Reviewers decide what the evidence means; admins add accepted work to the standard, compare, and release.

## 1. Find work to review

For a task answer, open **Live**, read the input and output, and inspect rule results and retrieved passages. Submit a score and, when needed, the expected answer. A correction must fit the task’s answer schema.

For an agent, open its run and select a step. Save it for review. Saving preserves evidence of what happened; it does not mean the action was correct. Imported steps can be reviewed too, but they do not prove Orlo enforced a permission before execution.

## 2. Review the result

Open the review queue, or the task’s **Review** tab when your access includes Tasks. Accept or reject a proposed correction. For a saved step, record the review outcome and expected result where appropriate. Keep the distinction between the observed action and the behavior you want future models to learn.

## 3. Add accepted examples

An admin previews the addition to the task’s standard. Check the current dataset version and the new total, then confirm. The addition creates a new dataset version with lineage; earlier comparisons retain their original dataset IDs. The direct **Add to standard** action on a step can save the trace sample as part of the same flow.

If another person changed the examples, Orlo returns `DATASET_BASE_CHANGED`: reload and review the new baseline. If the set of accepted corrections changed, `FEEDBACK_CHANGED` asks you to review that set again. Do not silently retry either conflict against an unseen baseline.

## 4. Compare again

Open **Changes**, select the updated examples, and compare candidates. Inspect the newly added cases and the rest of the examples. A fix that improves one case can worsen another. If instructions or rules also need to change, save a new task version before the comparison.

## 5. Release and inspect production

Choose a model based on returned answers and the comparison’s evidence. Release the selected task version, then send a test request. **Live** records the release and checks for that request. Watch subsequent answers and signals to decide whether further review is needed.

A new dataset version does not change a live release on its own. Publication of a newer skill also does not move a task’s pinned skill version.

For integrations, see [Feedback](/platform-api/feedback), [Datasets](/platform-api/datasets), and [Saved steps](/platform-api/agent-governance#trace-import-and-review).
