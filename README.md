# Gov IE Design System

Gov IE Design System contains the code you need to start building a user interface for government platforms and services.

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

## Build Figma tokens

Make token changes in `tokens/tokens` or `packages/themes/<packagename>` in [Design Token Format Module](https://design-tokens.github.io/community-group/format/) format.

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
