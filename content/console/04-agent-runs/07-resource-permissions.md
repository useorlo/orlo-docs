---
title: "How do I limit what customer data an agent may return?"
description: "Set permitted fields, record filters and result limits in an existing agent tool permission."
order: 7
---

# How do I limit what customer data an agent may return?

Add resource limits to the tool’s permission. For example, a support agent may return a customer’s name and account status, only for an open case assigned to the signed-in employee, up to one record. Your integration applies the permission before releasing data.

## Set the permission

1. Open the agent’s existing permissions and add or edit its tool rule.
2. Enable **Limit access to a resource**. Enter the resource type and operation supplied by your integration.
3. Choose the fields it may return, add required record filters, and set the maximum records. **More access limits** holds masks, removed fields, destinations and other ceilings.
4. If access depends on the person, add a verified identity condition. An owner or admin must first configure the identity provider in **Settings → Advanced**.
5. Save the permission. Existing organization restrictions still apply, and the strictest matching decision wins.

These are limits on one permission, not a separate permission system. Empty permitted field or destination sets block access. Editing a different limit preserves existing types and restrictions.

## What must be connected first?

Your developer registers the resource tool with the TypeScript SDK and implements each supported limit in its data handler. Unsupported limits stop the call before the handler runs. No external gateway is required; the handler can run in your application, tool or gateway.

See [the integration guide](/engineers/resource-permissions). An Orlo allow decision alone cannot prove that an external data system applied a filter.

## What does a reviewer see?

An action that requires approval appears in the existing review queue. **Review access limits** opens its exact fields, filters, ceilings and expiry for an authorized reviewer. Approval applies to that action once; changed arguments, identity facts or restrictions require a new decision.

## What does the result mean?

- **Orlo decided** is the permission decision.
- **Application reported** is the executor’s statement about what it applied. A successful tool with no explicit limit confirmation remains **unknown**.
- **Independently checked in a test** is a verifier’s observation of fixture state.

Resource arguments and results are omitted from ordinary step evidence, including result reports that omit resource metadata. Keep confidential rows and filters out of your own metadata and report details too.
