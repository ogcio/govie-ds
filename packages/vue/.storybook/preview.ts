import '@ogcio/theme-govie/theme.css';
import type { Preview } from '@storybook/vue3-vite';
import '../fonts.css';
import '../styles.css';

const preview: Preview = {
  parameters: {
    a11y: { test: 'error' },
  },

  tags: ['autodocs'],
};

export default preview;
