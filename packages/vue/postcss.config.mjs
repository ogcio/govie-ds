// Used by Storybook (Vite) to process the styles.css import.
// The published stylesheet is compiled by the tailwindcss CLI (see build:styles).
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
