# govie-ds

## Getting started

```bash
corepack enable
pnpm install
```

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
