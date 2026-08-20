import '@ogcio/theme-govie/theme.css';
import type { Preview } from '@storybook/vue3-vite';
import '../fonts.css';
import '../styles.css';

const preview: Preview = {
  parameters: {
    a11y: { test: 'error' },
    controls: {
      // vue-component-meta reports Vue's built-in bindings and the native
      // attributes alongside the declared props — neither is component API.
      exclude: ['key', 'ref', 'ref_for', 'ref_key', 'class', 'style'],
    },
  },

  tags: ['autodocs'],
};

export default preview;
