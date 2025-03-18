import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import { BreadcrumbsProps } from './breadcrumbs.schema';

const meta: Meta<BreadcrumbsProps> = {
  title: 'Navigation/Breadcrumbs',
};

export default meta;
type Story = StoryObj<BreadcrumbsProps>;

const createBreadcrumbs = (arguments_: BreadcrumbsProps) => {
  const container = document.createElement('div');
  const nav = document.createElement('nav');
  nav.className = 'gi-breadcrumbs';
  nav.dataset.module = 'gieds-breadcrumbs';

  const ol = document.createElement('ol');
  ol.role = 'list';

  for (const navItem of arguments_.navItems) {
    const li = document.createElement('li');
    li.role = 'listitem';
    if (navItem.ellipsis) {
      const ellipsis = document.createElement('div');
      ellipsis.ariaHidden = 'true';
      ellipsis.innerHTML = '';
    } else if (navItem.currentPage) {
      const currentPage = document.createElement('div');
      currentPage.ariaCurrent = 'page';
      currentPage.innerHTML = '';
    } else {
      const page = document.createElement('div');
      page.innerHTML = '';
    }

    ol.append(li);
  }

  nav.append(ol);

  container.append(nav);

  return beautifyHtmlNode(container);
};

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
    const heading = canvas.getByText('Small heading');
    expect(heading).toHaveClass('gi-heading-2xs');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Small heading');
    expect(heading).toHaveClass('gi-heading-2xs');
  },
};

export const SingleItem: Story = {
  args: {
    navItems: [{ label: 'Back to [Previous Page]', href: '/' }],
  },
  render: (arguments_) => createBreadcrumbs(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Small heading');
    expect(heading).toHaveClass('gi-heading-2xs');
  },
};
