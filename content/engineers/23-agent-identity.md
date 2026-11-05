---
title: "How does Orlo verify the person using an agent?"
description: "Use signed person identity for group permissions and record filters, with explicit handling when identity is unknown."
order: 23
---

# How does Orlo verify the person using an agent?

An owner or admin configures an identity profile in **Settings → Advanced**. It names the issuer, audiences, permitted signing algorithms, clients, token kind, lifetime, and typed claims. Supply public keys or a public HTTPS JWKS URL. The sample-token test returns claim names and verification status, never the token or claim values.

Pass the person's identity token through `identityTokenProvider` when starting a run. Orlo verifies its signature and profile against locally cached public keys. There is no identity-provider network request in the action path. Key sets refresh in the background; stale keys establish no verified facts. Orlo does not accept a runtime's assertion that a group or subject was verified.

Mapped facts are encrypted session state. An invalid or absent token cannot grant an identity-dependent allow or eliminate a potential restriction. Tokens must identify a person: opaque tokens, unsigned tokens, symmetric signing keys, SAML assertions, and client-credentials tokens are unsupported. An access-token profile additionally requires its type and person marker.

A refreshed token must identify the same provider, issuer, and subject and have a later issue time. An identical retry confirms current facts; after an admin changes the profile, Orlo verifies and maps the token again under that profile. The SDK asks your token provider again near expiry. Expired facts and facts from an older trust-profile revision become unknown. Ordinary refresh with unchanged relevant claims preserves an exact pending approval; changing a relevant claim or trust revision requires review again.

## What happens when identity is unknown?

The response includes `resource_identity.source: "unknown"`, a stable `reason`, and `retryable: true` when recovery may help. For example, `IDENTITY_KEYS_STALE` requires fresh public keys, `IDENTITY_TRUST_CHANGED` requires current verification, and `IDENTITY_TOKEN_EXPIRED` requires a fresh token from your application. The SDK asks for identity again on later actions and backs off repeated failures. It does not replay a refused action or refresh the person’s sign-in itself. No identity-dependent allow can rely on unknown facts.

A same-second token with different facts cannot replace the bound identity. A different subject needs a new run. A provider may withhold groups; `unavailable_claims` identifies those claim names so the application can explain why group access is unavailable.

See [apply resource permissions](/engineers/resource-permissions) and [set access limits in the console](/console/agent-runs/resource-permissions).
