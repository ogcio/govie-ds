import type { Meta, StoryObj } from '@storybook/react';
import html from './breadcrumbs.html?raw';

const meta = {
  title: 'Navigation/Breadcrumbs',
  parameters: {
    docs: {
      description: {
        component:
          'The breadcrumbs component helps users to understand where they are within a website’s structure and move between levels.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  //@ts-expect-error Render function returns raw HTML string, not a React component
  render: (_, { parameters }) => {
    parameters.renderedHtml = html;
    return html;
  },
};
