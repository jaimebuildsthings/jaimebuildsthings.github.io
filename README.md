# jaimebuildsthings.dev

Personal site and blog. Blueprint (dark) / whiteprint (light) theme, built with [Astro](https://astro.build), hosted on GitHub Pages.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm run check    # type-check
```

Needs Node 22.12+.

## Edit the content

| What | Where |
| --- | --- |
| Email, one-line description, analytics token | `src/site.config.ts` |
| Hero bio, spec-sheet bio and table | `src/pages/index.astro` |
| Featured projects (name, status, summary, tags, links, image) | `src/data/projects.ts` |

Project images go in `public/images/` and are referenced as `/images/name.webp`. A project with no image gets no image box.

## Write a post

Add a Markdown file to `src/content/posts/`. The filename becomes the URL (`my-post.md` → `/log/my-post/`).

```markdown
---
title: 'What I learned building X'
description: 'One sentence for the log list and the RSS feed.'
date: 2026-10-20
tags: ['x']          # optional
draft: true         # optional: drafts only show in `npm run dev`
updated: 2026-10-22 # optional
---

Write here. `## Headings` get § numbers and a section list beside the post.
```

Revision letters (A, B, C …), drawing numbers (LOG-001 …) and reading time are worked out automatically from publish order and length. The homepage shows the latest four entries, and `/log/` lists them all. The feed is at `/rss.xml`.

## Deploy to GitHub Pages

1. Create an empty repo named `jaimebuildsthings.github.io` under your account, then from this folder:

   ```sh
   git init -b main
   git add -A
   git commit -m "Initial release"
   git remote add origin git@github.com:jaimebuildsthings/jaimebuildsthings.github.io.git
   git push -u origin main
   ```
2. In the repo go to **Settings → Pages** and set **Source** to **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
3. Still in **Settings → Pages**, set the custom domain to `jaimebuildsthings.dev`. The `public/CNAME` file already says the same thing.
4. At your DNS provider, add:
   - `A` records for `jaimebuildsthings.dev` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `AAAA` records → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` for `www` → `jaimebuildsthings.github.io`

   Check these against GitHub's docs ("Managing a custom domain for your GitHub Pages site") before saving. Leave your email (MX/TXT) records alone.
5. Once the certificate is issued, tick **Enforce HTTPS**. `.dev` domains only load over HTTPS.
6. Optional: verify the domain under your account's **Settings → Pages** so no other repo can claim it.

## Structure

```
src/
  site.config.ts        name, email, GitHub, nav
  data/projects.ts      homepage project cards
  content/posts/        blog posts (Markdown)
  content.config.ts     post frontmatter schema
  lib/posts.ts          revision letters, reading time, sorting
  layouts/Base.astro    sheet frame, header, title-block footer, fonts
  components/           Header, ThemeToggle, ExplodedView (Fig. 1), LogTable, TitleBlock
  pages/                index, log/, log/[slug], rss.xml, 404
  styles/global.css     theme tokens (dark + light), prose and code styles
public/                 CNAME, favicon, robots.txt
```

Fonts (Big Shoulders Display, IBM Plex Sans, IBM Plex Mono) are self-hosted through Fontsource. The only third-party request is the Cloudflare Web Analytics beacon, which loads only when `cfAnalyticsToken` is set in `src/site.config.ts`.
