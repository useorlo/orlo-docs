---
title: "How do I send Orlo traces to my observability service?"
description: "Connect an OTLP collector, propagate trace context, and verify metadata-only runtime exports."
sidebar_title: "Export OpenTelemetry traces"
order: 18
---

# How do I send Orlo traces to my observability service?

Add a public HTTPS OTLP/HTTP JSON collector under **Settings → Notifications**, supply its authentication headers, and send a test span. Orlo exports sampled runtime metadata asynchronously. This connects Orlo activity to your observability service without exporting prompts, answers, tool arguments, or provider keys.

## Connect and verify the collector

Use the collector’s full trace-ingestion URL, usually ending in `/v1/traces`, and confirm it accepts OTLP/HTTP JSON. Each organization can configure one telemetry destination. Authentication headers are stored encrypted and are not returned by list operations.

Send a test span, then make a task request or submit a governed agent step. Check the collector and the destination’s delivery history. A successful test confirms delivery at that moment; monitor pending and dropped spans during normal use.

## Join the trace

Send a valid W3C `traceparent` on requests to connect supported Orlo spans to your application’s trace. Export follows sampling. It does not instrument arbitrary model or tool activity outside the submitted Orlo path. Keep your existing application instrumentation.

## Handle delivery problems

Telemetry uses the same durable delivery service as webhooks, with destination-specific retry delays and bounded queues. Once accepted into the queue, spans can survive a process restart; creating and enqueueing observations remains best effort. It is not a substitute for Orlo’s evidence record.

Inspect failed deliveries and replay them after repairing the collector. A partially accepted OTLP batch cannot be replayed because Orlo cannot identify which spans the collector rejected. Watch dropped-span counts and reconcile against your own monitoring needs.

[Telemetry API](/platform-api/telemetry-destinations). [Webhook retry behavior](/engineers/webhook-delivery-fails).
