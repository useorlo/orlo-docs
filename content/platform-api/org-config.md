---
title: "Organization settings"
description: "Read and update org-level configuration"
---

# Organization settings

Organization settings provide defaults for tasks in that organization.

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

- Changes apply to organization defaults; they do not create a task version.
- This endpoint is useful for organization-wide defaults, not task-versioned behavior.

