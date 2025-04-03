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
// eslint.config.js
import { defineConfig } from 'eslint/config';
import eslintConfig from '@govie-ds/eslint-config';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslintConfig],
  },
]);
```
