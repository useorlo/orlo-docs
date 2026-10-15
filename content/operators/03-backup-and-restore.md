---
title: "What must I back up to restore Orlo?"
description: "Protect persistent data and required encryption material, then test restoration."
sidebar_title: "Back up and restore"
order: 3
---

# What must I back up to restore Orlo?

Back up persistent application data, uploaded documents and archives, and the encryption and signing material required by your deployment. Include both provider-credential and operator-MFA encryption material. A database backup alone can leave restored credentials unreadable or prevent operator sign-in.

## Verify recovery

A complete recovery plan includes persistent application data, uploaded documents and archives, and the encryption and signing material required by the deployment. **Back up operator MFA encryption material as well as the provider-credential encryption material.** Restoring data without the corresponding keys can leave credentials unreadable or require operator sign-in recovery.

Store backups securely away from the running installation. Test restoration in an isolated environment and verify that authorized people can sign in and required credentials can be used. Do not assume all generated secrets can be recreated without consequences. Use the release-specific recovery guide for the exact inventory and commands.

After restoration, verify authorized sign-in, a task request, an agent permission check, and configured notifications. Use the installation’s release-specific runbook for secret locations and commands; keep those details in your operator documentation, not the public site.
