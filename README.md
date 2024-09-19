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

```
pnpm figma:build
```

Figma tokens are outputted to `packages/design/figma/dist/tokens`
The entire folder can be uploaded as one with the [figma-variables-import](https://github.com/microsoft/figma-variables-import) plugin.

### Known Issues

- Figma does not support composite variables (e.g. typography, shadows etc), so they are converted to nested variable groups
- Figma [does not support percentage variables for line height](https://forum.figma.com/t/allow-percentages-for-line-height/69692) so line height percentages must be entered manually for Figma text styles
