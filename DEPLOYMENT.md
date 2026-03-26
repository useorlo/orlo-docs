# Orlo Docs Deployment

This repository is a standalone Nuxt-based docs site for **Orlo Documentation**, powered by `f0`.

It is intended to serve:

- `https://docs.useorlo.com`

The documentation itself references the Orlo Platform API at:

- `https://api.useorlo.com`

## What to deploy

You can deploy this repo in either of these ways:

1. build and run it directly with Node
2. build and run it with Docker

For most server deployments, Docker is the simplest path.

## Production environment

Start from:

- [`.env.production.example`](./.env.production.example)

Create a real server file:

```bash
cp .env.production.example .env.production
```

For a normal public docs deployment, the key values are:

```env
NODE_ENV=production
AUTH_MODE=public
F0_MODE=docs
NUXT_PUBLIC_SITE_NAME=Orlo
NUXT_PUBLIC_SITE_DESCRIPTION=Orlo Documentation
NUXT_PUBLIC_SITE_URL=https://docs.useorlo.com
HOST=0.0.0.0
PORT=3000
```

## Option 1: Docker Compose

Use:

- [`docker-compose.prod.yml`](./docker-compose.prod.yml)

On the server:

```bash
cp .env.production.example .env.production
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```

Then put your reverse proxy in front of port `3000`.

## Option 2: Node runtime

On the server:

```bash
npm install
cp .env.production.example .env.production
set -a
source .env.production
set +a
npm run build
node .output/server/index.mjs
```

Use a process manager such as `systemd`, `pm2`, or your hosting platform's native service manager.

## Reverse proxy

Your reverse proxy should:

- terminate TLS for `docs.useorlo.com`
- forward traffic to `127.0.0.1:3000`
- preserve `Host` and `X-Forwarded-*` headers

Example Nginx shape:

```nginx
server {
    server_name docs.useorlo.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Content and brand

The repo already includes:

- the full Orlo docs content under `content/`
- Orlo-specific branding defaults in `content/_brand.md`
- Orlo site metadata defaults in `nuxt.config.ts`

If you later add brand assets, the natural place is:

- `content/assets/images/`

Then reference them from `content/_brand.md`.

## Git remote setup

This repo keeps the original `f0` remote as:

- `upstream`

Add your Orlo repo as `origin`:

```bash
git remote add origin git@github.com:useorlo/orlo-docs.git
git push -u origin main
```

## Validation and build

Before deploying, run:

```bash
npm run validate -- ./content
npm run build
```

Those commands were already run successfully during setup.
