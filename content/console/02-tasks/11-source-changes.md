---
title: "What happens when I change a task’s source documents?"
description: "Understand which source changes affect live answers and when to compare again."
sidebar_title: "Changes to sources"
order: 11
---

# What happens when I change a task’s source documents?

A live release keeps the sources and retrieval settings saved with it. Adding, removing, or re-embedding documents prepares the next release; it does not change the current one. Compare the updated sources, then release the chosen model to make those changes available in live answers.

## Check the effect

Wait for source preparation to finish, then compare representative questions and inspect the passages supplied with each answer. Orlo will ask you to wait if sources are still being prepared. A document can be ready for keyword search even if meaning search is unavailable; the Sources tab explains its status.

## When the embedding model changes

Use **Embed again** to prepare the current documents with the new embedding model. This leaves existing releases intact. A question and its passages must use compatible embeddings for meaning search; keyword search remains available when compatible embeddings are unavailable. Compare the prepared documents and create a new release before relying on the new embeddings in live answers.

Removing a document excludes it from new source comparisons and releases. An existing release retains its saved passages, and earlier answers retain their source records. [Add documents to a task](/console/tasks/sources).
