---
title: "How do I test a rule before saving it?"
description: "Replay proposed rules against saved answers and draft schemas from expected outputs."
sidebar_title: "Preview proposed rules"
order: 15
---

# How do I test a rule before saving it?

In the task’s **Standard** editor, change the proposed rules and choose **Preview changes**. Orlo checks up to 25, 100, or 200 recent saved answers and lets you inspect affected answers before you save a new task version.

The preview rechecks recorded answers. It does not call the model again, predict how revised instructions would change an answer, or simulate a fallback. A bounded replay can return partial results; read the tested count with the result. Saving remains a separate action.

## Start from your expected answers

When saved examples exist, use the schema suggestion in setup or the Standard editor. Orlo proposes field types and required fields from up to 200 expected answers. Review and edit the draft before applying it to the editor, then save explicitly.

Suggestions describe observed structure. They do not infer permitted values, safe numeric ranges, or business policy. Examples with optional, nullable, or mixed types deserve particular attention. Existing rules remain unchanged until a new version is saved.
