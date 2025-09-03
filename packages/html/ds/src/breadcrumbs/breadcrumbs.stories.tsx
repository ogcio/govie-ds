import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { createBreadcrumbs } from '../helpers/breadcrumbs';
import { BreadcrumbsProps } from './breadcrumbs.schema';

const meta: Meta<BreadcrumbsProps> = {
  title: 'Navigation/Breadcrumbs',
};

export default meta;
type Story = StoryObj<BreadcrumbsProps>;

const createElement = (arguments_: BreadcrumbsProps) => {
  const component = createBreadcrumbs(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
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
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
};

export const SingleItem: Story = {
  args: {
    navItems: [{ label: 'Back to [Previous Page]', href: '/' }],
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithSingleItemAndIconStart: Story = {
  args: {
    iconStart: true,
    navItems: [{ label: 'Back to [Previous page]', href: '/' }],
  },
  render: (arguments_) => createElement(arguments_),
};

export const MultipleLevels: Story = {
  args: {
    navItems: [
      { label: 'Departments', href: '/departments' },
      { ellipsis: true },
      { label: 'Level 2', href: '/lv1' },
      { label: 'Level 3', href: '/lv3' },
      { label: 'Level 4', href: '/lv4' },
      { label: 'Level 5', href: '/lv5', currentPage: true },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};
