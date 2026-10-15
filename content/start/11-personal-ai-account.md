---
title: "Can I use my organization’s skills in a personal AI account?"
description: "Connect personal AI apps through Orlo identity, subject to host support and organization policy."
sidebar_title: "Personal AI accounts"
order: 11
---

# Can I use my organization’s skills in a personal AI account?

Yes, when your AI app supports the custom connection and your organization permits its use. Orlo checks your Orlo sign-in and organization membership, not whether your Claude or ChatGPT account belongs to the same enterprise. The host app’s plan, workspace permissions, and data policies still apply.

## Connect with your own identity

Open **Connect → Use skills in your AI app** in Orlo. Add the supplied server URL in your app’s custom connector or MCP setup, sign in to Orlo, choose the organization, and enable the connection in the conversation. You need Skill contributor, Skill manager, or admin access to retrieve skills.

The connection is read-only, personal, and scoped to one organization. It retrieves published, non-retired instructions; it does not route the app’s model calls through Orlo or collect its conversation history. Each retrieval records the person, app, exact version, and content hash.

Disconnect it under **Connect → AI app connections** to stop future retrievals. Revocation cannot remove instructions already loaded into a conversation or downloaded as files.

[Connect and verify a shared skill](/start/team-skills).
