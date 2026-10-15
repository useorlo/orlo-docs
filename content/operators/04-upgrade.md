---
title: "How do I upgrade a self-hosted Orlo deployment?"
description: "Test the new release, preserve data and secrets, and verify workflows after deployment."
sidebar_title: "Upgrade a deployment"
order: 4
---

# How do I upgrade a self-hosted Orlo deployment?

Test the target release in a separate environment, back up the data and required secrets, then deploy its matching application images and migration configuration. Verify the full workflow after the change. Use the release-specific rollback instructions rather than assuming an older image can use a newer database.

## Before and after the upgrade

Read the release notes, back up data and required secrets, and test the upgrade in a separate environment. Follow the supplied migration and rollback instructions. Verify sign-in, one task request, one agent check, and configured notifications after the change.

Keep the API, gateway, workers, and console on a compatible release. Preserve persistent storage and the installation’s encryption and signing material. Confirm your console and API addresses, provider access, and connector address still match the deployment.

[Deployment prerequisites](/operators/deploy). [Backup and recovery](/operators/backup-and-restore).
