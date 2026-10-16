---
title: "How do I check whether sources improve answers?"
description: "Separate retrieval coverage from answer quality and test sources on and off."
sidebar_title: "Inspect source retrieval"
order: 16
---

# How do I check whether sources improve answers?

Open a comparison and choose **Inspect source retrieval** to see which passages were supplied for each example. To measure their effect, start a release test in **Changes**, select one model, and choose **Test sources on/off for one model**. Both candidates use the same current task standard and saved examples; only one receives source passages.

Both configurations are judged against the same reference passages. This keeps the reference material used for scoring constant while testing whether giving it to the answering model helps. The source-free configuration is the baseline for this test, even when the task already has a live release.

## Read retrieval separately from the answer

The inspection distinguishes passages supplied, no matching passages, search skipped, sources off, and missing historical records. A failed model call has no answer score. A search hit is not proof that a passage is relevant or that the model used it correctly.

Open an example to read its query and passage previews. New ingestions retain Markdown section ancestry, PDF pages, and **Source provenance**: source and passage hashes, passage order, and parser/chunker versions. Prechunked uploads identify structure supplied by the caller. Older passages can lack these records. Previews are bounded; they are not full document downloads.

![Source inspection showing a retrieved policy passage, its section, and expandable provenance](./assets/images/console/source-provenance.jpg)

*Read the passage beside its answer result. Expand Source provenance to identify the saved source and passage revision.*

A release keeps the source snapshot it was tested with. [Source changes require a new release](/console/tasks/source-changes).
