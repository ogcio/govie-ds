# Technical documentation

This document captures the minimum technical details needed to understand, build, test, and operate the Government of Ireland Design System ("govie-ds").

## Architecture overview

- Monorepo managed with pnpm workspaces
- Packages grouped by purpose:
  - Build tooling and shared configs (`packages/build/*`)
  - Design tokens and tooling (`packages/design/*`)
  - Component libraries (`packages/html/ds`, `packages/react/ds`)
  - Themes (`packages/themes/*`)
  - Documentation site (`apps/docs`)
  - Examples (`examples/*`)

## Tech stack

- Package management: pnpm + Corepack
- App framework: Next.js (docs site)
- Components: HTML and React libraries
- Styling: Tailwind CSS, CSS variables generated from tokens
- Design tokens: JSON/DTFM inputs, custom builders to multiple targets
- Storybook: for component development (HTML and React)
- Testing: unit tests (Vitest where applicable), visual regression tests (Chromatic/Playwright-based setup)
- CI: Azure DevOps pipeline (`.azure/pipeline.yaml`)

## Key packages

- `@ogcio/design-system-tokens` — source tokens and built outputs for consumers
- `@ogcio/design-system-tailwind` — Tailwind utilities/preset bound to tokens
- `@ogcio/design-system-react` — React component library
- `packages/html/ds` — framework-agnostic HTML/CSS components
- Themes: `@ogcio/theme-govie`, `@ogcio/theme-doete`, `@ogcio/theme-hse`

## CI/CD

- Azure DevOps pipeline: `.azure/pipeline.yaml`
  - Installs dependencies, builds, runs checks/tests
  - Extend to publish packages or deploy docs as needed

## Release and versioning (high level)

- Strategy: packages are versioned per package (independent versions)
- Tooling: `release-please` manages versions and changelogs based on Conventional Commits
  - Config files (at repo root): `release-please-config.json`, `.release-please-manifest.json`
- Workflow (typical):
  1. Follow Conventional Commits in PR titles/commits (e.g. `feat: ...`, `fix: ...`).
  2. `release-please` aggregate changes and open a Release PR per affected package with version bumps and CHANGELOG updates.
  3. Merge the Release PR to cut tags and publish release notes (CI may also publish artifacts if configured).
