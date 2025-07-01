# @ogcio/design-system-eslint-config

```
pnpm add -D eslint @ogcio/design-system-eslint-config
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
import eslintConfig from '@ogcio/design-system-eslint-config';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslintConfig],
  },
]);
```
