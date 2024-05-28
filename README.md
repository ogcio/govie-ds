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
