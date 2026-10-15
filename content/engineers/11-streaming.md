---
title: "Can my application keep streaming model responses?"
description: "Keep direct agent streaming, or request complete checked answers through task inference."
sidebar_title: "Streaming responses"
order: 11
---

# Can my application keep streaming model responses?

Yes, an agent can keep its direct provider stream while Orlo checks its tool actions. Task inference returns a complete checked answer and does not stream tokens. Sending `stream: true` to Orlo’s chat-completions endpoint returns `400 INVALID_INPUT` before a model call.

## Choose the path that fits

For an agent, keep the model call in your provider client or framework and put the SDK around the tool dispatcher. This lets tool permissions apply without routing every token through Orlo. The current model wrappers handle completed outputs; they are not streaming adapters.

If an output must pass rules before a person sees it, buffer the answer and wait for the model-output decision. Displaying a stream first means the person has already seen content a later check might reject.

For a task, omit `stream` or set it to `false`. Check the response’s validation result before using the complete answer.

[See both request paths](/start/how-orlo-works), [the TypeScript integration](/engineers/agent-sdk-typescript), and [chat compatibility](/engineers/chat-completions).
