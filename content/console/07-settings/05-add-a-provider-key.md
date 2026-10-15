---
title: "How do I add or replace a model provider key?"
description: "Add, test, and replace an organization’s model provider credentials."
sidebar_title: "Add or replace provider keys"
order: 5
---

# How do I add or replace a model provider key?

An admin adds the provider credential in **Settings → Keys**, chooses **Test key**, and checks the result before comparing or running a task. To replace a key, add and test the replacement before removing the old one. Removing it in Orlo does not revoke it with the provider.

## Connect OpenRouter

Choose OpenRouter under **Settings → Keys**, enter the organization’s key, and select **Save and connect**. Orlo checks account access and refreshes the catalog of compatible text models. OpenRouter account restrictions still apply; image-only and video-only endpoints are excluded. You do not need a separate direct-provider connection for a model served through OpenRouter.

## Check access

Add keys under **Settings → Keys** for your model providers or an endpoint you run. A key belongs to the organization, is encrypted at rest, and can be labeled, tested, and removed. The console never returns the stored secret. [Provider key security](/engineers/provider-key-security) explains how Orlo stores and uses it.

To replace a key, add and test the new one before removing the old one. Removing a key deactivates it in Orlo; it does not revoke it with the provider. Orlo can use another active key for the same provider. If none remains, requests that need that provider cannot proceed.

An address you give on a credential must be public unless the people who run the deployment allow private addresses.

A model listing confirms recorded access, not remaining quota or a successful generation. A comparison with no returned answers has no usable quality score. [Recover a failed comparison](/console/tasks/comparison-failed).

[How does Orlo protect provider keys?](/engineers/provider-key-security)
