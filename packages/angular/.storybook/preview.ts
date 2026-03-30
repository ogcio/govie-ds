import type { Preview } from '@storybook/angular';
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
