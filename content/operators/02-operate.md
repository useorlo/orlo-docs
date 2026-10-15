---
title: "Operate and recover"
description: "Maintain versions, access, provider availability, backups, and recovery for a self-hosted deployment."
order: 2
---

# Operate and recover

Keep the deployment runbook with the release package and make it available to authorized operators. The operator console manages tenant metadata and catalog administration; it does not grant routine access to tenant work.

## Upgrades

[Upgrade using a tested release and recovery plan](/operators/upgrade). Keep application images, configuration, and migrations aligned, then verify sign-in and each configured workflow.

## Backups and recovery

[Back up data and the keys needed to restore it](/operators/backup-and-restore). Test restoration in an isolated environment and follow the release-specific inventory for your installation.

## Provider and model changes

Review catalog changes that need an operator decision. Before retiring a model, inspect affected live releases and coordinate replacement comparisons with their owners. A retirement preserves history but prevents further use of that model through Orlo.

Provider listing checks show recorded access, not a guarantee of quota or successful inference. Keep response monitoring and application error handling in place.

## Access and notifications

Review operator access, organization administrators, expiring memberships, and runtime keys. Removing a person’s membership does not revoke independent runtime keys or remove previously downloaded skill files. Test approval notices after changing email or webhook configuration.

## Capacity and service health

Use the supported deployment configuration for your expected workload. Monitor request latency, provider failures, background work, and storage growth. Apply the release’s scaling guidance and test representative workloads before expanding traffic.

For a user-facing issue, start with [Troubleshooting](/start/troubleshooting). Privileged recovery steps belong in the deployment runbook.
