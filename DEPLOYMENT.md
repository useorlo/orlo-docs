# Orlo Docs Deployment

This repository is a standalone Nuxt-based docs site for **Orlo Documentation**, powered by `f0`.

It is intended to serve:

- `https://docs.useorlo.com`

The documentation itself references the Orlo Platform API at:

- `https://api.useorlo.com`

## Recommended path: Coolify

For `docs.useorlo.com`, the recommended deployment target is a **Coolify Docker Compose application**.

Use:

- [`docker-compose.prod.yml`](./docker-compose.prod.yml)

### Coolify setup

1. Create a new Docker Compose application in Coolify
2. Point it at:

```text
git@github.com:useorlo/orlo-docs.git
```

3. Select:

- compose file: `docker-compose.prod.yml`

4. In Coolify, configure the application domain for:

- `docs.useorlo.com`

5. In the Coolify domain field, include the internal container port so Coolify knows where to route traffic:

- `https://docs.useorlo.com:3000`

6. Add the environment variables from:

- [`.env.production.example`](./.env.production.example)

Coolify will detect the environment variables referenced in the compose file and surface them in the UI.

### Why this compose file is different

The production compose file is intentionally Coolify-friendly:

- no host bind mounts
- no checked-in env file dependency
- content ships with the repo and image
- environment is expected from Coolify

That is the right default for this repo because the docs content is versioned in git and deployed together with the site.

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

On a self-managed server:

```bash
cp .env.production.example .env.production
set -a
source .env.production
set +a
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

## Persistent volumes

For the current Orlo docs repo, persistent volumes are **not required**.

That is intentional:

- the docs content is stored in git
- the production image already contains the content tree
- Coolify can redeploy safely from source without server-side content state

Only introduce mounted content volumes later if you intentionally want server-local content edits outside git.

## Coolify notes

- Coolify treats the compose file as the source of truth for Docker Compose deployments.
- Because this app listens on container port `3000`, the Coolify domain entry should include `:3000`.
- You do not need host port mappings for this deployment style.

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
