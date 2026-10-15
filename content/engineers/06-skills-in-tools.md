---
title: "Skills in applications"
description: "Published skills reach Claude and ChatGPT through a connector, Claude Code through an installer, and your own agents through the SDK. The version is the same everywhere."
order: 6
---

# Skills in applications

A published skill version is one set of instructions with a content hash. The same version reaches four places. Skill managers and admins publish the defaults in [Shared skills](/console/skills/shared-skills). For a personal AI app, follow [Use shared skills](/start/team-skills).

## Claude and ChatGPT

Use the read-only MCP connection under your Orlo sign-in. [Use shared skills](/start/team-skills) covers consent, host availability, exact-version retrieval, verification, and disconnecting. No runtime key is needed for this path.

The connector can search published skills, load an exact non-retired version, and read supporting files. It cannot edit or publish instructions or run tool calls. Retrieval is recorded without conversation history.

## Claude Code

First install `@orlo/agent-sdk@0.0.2` in your project. The package includes an installer that pins one exact version into a project:

```sh
npx --no-install orlo-skills install --skill <skill-id> --version <version-id> --project /path/to/project
```

Set `ORLO_API_URL`, `ORLO_ORG_ID`, and `ORLO_API_KEY` with a key that has `skills.read`. The installer requires HTTPS except for localhost, refuses redirects, verifies the content hash, and writes no credentials into the project. The skill appears at `.claude/skills/<name>/SKILL.md`, linked to files under `.orlo/skills/…` with a manifest of the ids and hash. Invoke it as `/<name>`.

Publishing a newer version does not change what is installed. To move, run the command with the new version id and `--replace`; earlier files stay. Reinstalling the same version verifies the files and refuses to overwrite local edits. Installation is per project, and on Windows a directory symlink needs Developer Mode or elevation.

## Your own agents

```ts
const { run, instructions, skills } = await OrloAgentRun.startWithSkills(
  client,
  { task_id, framework: 'custom-js-runtime', goal: 'Triage a support ticket' },
  [{ skillId, versionId }],
);
```

The SDK fetches each version, verifies its hash, and starts the run with the versions recorded on it. `instructions` is the text to give your model, in the order you listed; `skills` carries the supporting files. Scripts are never run. The key needs `skills.read` plus the agent scopes. Orlo refuses the run if a declared version is unpublished, retired, from another organization, or has a different hash.

## Task releases

A task pins versions in its standard; a release carries them. Nothing to do from code: `inference.run` is enough, because the release already resolved them.

## Other hosts

`GET /v1/skills/:id/versions/:versionId/package` returns a published version as `SKILL.md` plus its files, in the Agent Skills format, for any host that can take that format. There is no installer for other hosts.
