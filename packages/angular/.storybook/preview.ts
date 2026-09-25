import type { Preview } from '@storybook/angular-vite';
import '@ogcio/theme-govie/theme.css';
import '../fonts.css';
import '../styles.css';
import './global.css';
import PageTemplate from './PageTemplate.mdx';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: PageTemplate,
    },
  },
};

export default preview;
