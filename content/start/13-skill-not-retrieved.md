---
title: "Why is my AI app connected but not using the skill?"
description: "Request and verify an exact skill version after connecting your AI app."
sidebar_title: "Skill not retrieved"
order: 13
---

# Why is my AI app connected but not using the skill?

Connecting an app does not fetch a skill. Enable Orlo in the conversation, send the selected version’s **Copy request** from the console, then choose **Check retrieval**. The check confirms delivery of that version; it cannot prove the assistant followed the instructions.

## Verify the exact version

1. Open the published, non-retired skill version in **Skills**.
2. Choose **Use this version in an AI app** and confirm the intended organization.
3. Enable the connection in the host app and send **Copy request**.
4. Return to Orlo and choose **Check retrieval**. Inspect the version, app, and time.

If retrieval is still missing, check current membership access and whether the host supports custom connectors for your plan or workspace. Hosted apps need a reachable HTTPS address; they cannot reach your computer’s localhost directly.

Manual package import does not create a connector retrieval record. [Follow the illustrated connection guide](/start/team-skills).
