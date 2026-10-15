---
title: "What happens when a model is retired?"
description: "Find affected releases and compare a supported replacement for a retired model."
sidebar_title: "Retired models"
order: 10
---

# What happens when a model is retired?

Orlo prevents use of a model marked retired and raises an Inbox signal when a live release is affected. Compare a supported replacement and release it, or undo to an eligible earlier release. Orlo does not automatically choose an untested replacement for you.

## Replace the model

A signal opens in the Inbox when the catalog marks a live release’s model deprecated or retired. Add the replacement as a candidate and run the comparison on the same examples. The judge, rubric, and dataset version are recorded with each run, so two comparisons on the same examples are comparable. Orlo does not re-run the comparison on its own.

Check provider access, task compatibility, and the returned answers before release. A deprecation notice is a chance to prepare while the old model may still work; retirement means it is no longer eligible. A provider can also remove access before the catalog reflects that change, so handle request errors in your application.

[Read model availability states](/platform-api/models).
