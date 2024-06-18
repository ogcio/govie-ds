# @govie-ds/eslint-config

```
pnpm add -D eslint @govie-ds/eslint-config
```

#### package.json

```json
"scripts": {
    "lint": "eslint 'src/**/*.{ts,tsx}'"
}
```

#### eslint.config.js

```javascript
export { eslintConfig as default } from '@govie-ds/eslint-config';
```

```javascript
import { eslintConfig } from '@govie-ds/eslint-config';

export default [
  ...eslintConfig,
  // your modifications
  {
    rules: {
      ...
    },
  },
];
```
