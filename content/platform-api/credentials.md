---
title: Credentials
description: Store provider and object storage credentials
---

# Credentials

Credentials let each org supply its own provider keys and optional object storage configuration.

## Endpoints

### `POST /v1/credentials`

Store an encrypted provider credential.

Supported providers:

- `openai`
- `anthropic`
- `vllm`
- `llama_cpp`
- `custom`
- `object_storage`

Request fields:

- `provider`
- `label`
- `api_key`
- optional `base_url`

### Object storage credentials

For `provider = "object_storage"`:

- `api_key` holds the secret key
- `base_url` is a JSON string containing at least:
  - `bucket`
  - `accessKey`

You can also include fields like:

- `region`
- `endpoint`
- `pathPrefix`

### `GET /v1/credentials`

List credentials without decrypted secrets.

### `DELETE /v1/credentials/:id`

Deactivate a credential.

## Example

```bash
curl https://api.useorlo.com/v1/credentials \
  -H 'Content-Type: application/json' \
  -H 'X-Orlo-Org-Id: <org-uuid>' \
  -d '{
    "provider": "object_storage",
    "label": "Org bucket",
    "api_key": "<secret-access-key>",
    "base_url": "{\"bucket\":\"org-docs\",\"accessKey\":\"AKIA...\",\"region\":\"us-east-1\"}"
  }'
```

