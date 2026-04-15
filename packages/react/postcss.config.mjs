// Used by Storybook (Vite) to process styles.css imports.
// Production build uses tailwindcss CLI directly (see build:styles script).
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
