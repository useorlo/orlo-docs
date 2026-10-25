---
title: "How do I require a tested agent configuration in production?"
description: "Adopt a passing confirmatory configuration and bind each production run to its exact manifest."
sidebar_title: "Require a tested agent configuration"
order: 21
---

# How do I require a tested agent configuration in production?

Adopt a candidate that passed a confirmatory complete-workflow comparison, set the task’s complete-workflow policy to required, and send the returned qualification ID with the exact frozen manifest when each production session starts. Orlo refuses a missing, inactive, or changed configuration before the run begins.

## Adopt evidence before enforcing it

In the task’s **Changes** tab, open a completed comparison and choose **Use configuration**. This is an explicit human action. Development scenarios cannot qualify a production configuration, and a comparison that is inconclusive, regressed, or invalid cannot be adopted.

The qualification covers:

- agent artifact name, version, digest, and stated identity assurance;
- runtime name and version;
- model provider, requested model, and settings hash;
- task version;
- exact shared instruction versions and source-set version; and
- tool-schema and permission-specification hashes.

Changing any of these produces a different configuration. At session start, Orlo also verifies that the qualification still names the task’s current version and that the run binds the exact tested shared instruction versions. A label used to identify a comparison arm is not part of the executable identity.

## Require the binding

Set **Release policy → Complete agent workflow → Required**. Existing tasks stay advisory until an administrator changes this setting. In required mode, start the session with:

```json
{
  "task_id": "22222222-2222-4222-8222-222222222222",
  "goal": "Resolve the support case",
  "qualified_configuration": {
    "qualification_id": "55555555-5555-4555-8555-555555555555",
    "manifest": {
      "version": 1,
      "key": "candidate",
      "artifact": {
        "name": "support-agent",
        "version": "2026.10.25",
        "digest": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "identity_assurance": "declared"
      },
      "runtime": { "name": "node", "version": "22" },
      "model": {
        "provider": "openai",
        "requested_model_id": "gpt-5-mini",
        "settings_hash": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
      },
      "task_version_id": "33333333-3333-4333-8333-333333333333",
      "skill_version_ids": [],
      "source_set_version_id": null,
      "tool_schema_hash": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
      "permission_specification_hash": "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
    }
  }
}
```

Use the qualification object returned by Orlo rather than rebuilding the manifest from display text. The TypeScript `OrloAgentRun.start` input and Python `OrloLangGraphSession` both accept `qualified_configuration`.

## What the gate does and does not do

Orlo performs one indexed qualification check when the session starts and records the binding on the run. It does not scan trial history and adds no comparison work to each tool decision. Current permission rules, approvals, revocations, runtime limits, and containment remain authoritative after admission.

`identity_assurance: declared` means Orlo records the artifact identity supplied by the integration. It does not prove the bytes running elsewhere. Use `verified` only when your build or deployment integration independently establishes the artifact digest.

Adopting another passing configuration makes it active and keeps prior qualifications for deliberate rollback. A task standard change or any added, removed, or changed shared instruction requires new evidence. Retired shared instructions or unavailable sources make a qualification unusable even if it passed earlier.

[Test a complete workflow first](/console/tasks/test-complete-agent-workflows). [Create the production session](/platform-api/agent-governance#sessions).
