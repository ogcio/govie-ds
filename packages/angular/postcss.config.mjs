// Used by `tailwindcss` CLI in `pnpm build:styles` to compile the published
// `dist/styles.css`.
// Storybook (webpack) injects `postcss-import` separately
// via `.storybook/main.ts` because Angular CLI ignores this config file.
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
