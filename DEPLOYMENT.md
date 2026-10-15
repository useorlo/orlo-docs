# Orlo Docs Deployment

`docs.useorlo.com` runs as a Coolify Docker Compose application built from this repository. The site is public; there is no private mode, allowlist, or email to configure.

## Coolify

1. Application source: `git@github.com:useorlo/orlo-docs.git`, compose file `docker-compose.prod.yml`.
2. Domain: `https://docs.useorlo.com:3000` (the container listens on 3000).
3. Environment variables, from [`.env.production.example`](./.env.production.example), as **runtime** values. Untick "Available at Buildtime"; the build reads nothing from the environment. Use the `NUXT_` names: plain names such as `AUTH_MODE` are also accepted by this engine version, but `NUXT_` works on every version.
4. Health check: the compose file probes `/_ready`, which answers once content is loaded. Don't probe `/`.
5. Keep the Docker build cache between deploys (Coolify's Force Docker Cleanup off), or every deploy reinstalls dependencies.

Content ships inside the image: a content change is a commit and a redeploy. Changing only content reuses the cached engine build, so the deploy takes seconds.

## What the engine serves

Besides the pages: `/llms.txt` and `/llms-full.txt` (the whole site as text for AI tools), `/llms-index.txt`, every page's Markdown at its URL plus `.md`, `/sitemap.xml`, `/feed.xml`, `/api/search`, `/api/agents/search`, a read-only MCP server at `/mcp`, and the probes `/_health` and `/_ready`.

## Check after a deploy

```bash
curl -sI https://docs.useorlo.com/_ready | head -1
curl -s https://docs.useorlo.com/llms-index.txt | head -20
curl -sI https://docs.useorlo.com/start/first-task.md | head -3
```

## Roll back

Redeploy the previous commit in Coolify, or keep its image: the engine version is recorded in `.f0-engine-version`.
