import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createBreadcrumbs } from '../helpers/breadcrumbs';
import { BreadcrumbsProps } from './breadcrumbs.schema';

const meta: Meta<BreadcrumbsProps> = {
  title: 'Navigation/Breadcrumbs',
};

export default meta;
type Story = StoryObj<BreadcrumbsProps>;

export const Default: Story = {
  args: {
    navItems: [
      { label: 'Home', href: '/' },
      { ellipsis: true },
      { label: 'Travel', href: '/travel' },
      { label: 'Documentation', href: '/travel/docs', currentPage: true },
    ],
  },
  render: (arguments_) => createBreadcrumbs(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const breadcrumbNav = canvas.getByRole('navigation');
    expect(breadcrumbNav).toBeInTheDocument();

    const listItems = canvas.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);

    expect(listItems[0]).toHaveTextContent('Home');
    expect(listItems[1]).toBeInTheDocument();
    expect(listItems[2]).toHaveTextContent('Travel');
    expect(listItems[3]).toHaveTextContent('Documentation');
  },
};

export const WithoutEllipsis: Story = {
  args: {
    navItems: [
      { label: 'Home', href: '/' },
      { label: 'Travel', href: '/travel' },
      { label: 'Passport', href: '/passport' },
      { label: 'Documentation', href: '/docs', currentPage: true },
    ],
  },
  render: (arguments_) => createBreadcrumbs(arguments_),
};

export const SingleItem: Story = {
  args: {
    navItems: [{ label: 'Back to [Previous Page]', href: '/' }],
  },
  render: (arguments_) => createBreadcrumbs(arguments_),
};

export const WithSingleItemAndIconStart: Story = {
  args: {
    iconStart: true,
    navItems: [{ label: 'Back to [Previous page]', href: '/' }],
  },
  render: (arguments_) => createBreadcrumbs(arguments_),
};
