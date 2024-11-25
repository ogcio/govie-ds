import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './breadcrumbs.html?raw';
import { BreadcrumbsProps } from './breadcrumbs.schema';

const path = import.meta.url.split('/breadcrumbs')[0];

const macro = { name: 'govieBreadcrumbs', html, path };

const Breadcrumbs = renderComponent<BreadcrumbsProps>(macro);

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    macro,
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
  args: {
    items: [
      { label: 'Home', href: '/' },
      { ellipsis: true },
      { label: 'Travel', href: '/travel' },
      { label: 'Documentation', href: '/travel/docs', currentPage: true },
    ],
  },
};

export const WithoutEllipsis: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Travel', href: '/travel' },
      { label: 'Passport', href: '/passport' },
      { label: 'Documentation', href: '/docs', currentPage: true },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      { label: 'Back to [Previous page]', href: '/' },
    ],
  },
};

