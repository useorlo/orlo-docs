---
title: "How do I make a task answer from my documents?"
description: "Give a task documents to answer from, see which passages an answer used, and keep the index current."
sidebar_title: "Answer from documents"
order: 3
---

# How do I make a task answer from my documents?

Add text, Markdown, or PDF documents in the task’s **Sources** tab and use a source-backed release. Orlo retrieves relevant passages for each request, supplies them to the model, and records their attribution beside the answer so reviewers can inspect the evidence.

*Who can do this: Admins here.*

## Add a document

Open a task’s **Sources** tab and add text, Markdown, or a PDF. Text is split into passages and each passage is embedded. PDF processing runs in the background. If a file exceeds the page limit, the console explains what to change. Each passage records the document and page it came from.

## How retrieval works

Orlo uses keyword search and, when compatible embeddings are available, meaning search. It combines the results and excludes passages below the configured relevance threshold. The passages go to the model labeled with their document and page. The answer records them, and the console shows them beside each answer and beside each comparison example.

A comparison on a task with sources uses the same retrieval for every candidate, so the models are compared on the same evidence.

## Embed again

Each passage records the embedding model that made it, and a question is matched only to passages the same model embedded. After the deployment’s embedding model changes, the Sources tab says how many passages need embedding again and offers **Embed again**. Until then meaning search skips the older passages, keyword search still covers them, and each answer’s record notes how many were skipped.

## Changes to sources

[Source changes apply to later requests](/console/tasks/source-changes), even without a new release. Compare representative questions after changing the collection or retrieval settings.

## Good to know

- The relevance floor is a setting, not a guarantee of correctness. A passage that scores well can still be the wrong one; use comparisons and review to check the answers it supports.
- Deleting a document removes its passages from future retrieval. Answers that already cited it keep their record.
