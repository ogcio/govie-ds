import { eslintConfig } from "@govie-ds/eslint-config";

export default [
  ...eslintConfig,
  {
    ignores: ["next-env.d.ts", ".next/**/*"],
  },
];
