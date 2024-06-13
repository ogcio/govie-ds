# @govie-ds/eslint-config

```
pnpm add -D eslint @govie-ds/eslint-config
```

#### package.json

```json
"scripts": {
    "lint": "eslint 'src/**/*.ts'"
}
```

#### eslint.config.js

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
