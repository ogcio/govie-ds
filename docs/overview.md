# Gov IE Design System — Project Overview

This overview provides a concise description of the Gov IE Design System ("govie-ds"), how to run it locally, and where to find deeper technical details.

## What this project is

Gov IE Design System provides code and assets to build consistent, accessible UIs for Irish government platforms and services. It includes:

- A documentation site (Next.js) with guidance and usage examples
- Component libraries (HTML and, where applicable, React) and design tokens
- Storybook workspaces for interactive component development
- Visual regression testing setup
- CI configuration for builds and checks

## Repository layout (high level)

- `apps/`
  - [`docs`](../apps/docs/README.md) — Documentation site (Next.js) containing guidance, component docs, and examples

- `packages/`
  - `build/`
    - [`eslint-config`](../packages/build/eslint-config/README.md) — Shared ESLint configuration for the monorepo
    - [`prettier-config`](../packages/build/prettier-config/README.md) — Shared Prettier configuration for the monorepo
  - `design/`
    - `tokens` — Source design tokens for the Gov IE Design System (colors, spacing, typography, etc.)
    - `tokens-builder` — Build tooling to transform tokens into distributable formats
    - `token-utils` — Utilities for working with tokens in build and runtime contexts
    - `tailwind` — Tailwind utilities and presets wired to the design tokens
    - `theme-builder` — Tooling to generate theme artifacts (e.g., CSS variables) from tokens
    - `figma` — Scripts and configuration to produce Figma variable import files from tokens
  - [`html/ds`](../packages/html/ds/README.md) — HTML components and styles for the global components, plus Storybook for development
  - [`react/ds`](../packages/react/ds/README.md) — React component library implementing the design system components
  - `themes/`
    - `govie` — GOV IE core theme package (exports `theme.css`, variables, and assets)
    - `doete` — DOETE theme package aligning look-and-feel with that organisation’s branding
    - `hse` — HSE theme package aligning look-and-feel with that organisation’s branding

- `examples/` — Minimal integrations demonstrating usage with popular stacks
  - [`nextjs`](../examples/nextjs/README.md) — Example Next.js application consuming the design system
  - [`vite`](../examples/vite/README.md) — Example Vite application
  - `html` — Plain HTML usage example
  - [`angular`](../examples/angular/README.md) — Example Angular setup

- `docs/` — documentation
