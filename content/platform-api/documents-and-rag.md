---
title: "Documents and RAG"
description: "Document ingestion, PDF flow, and retrieval-backed task context"
---

# Documents and RAG

Orlo supports task-scoped retrieval context through uploaded documents and retrieval chunks.

## Supported document flows

### Inline text and markdown

`POST /v1/tasks/:task_id/documents`

Supported content types:

- `text/plain`
- `text/markdown`

The API accepts the document with `202`. Processing prepares passages for retrieval; read the document status before relying on it in answers.

### Pre-chunked content

`POST /v1/tasks/:task_id/documents`

Provide a `chunks[]` array to skip Orlo's inline chunking and go straight to embedding.

### Inline PDF upload

`POST /v1/tasks/:task_id/documents`

PDF-specific notes:

- requires `content_base64`
- currently for born-digital PDFs
- limited by inline upload size settings
- processes the document in the background

### Direct PDF upload

For larger PDFs:

1. `POST /v1/tasks/:task_id/documents/uploads`
2. upload the binary to the returned storage URL
3. `POST /v1/tasks/:task_id/documents/:id/finalize`

This is the preferred flow for larger PDFs.

## Read and manage documents

- `GET /v1/tasks/:task_id/documents`
- `GET /v1/tasks/:task_id/documents/:id`
- `DELETE /v1/tasks/:task_id/documents/:id`

## Notes

- PDF extraction is asynchronous.
- Retrieval is task-scoped, so multiple documents under the same task can contribute context.
- Use PDFs with selectable text. Scanned documents need OCR before upload unless your deployment supports it.

