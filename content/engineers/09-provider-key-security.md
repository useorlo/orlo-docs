---
title: "How does Orlo protect model provider keys?"
description: "How Orlo protects provider credentials, where they are used, and how to replace or revoke a key."
sidebar_title: "Provider key protection"
order: 9
---

# How does Orlo protect model provider keys?

Orlo encrypts stored provider keys, limits their use to the owning organization, and sends them to the provider as server-side authentication. Credential reads never return the secret. Shared error handling and credential-aware output checks reject recognized credential echoes before accepting model responses.

If your agent calls its model directly, the provider key stays in your runtime. You do not need to give Orlo that key to use [agent tool permissions](/start/how-orlo-works#agent-permissions-check-actions-in-your-runtime).

## Three different credentials

| Credential | Purpose | Where it is used |
| --- | --- | --- |
| Provider key | Pay for and authorize calls to a model provider | Orlo for task inference and comparisons; your runtime for direct agent model calls |
| Orlo runtime key | Authorize your application to use selected Orlo APIs | Your server or agent runtime |
| Employee sign-in | Use the console or connect an AI app to shared skills | The console or an [OAuth connection](/start/team-skills) |

Keep runtime keys in server-side secrets. Do not put them in browser code, mobile bundles, prompts, or shared skills. Give each integration only the scopes it needs.

## How stored provider keys are protected

- **Encrypted storage.** Orlo encrypts provider secrets with AES-256-GCM, with a fresh random nonce for each encryption. The authentication tag detects changes to the encrypted value. The encryption secret is held separately from the database.
- **Organization-scoped access.** Credential lookups are restricted to the requesting organization. Console key management requires an admin; API access requires the appropriate `credentials.read` or `credentials.write` scope. A key used only for inference does not need either scope.
- **No secret in credential reads.** The console and credential-list API receive labels, provider information, and check results. They do not receive the stored key or its encrypted value.
- **Server-side use.** Orlo decrypts the key when needed and sends it to the provider as authentication. Model adapters refuse redirects, so a provider cannot redirect the authenticated request to another address.
- **Safe failure messages.** Task inference and comparison model-call failures include the provider's HTTP status and recovery guidance. Orlo discards the provider's error body, which could otherwise repeat a credential or prompt.

Use HTTPS for the Orlo API and any custom provider endpoint. Provider keys belong in the credential secret field; do not place them in labels or endpoint URLs.

Orlo must be able to decrypt a stored provider key to call the provider. This protects database storage; it does not keep the key inaccessible to the authorized server process or to someone who compromises that process and its encryption secret.

## Replace or revoke a key

1. Add the replacement under **Settings → Keys**. The newest active key for a provider is used for new lookups.
2. Select **Test key**, then run a small task request or comparison to confirm access and quota.
3. Remove the old key from Orlo and revoke it with the provider when it is no longer needed.

Removing a key in Orlo deactivates it; it does not revoke the provider's token or erase its encrypted record. In-flight calls may finish, and another server instance may briefly retain an embedding credential in memory. If another active key exists for the provider, Orlo can use that key. For an immediate provider-side revocation, revoke the token with the provider.

See the [credential API](/platform-api/credentials) for request fields and examples.
