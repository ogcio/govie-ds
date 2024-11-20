import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs.js';

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
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    links: {
      control: 'object',
      description:
        'Array of breadcrumb links, each with `href` and `label` properties.',
      table: {
        type: {
          summary: 'Array<{ href: string; label: string }>',
        },
      },
    },
  },
  args: {
    links: [
      { href: '/', label: 'Home' },
      { href: '#', label: 'Passports' },
      { href: '#', label: 'Travel abroad' },
    ],
  },
};
