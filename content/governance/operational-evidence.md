---
title: "Read the evidence"
description: "Understand the records Orlo keeps and use them to inspect an AI workflow."
order: 1
---

# Read the evidence

Open **Evidence** for a task and time range, then follow records back to the work they describe. Related task, run, and skill pages provide the detailed workflow views.

| Record | What it establishes |
| --- | --- |
| Comparison | Which task and dataset versions were tested, the candidates and scoring settings, and the returned answers |
| Release | The selected model and task version, snapshotted validation and routing settings, and the comparison link when supplied |
| Task request | The input, model response, release, rule results, and retrieval attribution recorded for that request |
| Agent step | What the integration submitted, Orlo’s decision, and the result reported by the runtime |
| Approval | The exact held call, decision, person who decided, and timing |
| Skill retrieval | Which person and app retrieved a version, with its content hash |
| Reviewed example | The correction or saved step added to a dataset version and its origin |

## Inspect one result

Find the request or run, confirm the task and version, and read the checks or permission decision. Follow the release to its comparison when one exists. For a source-backed answer, inspect the passages retrieved for that request rather than assuming the current documents are unchanged.

A release without a comparison link does not establish prior evaluation. A skill retrieval proves delivery, not that a model followed it. An imported trace records reported behavior, not prior enforcement. Use these distinctions when presenting the evidence.

## Give reviewers appropriate access

**Evidence auditor** provides history and metadata without event content. Add other presets only when a reviewer needs the corresponding task, skill, or agent details. Presets cover an area across the organization, not one resource. [Who does what](/start/who-does-what) explains the choices.

## Preserve what your process needs

Agree on retention and export requirements for your deployment before relying on a record for a formal review. Access to records is not a claim of tamper-proof storage, certification, or a completed audit package. Use the documented API for supported reads and follow your organization’s evidence handling process.
