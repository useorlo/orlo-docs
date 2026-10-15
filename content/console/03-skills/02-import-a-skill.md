---
title: "How do I import an existing skill?"
description: "Import Markdown or packaged skills, review the files, and save a draft for publication."
sidebar_title: "Import a skill"
order: 2
---

# How do I import an existing skill?

Open **Skills → Import skill** and upload a `.md`, `.zip`, `.skill`, or supported `.json` package. Review its instructions and files, then save a draft. A skill manager or admin must publish that version before employees or application agents can retrieve it.

## Steps and permissions

**Skills → New skill** takes a name (lowercase letters, numbers, and single hyphens, such as `support-triage`), an owner, a one-line description that says when to use it, and the instructions. A skill can carry up to 24 supporting text files under `references/`, `scripts/`, or `assets/`, plus a root `LICENSE`, `NOTICE`, or `README`, totaling at most 256 KiB. Scripts are distributed as text and never run.

Saving makes a new draft version; content is never edited in place. Two people editing at once get a conflict, and the second one reloads. Use **Import skill** for `.md`, `.zip`, `.skill`, or supported `.json` packages. Review the imported instructions and files before saving; import creates a draft, not a publication.

Skill contributors can import and save drafts. Skill managers and admins can publish and retire. [See the shared-skills workflow](/console/skills/shared-skills).
