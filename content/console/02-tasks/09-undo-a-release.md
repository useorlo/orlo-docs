---
title: "How do I undo a task release?"
description: "Restore an eligible earlier release and verify the result without rewriting history."
sidebar_title: "Undo a release"
order: 9
---

# How do I undo a task release?

Open the task’s **Changes** tab and use **Undo** to make an eligible earlier release live again. Requests after the switch use that release, and their records identify it. Undo cannot restore a model or configuration that is no longer available.

## Verify the change

Review the earlier release’s model and pinned task version, then send a test request after the switch. Inspect the recorded release and validation result.

Each release retains its saved sources and retrieval settings. Returning to an earlier eligible release uses that saved snapshot. A task with required testing also checks the earlier release against its current release policy. [Review source changes](/console/tasks/source-changes).

If the older release is ineligible, compare and release a supported replacement instead. [Handle a retired model](/console/tasks/model-retired).
