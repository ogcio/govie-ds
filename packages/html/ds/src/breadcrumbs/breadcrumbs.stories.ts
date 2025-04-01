import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createIcon } from '../helpers/icons';
import { createLink } from '../helpers/links';
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
  nav.dataset.element = 'breadcrumbs-container';

  const ol = document.createElement('ol');
  ol.role = 'list';

  for (const navItem of arguments_.navItems) {
    const li = document.createElement('li');
    li.role = 'listitem';

    let element;
    if (navItem.ellipsis) {
      const icon = createIcon({
        icon: 'more_horiz',
        className: 'gi-text-gray-700',
      });
      element = document.createElement('div');
      element.ariaHidden = 'true';
      element.append(icon);
    } else if (navItem.currentPage) {
      element = createLink({
        noColor: true,
        href: navItem.href,
        content: navItem.label!,
      }) as HTMLAnchorElement;
      element.ariaCurrent = 'page';
    } else {
      element = createLink({
        noColor: true,
        href: navItem.href,
        content: navItem.label!,
      });
    }

    li.append(element);
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
