import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import {
  ButtonAppearance,
  ButtonSize,
  ButtonVariant,
} from '../button/button.schema';
import { createLink } from '../helpers/links';
import { beautifyHtmlNode } from '../storybook/storybook';
import { LinkProps, LinkSize } from './link.schema';

const meta: Meta<LinkProps> = {
  title: 'Navigation/Link',
};

export default meta;
type Story = StoryObj<LinkProps>;

const createElement = (arguments_: LinkProps) => {
  const component = createLink(arguments_);
  const container = document.createElement('div');
  container.append(component);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  argTypes: {
    label: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    href: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    noUnderline: {
      description: 'To remove underlines from links.',
      control: 'boolean',
      type: { name: 'boolean' },
    },
    external: {
      description: 'To open the link in a new tab.',
      control: 'boolean',
      type: { name: 'boolean' },
    },
    noVisited: {
      description:
        'Where it is not helpful to distinguish between visited and unvisited states, for example when linking to pages with frequently-changing content such as the dashboard for an admin interface.',
      control: 'boolean',
      type: { name: 'boolean' },
    },
    noColor: {
      description: 'To inherit color from parent',
      control: 'boolean',
      type: { name: 'boolean' },
    },
    size: {
      control: { type: 'select', options: ['sm', 'md'] },
      description: 'Size of the link.',
      type: { name: 'string', required: false },
    },
  },
  args: {
    href: '#',
    label: 'Link',
    size: LinkSize.Medium, // Default size can be set here, change to 'sm' if needed
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText('Link');
    expect(link).toHaveClass('gi-link');
  },
};

export const WithoutUnderline: Story = {
  args: {
    href: '#',
    label: 'Link without underline',
    noUnderline: true,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText('Link without underline');
    expect(link).toHaveClass('gi-link');
    expect(link).toHaveClass('gi-link-no-underline');
  },
};

export const External: Story = {
  args: {
    href: '#',
    label: 'Link text (opens in a new tab)',
    external: true,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText('Link text (opens in a new tab)');
    expect(link).toHaveClass('gi-link');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
    expect(link).toHaveAttribute('target', '_blank');
  },
};

export const NoVisited: Story = {
  args: {
    href: '#',
    label: 'Link',
    noVisited: true,
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText('Link');
    expect(link).toHaveClass('gi-link-no-visited');
  },
};

export const styledAsButton: Story = {
  args: {
    href: '#',
    asButton: {
      variant: ButtonVariant.Primary,
      size: ButtonSize.Medium,
      appearance: ButtonAppearance.Default,
    },
    label: 'Link',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText('Link');
    expect(link).toHaveClass('gi-btn');
  },
};

export const asButton: Story = {
  args: {
    as: 'button',
    label: 'Link',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByText('Link');
    expect(link.tagName).toBe('BUTTON');
  },
};

export const AllStates: Story = {
  args: {
    href: '#',
    label: '',
  },
  render: () =>
    `<div class="gi-gap-4 gi-flex">
      <a href="#" class="gi-link">Default</a>
      <a href="#" class="gi-link pseudo-hover">Hover</a>
      <a href="#" class="gi-link pseudo-focus">Focus</a>
     </div>
    `,
  parameters: {
    pseudo: {
      hover: '.gi-link:nth-child(2)',
      focus: '.gi-link:nth-child(3)',
    },
  },
};
