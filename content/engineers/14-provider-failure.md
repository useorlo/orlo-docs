---
title: "What happens when a model provider fails?"
description: "Understand temporary provider fallback, paused providers, and errors your application must handle."
sidebar_title: "Provider failures"
order: 14
---

# What happens when a model provider fails?

Orlo can try one configured, available fallback after a temporary transport, throttling, or provider-server failure while the request still has time remaining. Authentication failures, unreadable responses, and suspected credential exposure do not trigger fallback. Your application must handle the final error.

## Recover the request

For a rejected credential, replace or repair the key and test access. For a retired or unavailable model, compare a supported replacement before releasing it. For temporary capacity failures, follow `Retry-After` when supplied and use bounded retries within your application’s deadline.

Repeated provider failures can temporarily pause calls, returning `503 PROVIDER_PAUSED`. Routing does not promise automatic health-based selection of another provider. A configured fallback is separate from selecting a release using a routing policy.

`504 INFERENCE_TIMEOUT` means Orlo could not finish within the request deadline. Preserve the request’s correlation information when investigating. [Read inference errors and recovery](/platform-api/inference#errors-and-recovery).
