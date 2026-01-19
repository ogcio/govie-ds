import { FlatCompat } from "@eslint/eslintrc";
import eslintConfig from "@ogcio/design-system-eslint-config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslintConfig,
});

const eslintNextConfig = [
  {
    ignores: [".next/**", ".next/*"],
  },
  ...compat.config({
    extends: ["next"],
  }),
];

export default eslintNextConfig;
