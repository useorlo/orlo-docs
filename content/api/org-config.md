---
title: Org Config
description: Read and update org-level configuration
---

# Org Config

Org config stores tenant-level defaults and overrides.

## Endpoints

### `GET /v1/orgs/config`

Get the current org config object.

### `PUT /v1/orgs/config`

Shallow-merge updates into the current org config.

Request shape:

```json
{
  "config": {
    "key": "value"
  }
}
```

## Notes

- Updates invalidate Orlo's cached config view for the org.
- This endpoint is useful for tenant-wide defaults, not task-versioned behavior.

