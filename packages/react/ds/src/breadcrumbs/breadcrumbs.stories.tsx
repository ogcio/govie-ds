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

export const WithSingleItemAndIconStart: Story = {
  args: {
    iconStart: true,
    children: [
      <BreadcrumbLink href="/home">Back to [Previous page]</BreadcrumbLink>,
    ],
  },
};

export const WithCustomLink: Story = {
  args: {
    iconStart: true,
    children: [
      <BreadcrumbLink asChild>
        <a href="/departments">Departments</a>
      </BreadcrumbLink>,
      <BreadcrumbEllipsis />,
      <BreadcrumbLink asChild>
        <a href="/docs">Documents</a>
      </BreadcrumbLink>,
      <BreadcrumbCurrentLink asChild>
        <a href="/travel">Travel abroad</a>
      </BreadcrumbCurrentLink>,
    ],
  },
};

export const MultipleLevels: Story = {
  args: {
    children: [
      <BreadcrumbLink asChild>
        <a href="/departments">Departments</a>
      </BreadcrumbLink>,
      <BreadcrumbEllipsis />,
      <BreadcrumbLink asChild>
        <a href="/docs">Level 2</a>
      </BreadcrumbLink>,
      <BreadcrumbLink asChild>
        <a href="/docs">Level 3</a>
      </BreadcrumbLink>,
      <BreadcrumbLink asChild>
        <a href="/docs">Level 4</a>
      </BreadcrumbLink>,
      <BreadcrumbCurrentLink asChild>
        <a href="/travel">Level 5</a>
      </BreadcrumbCurrentLink>,
    ],
  },
};
