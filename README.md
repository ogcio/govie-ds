# Government of Ireland Design System

The Government of Ireland Design System is an open-source design system developed by the Office of the Government Chief Information Officer (OGCIO). It provides tools for design and development, along with resources and guidelines to help teams create consistent, accessible, and user-centred digital services across government.

- 📘 [Project Overview](https://github.com/ogcio/govie-ds/blob/main/docs/overview.md)
- 🛠️ [Technical Reference](https://github.com/ogcio/govie-ds/blob/main/docs/technical.md)
- ⚛️ [React Storybook](https://ds.services.gov.ie/storybook-react/?path=/docs/layout-accordion--docs)
- 🧱 [HTML Storybook](https://ds.services.gov.ie/storybook-html/?path=/docs/layout-accordion--docs)
- 🧩 [Available Components](https://ds.services.gov.ie/components/)

## 🎨 Design

The Government of Ireland Design System uses Figma as its core design foundation, ensuring visual consistency across all government platforms and services.
Our design tokens and variables are managed centrally and can be imported directly into Figma for use by designers and product teams.

- 👉 [Figma](packages/design/figma)

## Packages

This project includes the following packages available to NPM:

- [`@ogcio/design-system-react`](packages/react/ds) - A library of UI components for government platforms in React.
- [`@ogcio/design-system-tokens`](packages/design/tokens) - A library of design tokens for consistent styling across government platforms.
- [`@ogcio/design-system-tailwind`](packages/design/tailwind) - A Tailwind CSS integration for the Gov IE Design System, providing utility-first styling options for rapid UI development.
- [`@ogcio/theme-govie`](packages/themes/govie) - A theme package for the Gov IE Design System, providing predefined styles and components tailored for the Govie platform.

## Getting started

```bash
corepack enable
pnpm install
pnpm ds
```

## Scripts

| Script                 | Description                             |
| ---------------------- | --------------------------------------- |
| `pnpm ds`              | Launch documentation site (Next.js)     |
| `pnpm html:storybook`  | Launch global HTML components Storybook |
| `pnpm react:storybook` | Launch React components Storybook       |
| `pnpm build`           | Build all libraries and applications    |
| `pnpm build:libs`      | Build all libraries only                |
| `pnpm figma:build`     | Build Figma token import files          |
| `pnpm format:check`    | Check formatting on all projects        |
| `pnpm lint`            | Check linting on all projects           |
| `pnpm test`            | Run tests on all projects               |
| `pnpm examples:vite`   | Run Vite example component usage        |
| `pnpm examples:nextjs` | Run Next.js example component usage     |
| `pnpm gen:licenses`    | Generate third‑party licenses report    |

## Generate third-party licenses report

This repository includes a helper script that produces a markdown report of all third‑party dependency licenses.

Prerequisites:

- jq (`brew install jq`)

```bash
pnpm gen:licences
```

You can also run the script directly:

```bash
sh ./scripts/licences.sh
```

This generates `LICENCES.md` with a table of package name, version, and license for all dependencies.

## Visual regression testing

To run Visual regression testing locally you need to create a Docker image in your local machine running the command `make build-visual-tests-image`.
Once the image has been created, you can run the tests with the command `make tests`.
If you are developing a new feature or making some adjustment to the style of existing components, you might need to update the snapshots to the latest version; to do so, you just have to run `make update-screenshots` to refresh all the screenshot in the repository.
Once you're done, you can run `make stop-react-storybook` to close the Storybook instance that is running in the background.

## Build Figma tokens

Make token changes in `packages/design/tokens` or `packages/themes/<packagename>` in [Design Token Format Module](https://design-tokens.github.io/community-group/format/) format.

```bash
pnpm figma:build
```

Figma tokens are outputted to `packages/design/figma/dist/tokens`
The entire folder can be uploaded as one with the [figma-variables-import](https://github.com/microsoft/figma-variables-import) plugin.

### Known Issues

- Figma does not support composite variables (e.g. typography, shadows etc), so they are converted to nested variable groups
- Figma [does not support percentage variables for line height](https://forum.figma.com/t/allow-percentages-for-line-height/69692) so line height percentages must be entered manually for Figma text styles

## Thanks

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.

This project is tested with BrowserStack [BrowserStack](https://www.browserstack.com/)
