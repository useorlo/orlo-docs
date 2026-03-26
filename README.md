# Orlo Docs

Standalone documentation site for Orlo, powered by `f0`.

## Hosts

- Docs: `https://docs.useorlo.com`
- Platform API: `https://api.useorlo.com`

## What this repo contains

This repo publishes documentation for two connected surfaces:

- **Orlo Open Core** — public packages, Studio components, validation, runtime adapters, and SDKs
- **Orlo Platform** — the hosted/private multi-tenant control plane and its public integration APIs

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Then open `http://localhost:3000`.

## Deployment

- [Deployment Guide](./DEPLOYMENT.md)
- [Production Environment Template](./.env.production.example)

## Environment

The docs site is configured as a public docs deployment by default.

Key values:

- `AUTH_MODE=public`
- `F0_MODE=docs`
- `NUXT_PUBLIC_SITE_NAME=Orlo`
- `NUXT_PUBLIC_SITE_DESCRIPTION=Orlo Documentation`
- `NUXT_PUBLIC_SITE_URL=https://docs.useorlo.com`

## Content source

All docs content lives under `content/`.

The authored source was prepared from the private Orlo monorepo and copied here so this repository can be published and deployed independently.

## Powered by

This site uses the `f0` documentation engine as its runtime and rendering layer.
