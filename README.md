# Orlo Docs

The documentation site for Orlo at `https://docs.useorlo.com`, built on the [f0](https://github.com/folder0/f0) documentation engine.

- Content: `content/` (Markdown; `nav.md` sets the tabs, `_brand.md` the branding). See `docs/CONTENT-GUIDE.md`.
- Engine: everything else, copied from upstream f0 at the commit recorded in `.f0-engine-version`. Don't edit engine files here; upgrade by copying the next upstream version over them (see below).

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`. Check content before deploying:

```bash
npm run validate -- ./content
```

## Deploy

Coolify builds the repository's `Dockerfile` (default target `site`: the engine plus this repository's `content/` and `private/`). See [DEPLOYMENT.md](./DEPLOYMENT.md). Settings are read from the runtime environment under their `NUXT_` names; nothing is read at build time.

## Upgrade the engine

1. Clone upstream f0 at the commit or tag you want.
2. Run its census against this content and read the report: `node bin/f0-census.mjs ../orlo-docs/content`.
3. Replace every tracked file here except `content/`, `private/`, and the Orlo files (`README.md`, `DEPLOYMENT.md`, `.env.example`, `.env.production.example`, `docker-compose.prod.yml`, `.gitignore`) with the upstream copies, and update `.f0-engine-version`.
4. `npm install`, `npm run validate -- ./content`, `npm test`, `npm run build`, then build and run the image locally before deploying.

When f0 publishes its engine image publicly, this repository can drop the engine files and build `FROM ghcr.io/folder0/f0:<version>` instead; upstream's `templates/site/` has that layout.
