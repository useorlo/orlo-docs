---
title: "Skills"
description: "Read the shared skills library and fetch published versions as packages. Writes belong to signed-in people."
---

# Skills

A skill is shared instructions with an owner and immutable versions. A runtime key with `skills.read` reads published, non-retired versions. Creating, editing, publishing, and retiring are people-only: a key gets `403 PEOPLE_ONLY`, whatever its scopes.

| Method and path | Purpose |
| --- | --- |
| `GET /v1/skills` | List the library. `limit` up to 200; pass `next_cursor` back as `before` for the next page. |
| `GET /v1/skills/:id` | The skill, its current version, and up to 100 version summaries. Keys see published, non-retired versions only. |
| `GET /v1/skills/:id/versions/:versionId` | One exact version with its content and files. |
| `GET /v1/skills/:id/versions/:versionId/package` | The version as `SKILL.md` plus supporting files, in the Agent Skills format. |
| `GET /v1/skills/:id/versions/:versionId/usage` | Up to 50 task references, the 10 latest comparisons, and the 10 latest agent runs that declared the version. |

A version record carries `content_hash`, a SHA-256 of its name and content, which the SDK and the installer verify.

Create, publish, and retire versions in the [Skills console](/console/skills/shared-skills). Retirement prevents new retrievals and bindings; existing release references and previously downloaded files remain.

## Limits

A name is 1–64 lowercase letters, numbers, and single hyphens. Instructions are at most 65,536 characters; up to 24 files under `references/`, `scripts/`, or `assets/`, or a root `LICENSE`, `NOTICE`, or `README`, totaling at most 256 KiB. The skills pinned to one task may not exceed 131,072 characters of instructions together.
