import type { Preview } from '@storybook/angular';
import DocumentationTemplate from './DocumentationTemplate.mdx';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationTemplate,
    },
  },
};

export default preview;
