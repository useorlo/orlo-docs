---
title: "Models and the judge"
description: "The model catalog, provider keys, which models a task may use, and which model scores comparisons."
order: 2
---

# Models and the judge

*Who can do this: Admins here.*

## The catalog

**Settings → Models** lists the models Orlo knows: provider, name, context size, recorded prices, and status. The catalog is kept current from a public source every six hours by the people who run the deployment; unfamiliar models and large price changes wait for their review. A model can be marked deprecated or retired, and a live release whose model is marked opens a signal in your Inbox.

**Test key** records provider access. The catalog distinguishes **Key needed**, **Key needs attention**, **Access not checked**, **Listed by provider**, **Not listed for this key**, and **Retired**. Unverified access can be tried. Absence blocks selection only after a recent, complete model-list check. A provider listing does not guarantee quota or inference success. [Availability states](/platform-api/models) explains the API fields.

## Provider keys

Add keys under **Settings → Keys** for your model providers or an endpoint you run. A key belongs to the organization, is encrypted at rest, and can be labeled, tested, and removed. The console never returns the stored secret. [Provider key security](/engineers/provider-key-security) explains how Orlo stores and uses it.

To replace a key, add and test the new one before removing the old one. Removing a key deactivates it in Orlo; it does not revoke it with the provider. Orlo can use another active key for the same provider. If none remains, requests that need that provider cannot proceed.

An address you give on a credential must be public unless the people who run the deployment allow private addresses.

## Per-task shortlist

A task can keep a shortlist of the models it may use, so comparisons offer the right candidates and a release cannot drift to a model nobody chose. Set it under the task’s **Standard → Models** section.

## The judge

The judge is the model that scores answers against the rubric in a comparison. It is never a candidate in the comparison it judges. Which model judges is chosen in this order:

1. the comparison request names one,
2. the task names one, under its **Standard → Models** section,
3. the organization names one, under **Settings → Models**,
4. otherwise Orlo picks automatically from the models the organization has a key for.

The judge used is stored with each comparison. A second judge with an agreement threshold flags examples where the two disagree. **Judge shift** opens a signal when the judge’s view of the same model on the same examples moves between two comparisons.

Reviewer corrections improve the examples the judge scores against.

## Adapters

A release can use a LoRA adapter you trained elsewhere and register for an open model endpoint, with the `lora` strategy.
