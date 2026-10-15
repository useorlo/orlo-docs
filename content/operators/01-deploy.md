---
title: "How do I deploy Orlo in my own environment?"
description: "Plan the configuration and checks for a self-hosted Orlo installation."
sidebar_title: "Deploy in your environment"
order: 1
---

# How do I deploy Orlo in my own environment?

Use the licensed deployment package for your release with persistent storage, protected secrets, and HTTPS console and API addresses. Orlo does not require Coolify; use the supported configuration for your host or orchestration platform and verify each workflow before production traffic.

## Before installation

| Prepare | Purpose |
| --- | --- |
| Console and API addresses with HTTPS | People and applications can reach the intended installation |
| A secret store and backup process | Credentials and encryption material survive upgrades and recovery |
| Persistent data and document storage | Task history, examples, and uploaded sources remain available |
| Provider access | Comparisons and task requests can reach approved model endpoints |
| Email delivery, if required | Invitations and approval notices reach the people responsible |
| A connector address, if using AI apps | Hosted apps can reach the OAuth and MCP endpoints |
| Administrative ownership | Named people can operate and recover the installation |

Follow the release-specific guide for network boundaries, supported infrastructure, and privileged configuration. Do not expose administrative services as public application endpoints.

## Verify the installation

1. Confirm the service health checks defined by the deployment guide pass.
2. Open the console and create or sign in to the intended organization.
3. Invite a colleague and confirm the invitation and granted access work.
4. Add and test a provider key, compare a starter task, and send a live test request.
5. Run the [agent connection check](/start/first-agent) if agents will use the installation.
6. Retrieve a published skill from an AI app if the [connector](/start/team-skills) is enabled.
7. Confirm configured notifications arrive and verify your backup procedure.

Model comparisons and live task requests use your provider account and can incur charges. The agent connection check itself does not call a model.

## Private model endpoints

Use the deployment’s approved network configuration for model servers on a private network. An organization’s provider credential alone should not grant arbitrary network access. Confirm endpoint compatibility and access with the deployment administrator before creating a release.

## Plan ongoing operation

Before production use, agree on availability, retention, restore objectives, upgrades, and who responds to failures. [Operate and recover](/operators/operate) lists the recurring checks.
