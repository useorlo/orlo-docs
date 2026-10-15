---
title: "What happens when I change a task’s source documents?"
description: "Understand which source changes affect live answers and when to compare again."
sidebar_title: "Changes to sources"
order: 11
---

# What happens when I change a task’s source documents?

New task requests use the current document collection and retrieval settings. A release does not freeze its sources, so adding, removing, or re-embedding a document can change answers without a new release. Earlier request records keep their retrieval attribution.

## Check the effect

After the change, compare representative questions and inspect the passages supplied with each answer. Confirm that new material is ready before relying on it; PDFs process in the background.

## When the embedding model changes

Each passage records the embedding model that made it, and a question is matched only to passages the same model embedded. After the deployment’s embedding model changes, the Sources tab says how many passages need embedding again and offers **Embed again**. Until then meaning search skips the older passages, keyword search still covers them, and each answer’s record notes how many were skipped.

Deleting a document removes it from future retrieval. It does not erase the record of an earlier answer. [Add documents to a task](/console/tasks/sources).
