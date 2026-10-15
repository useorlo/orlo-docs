---
title: "How do I choose available models for my organization?"
description: "The model catalog, provider keys, which models a task may use, and which model scores comparisons."
sidebar_title: "Available models"
order: 2
---

# How do I choose available models for my organization?

Open **Settings → Models** to inspect model status and recorded provider access, then choose each task’s shortlist under **Standard → Models**. Test the provider key before relying on a model; a catalog listing alone does not guarantee quota or a successful request.

*Who can do this: Admins here.*

## The catalog

**Settings → Models** lists the models Orlo knows: provider, name, context size, recorded prices, and status. The catalog is kept current from a public source every six hours by the people who run the deployment; unfamiliar models and large price changes wait for their review. A model can be marked deprecated or retired, and a live release whose model is marked opens a signal in your Inbox.

**Test key** records provider access. The catalog distinguishes **Key needed**, **Key needs attention**, **Access not checked**, **Listed by provider**, **Not listed for this key**, and **Retired**. Unverified access can be tried. Absence blocks selection only after a recent, complete model-list check. A provider listing does not guarantee quota or inference success. [Availability states](/platform-api/models) explains the API fields.

## Provider keys

[Add or replace a provider key](/console/settings/add-a-provider-key). Test access before depending on a model; saving a key alone does not confirm it works.

## Per-task shortlist

A task can keep a shortlist of the models it may use, so comparisons offer the right candidates and a release cannot drift to a model nobody chose. Set it under the task’s **Standard → Models** section.

## The judge

[Choose the comparison judge](/console/settings/choose-a-judge). A request-specific judge takes precedence over the task’s choice, then the organization default, then automatic selection from eligible models.

## Adapters

A release can use a LoRA adapter you trained elsewhere and register for an open model endpoint, with the `lora` strategy.
