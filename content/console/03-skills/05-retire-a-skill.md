---
title: "What happens when I retire a skill version?"
description: "Block new retrievals and bindings, then replace any existing releases that use the retired instructions."
sidebar_title: "Retire a version"
order: 5
---

# What happens when I retire a skill version?

Retirement blocks new retrievals and new bindings to that version. Existing task releases keep using their pinned instructions until you replace them and release again. If those tasks must stop now, archive them; retirement cannot remove instructions already downloaded or loaded into an AI conversation.

## Steps and permissions

Retire a version to prevent new retrievals and new bindings. Retirement asks for a reason of up to 1,000 characters, which is recorded with who retired it. After that:

- the version cannot be published again; save corrected instructions as a new version instead,
- runtime keys and the AI-tool connector can no longer discover or fetch it,
- a task that still pins it cannot be released until the task’s standard replaces it,
- existing records keep their reference, so the history still says what ran.

Retiring the default leaves the skill with no discoverable version until another is published. Existing task releases continue using their pinned versions until you replace the skill and release the updated task. Retirement does not stop those releases. If a task must stop immediately, archive it while you prepare the replacement. Retirement also cannot pull back files already installed or instructions already in an app’s context.

Skill contributors can import and save drafts. Skill managers and admins can publish and retire. [See the shared-skills workflow](/console/skills/shared-skills).
