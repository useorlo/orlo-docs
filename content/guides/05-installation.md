---
title: Installation
description: Clone and work with the Orlo Open Core repository structure
order: 5
---

# Installation

## Prerequisites

- Node.js 20+
- npm 10+

## Clone the repository

```bash
git clone <public-orlo-repo-url> orlo
cd orlo
npm install
```

## Build everything

```bash
npm run build
```

## Typecheck

```bash
npm run typecheck
```

## Test

```bash
npm test
```

## Workspace Layout

- `apps/studio` — Web Components UI package
- `packages/shared` — shared contracts and utilities
- `packages/validation` — deterministic validation engine
- `packages/runtime-adapters` — reusable runtime adapters
- `packages/agent-sdk` — thin developer-facing agent governance client

:::info
Open Core can be installed and used on its own. You do not need the full managed platform to build with the public packages.
:::
