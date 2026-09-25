// Used by `tailwindcss` CLI in `pnpm build:styles` to compile the published
// `dist/styles.css`, and by the Storybook Vite build.
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
