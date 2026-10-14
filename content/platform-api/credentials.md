---
title: "Credentials"
description: "Store, test, rename, and deactivate organization provider credentials without exposing the stored secret."
---

# Credentials

Credentials let your organization use its own model provider keys and optional object storage. Orlo encrypts the secret and returns metadata when you list credentials. See [Provider key security](/engineers/provider-key-security) for the protection, server-side use, and revocation boundaries.

Console users manage keys under **Settings → Keys**. API callers need `credentials.read` to list keys, or `credentials.write` to create, rename, test, or deactivate them. Keep these scopes off keys used only for task inference.

## Endpoints

| Method | Path | Result |
| --- | --- | --- |
| `POST` | `/v1/credentials` | Store a credential; return `id`, `provider`, `label`, and the supplied `base_url` |
| `GET` | `/v1/credentials` | Return a `credentials` array of metadata, including `last_check`; no secret values |
| `PATCH` | `/v1/credentials/:id` | Rename a credential with `{ "label": "Production" }`; return its metadata in `credential` |
| `POST` | `/v1/credentials/:id/test` | Record provider access; return `id`, `status`, `message`, `model_count`, and up to 50 model names |
| `DELETE` | `/v1/credentials/:id` | Deactivate the credential; return `204` with no body |

A successful key check confirms the provider accepted the check. It does not guarantee inference quota or success for every model. See [model availability states](/platform-api/models).

## Store a provider key

| Field | Type | Meaning |
| --- | --- | --- |
| `provider` | string | `openai`, `anthropic`, `vllm`, `llama_cpp`, `cloudflare`, `huggingface`, `custom`, or `object_storage` |
| `label` | string | A name your team can recognize; do not include the key |
| `api_key` | string | Provider secret; may be empty for a vLLM or llama.cpp endpoint that does not require authentication |
| `base_url` | string, optional | Provider endpoint. For Cloudflare, use the account ID. For object storage, use the JSON configuration below |

Use HTTPS for provider URLs. Custom addresses must be public unless your deployment explicitly permits private addresses.

```bash
curl https://api.useorlo.com/v1/credentials \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ORLO_API_KEY" \
  -d '{
    "provider": "openai",
    "label": "Production",
    "api_key": "<your-provider-key>"
  }'
```

Response (`201`):

```json
{
  "id": "11111111-1111-4111-8111-111111111111",
  "provider": "openai",
  "label": "Production"
}
```

The newest active key for a provider is used for new lookups. To rotate, add and test the replacement, then deactivate the old key. Deactivation does not revoke the token at the provider. See [Replace or revoke a key](/engineers/provider-key-security#replace-or-revoke-a-key).

## Object storage credentials

For `provider = "object_storage"`, put the secret access key in `api_key`. Set `base_url` to a JSON string with `bucket` and `accessKey`. Optional fields include `region`, `endpoint`, and `pathPrefix`.

```json
{
  "provider": "object_storage",
  "label": "Organization documents",
  "api_key": "<secret-access-key>",
  "base_url": "{\"bucket\":\"org-docs\",\"accessKey\":\"<access-key-id>\",\"region\":\"us-east-1\"}"
}
```

The [OpenAPI reference](/platform-api/openapi) includes the request and response fields and examples.
