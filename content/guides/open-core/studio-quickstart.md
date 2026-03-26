---
title: Studio Quickstart
description: Embed Orlo Studio Web Components
---

# Studio Quickstart

`@orlo/studio` provides framework-agnostic Web Components.

## What it is best for today

- embedding Orlo-native UI into team portals
- shipping a standalone Orlo Studio shell
- reusing evaluation and governance widgets

## Example

```html
<script type="module" src="/path/to/orlo-studio.js"></script>

<orlo-studio-shell
  api-base="https://api.useorlo.com"
  org-id="00000000-0000-0000-0000-000000000001">
</orlo-studio-shell>
```

## Important note

Many Studio components assume the Orlo Platform API contract and org-scoped headers. They are reusable, but they are not a generic BI/dashboard kit.
