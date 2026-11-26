# Matt Verry - Personal Site

My personal site and blog, built with [Analog](https://analogjs.org/), [Angular](https://angular.dev/) v22, and [Tailwind CSS](https://tailwindcss.com/). Deployed on [Firebase Hosting](https://firebase.google.com/docs/hosting).

Inspired and based on [Nelson's blog](https://github.com/nelsongutidev).

## Requirements

Node `^24.15.0 || >=26.0.0` — that is, Node 24 LTS at 24.15 or later, or Node
26 and above. Note that this excludes Node 25: Angular 22 supports only
even-numbered (LTS) Node lines. This is the range enforced by the `engines`
field in `package.json`; `.nvmrc` pins the version used locally and in CI.

## Development server

```bash
npm run dev
```

App will be served at `http://localhost:5173`.

## Build

```bash
npm run build
```

Output is generated in `dist/analog/public` for static hosting, which is the
directory Firebase Hosting serves (see `firebase.json`).

## Tests

```bash
npm test
```

Vitest runs the specs in `src/**/*.spec.ts` in a jsdom environment, using
`vitest.config.ts` (separate from the app's `vite.config.ts`).

## Blog

Blog posts are markdown files in `src/content/blog/`. Add a new `.md` file with frontmatter to create a post:

```markdown
---
title: 'My Post'
description: 'A short description'
date: 'Mon Jan 1 2024'
tags:
    - Angular
published: true
slug: 'my-post'
---

Your content here...
```

Posts with `published: true` will appear on the blog page automatically.

## Can I use this project?

Feel free to use this code. Create your own blog or site, style it however you like, and ship it. Just try to make it your own.
