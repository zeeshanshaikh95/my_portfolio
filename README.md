# Shaikh Zeeshan - Portfolio

A dark, responsive React portfolio for Shaikh Zeeshan, a Mumbai-based Full Stack MERN Developer. It combines polished UI motion with live public GitHub data, so the project showcase stays current without manual edits.

## Highlights

- Live GitHub profile, repositories, languages, activity, stars, and filters
- Responsive dark premium UI with Framer Motion, a command palette, terminal, email copy, scroll progress, and downloadable resume
- Vite + React + TypeScript + Tailwind CSS
- SEO metadata, social metadata, JSON-LD structured data, accessible form controls, and keyboard access to the command palette (`Ctrl/Cmd + K`)

## Run locally

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` only if you need to point the site at another public GitHub username. The default is `zeeshanshaikh95`.

```bash
pnpm run build
```

## Project structure

```text
src/
  hooks/useGithub.ts       Live GitHub loading and session cache
  lib/github.ts            GitHub REST API client
  App.tsx                  Portfolio sections and interactive components
  styles.css               Tailwind layers and custom visual system
public/
  Shaikh-Zeeshan-Resume.pdf
  favicon.svg
```

The GitHub REST endpoints used here are public and unauthenticated. For very high traffic deployments, add a server-side proxy or authenticated token flow to avoid GitHub's unauthenticated rate limit.
