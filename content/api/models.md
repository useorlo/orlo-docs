---
title: Models
description: List the active model catalog visible to an org
---

# Models

The model catalog is tenant-facing and filtered by provider credential availability.

## Endpoints

### `GET /v1/models`

List active models available to the org.

Optional query parameters:

- `runtime`
- `provider`

Each model includes `has_credentials` so you can tell whether the org has an active provider credential for that provider.

### `GET /v1/models/:id`

Get one model.

## Notes

- The catalog is not org-owned data, but Orlo filters it through org credential availability for a better tenant experience.

