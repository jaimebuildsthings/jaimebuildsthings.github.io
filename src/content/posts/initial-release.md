---
title: 'This site goes live'
description: 'Rev A of this site — why it looks like an engineering drawing, what it is built with, and how it ships.'
date: 2026-10-17
tags: ['meta', 'astro', 'github-pages']
---

This is Rev A of jaimebuildsthings.dev. Every post on this site gets the next revision letter, so the log doubles as a changelog for the whole thing.

## Why a blueprint

I build things, so the site is drawn like a technical drawing: a sheet border, a grid, a title block in the footer, and an exploded view of how a build comes together — idea, experiment, code, test, ship, then back around.

It comes in two prints. **Blueprint** is the dark one; **whiteprint** is the light one. It follows your system setting, and the toggle in the header overrides it.

## What it is built with

- **Astro** for static pages, with posts written in Markdown
- **GitHub Pages** for hosting, deployed by a GitHub Actions workflow on every push to `main`
- **Big Shoulders Display**, **IBM Plex Sans** and **IBM Plex Mono** for type

A post is one Markdown file with a little frontmatter:

```markdown
---
title: 'What I learned building X'
description: 'One sentence for the log and the RSS feed.'
date: 2026-10-17
tags: ['x']
---

Write here.
```

> Revision letters are assigned by publish date, so the first post is A, the second is B, and so on.

## What’s next

Build logs, mostly. I’m in the middle of two hardware projects for autocross: [corner-scales](https://github.com/jaimebuildsthings/corner-scales), a set of wireless corner-weight scales in embedded Rust, and [pit-pyro](https://github.com/jaimebuildsthings/pit-pyro), a handheld tire pyrometer that reads three tread zones in one pull. Expect load-cell calibration, enclosure prints that didn’t fit, and whatever I break on the way to a car that’s actually on the scales.

I’ll also post updates on [Stringline](https://stringline.ing), and the occasional frontend lesson from the day job.

There’s an [RSS feed](/rss.xml) if you want to follow along.
