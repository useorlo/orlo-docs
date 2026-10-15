---
title: "How do I use a shared skill in my AI app?"
description: "Find a published skill, connect your AI app, and confirm retrieval of the exact version."
sidebar_title: "Skills in your AI app"
order: 4
---

# How do I use a shared skill in my AI app?

Select a published skill in Orlo, connect your AI app under your own Orlo sign-in, and send the console’s exact-version request. Use **Check retrieval** to confirm the app received it. You need Skill contributor, Skill manager, or admin access; no task or runtime key is needed.

## 1. Choose published instructions

Open **Skills** and select a published, non-retired version. Read its instructions and supporting files. Follow its AI-app connection action so the console keeps the exact skill and version selected.

![Published support-triage version in the console, with its owner, version selector, instructions, and supporting file](./assets/images/console/skill-version.jpg)

*Check the published version and its instructions before connecting an app.*

If the library is empty, a contributor can import a `.md`, `.zip`, `.skill`, or supported JSON package, or write a draft. A skill manager or admin reviews and publishes it. See [Shared skills](/console/skills/shared-skills).

## 2. Connect your AI app

Open **Connect → Use skills in your AI app** and copy the server URL. In your app’s custom connector or MCP setup, add that URL with OAuth and automatic client registration. Sign in to Orlo and select the intended organization, then enable the connection for the conversation.

Your Orlo account grants access to the organization’s skills. It does not require your AI-app account to belong to the same enterprise. A personal account can be used when its app supports custom connections and your organization permits that use. The host’s plan, workspace permissions, and data policies still apply.

Hosted connectors need a reachable HTTPS address. They cannot reach an Orlo server at `localhost` on your computer directly. If the host does not offer custom connections, ask its administrator or use a supported manual package import. Manual import does not create a connector retrieval record.

## 3. Retrieve the selected version

Choose **Copy request** in the console and send it in the connected app. The request includes exact skill and version IDs. Ask the app to apply those instructions to a suitable example of your work.

Return to Orlo and choose **Check retrieval**. Confirm the selected version, app, and retrieval time.

![The Connect page keeps support-triage version 1 selected and offers Copy request and Check retrieval](./assets/images/console/skill-connect.jpg)

*Copy the exact-version request, then check that the app retrieved it. The card shows when retrieval has not happened yet.*

**Your first result:** the exact published version was retrieved by your connected app. This is evidence of delivery; it does not prove the assistant followed the instructions.

## Manage the connection

Under **Connect → AI app connections**, disconnect an app when it no longer needs access. A connection is personal and scoped to one organization. Access also depends on your current membership permissions. Disconnecting or retiring a skill blocks future access; it cannot remove text already loaded into a conversation or downloaded as files.

For Claude Code and application agents, see [Skills in applications](/engineers/skills-in-tools).

## Related questions

- [Can I use a personal AI account?](/start/personal-ai-account)
- [Why has the app not retrieved the skill?](/start/skill-not-retrieved)
