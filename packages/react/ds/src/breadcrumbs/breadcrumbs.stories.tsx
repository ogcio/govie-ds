import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const navigationElement = canvas.getByRole('navigation', {
      name: /breadcrumb/i,
    });
    expect(navigationElement).toBeInTheDocument();

    const listItemElements = canvas.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(4);

    expect(listItemElements[0]).toHaveTextContent('Home');
    expect(listItemElements[1]).toBeInTheDocument();
    expect(listItemElements[2]).toHaveTextContent('Travel');
    expect(listItemElements[3]).toHaveTextContent('Documentation');

    const ellipsisElement = canvas.getByText('more_horiz');
    expect(ellipsisElement).toBeInTheDocument();
    expect(ellipsisElement.parentElement).toHaveAttribute(
      'aria-hidden',
      'true',
    );
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const listItemElements = canvas.getAllByRole('listitem');
    expect(listItemElements[0]).toHaveTextContent('chevron_left');
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
