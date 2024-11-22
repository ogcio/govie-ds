import type { Meta, StoryObj } from '@storybook/react';
import {
  Breadcrumbs,
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbEllipses,
} from './breadcrumbs.js';

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
  args: {
    children: [
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>,
      <BreadcrumbEllipses />,
      <BreadcrumbLink href="/travel">Travel</BreadcrumbLink>,
      <BreadcrumbCurrentLink href="/docs">Documentation</BreadcrumbCurrentLink>,
    ],
  },
  argTypes: {
    children: {
      description: 'The breadcrumb items: link, current link, and back link.',
    },
  },
};
