# @ogcio/design-system-prettier-config

> ⚠️ **Deprecated.** Replaced by the root `.prettierrc.json` config. New packages should not reference this package — prettier picks up the root config automatically.

```
pnpm add -D prettier @ogcio/design-system-prettier-config
```

#### package.json

```json
"scripts": {
    "format": "prettier 'src/**/*.ts' --write",
    "format:check": "prettier 'src/**/*.ts' --check"
},
"prettier": "@ogcio/design-system-prettier-config",
```
