---
title: Retrieval and Documents
description: How Orlo Platform handles RAG documents and retrieval
---

# Retrieval and Documents

Orlo Platform supports task-scoped document ingestion and retrieval-backed inference.

## Documents

Documents attach to tasks. Current supported ingestion modes include:

- inline text
- inline markdown
- pre-chunked content
- PDF ingestion with async extraction

## Retrieval

Retrieval is task-scoped. Multiple documents under the same task can contribute context to one inference.

## PDF flow

PDFs are handled asynchronously:

1. upload or start direct upload
2. finalize the document
3. extract text
4. chunk content
5. embed chunks
6. mark the document ready

## Attribution

Retrieval-backed inference returns attribution in debug/audit contexts so you can inspect what source material contributed to the response.
