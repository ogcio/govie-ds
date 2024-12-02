import type { Meta, StoryObj } from '@storybook/react';
import {
  Breadcrumbs,
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbEllipsis,
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
      <BreadcrumbEllipsis />,
      <BreadcrumbLink href="/travel">Travel</BreadcrumbLink>,
      <BreadcrumbCurrentLink href="/docs">Documentation</BreadcrumbCurrentLink>,
    ],
  },
};

export const WithoutEllipsis: Story = {
  args: {
    children: [
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>,
      <BreadcrumbLink href="/travel">Travel</BreadcrumbLink>,
      <BreadcrumbLink href="/passport">Passport</BreadcrumbLink>,
      <BreadcrumbCurrentLink href="/docs">Documentation</BreadcrumbCurrentLink>,
    ],
  },
};

export const SingleItem: Story = {
  args: {
    children: [
      <BreadcrumbLink href="/home">Back to [Previous page]</BreadcrumbLink>,
    ],
  },
};