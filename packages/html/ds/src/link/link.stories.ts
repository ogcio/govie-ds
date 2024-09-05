import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './link.html?raw';
import { LinkProps } from './link.schema';

const macro = { name: 'govieLink', html };

const Link = renderComponent<LinkProps>(macro);

const meta = {
  component: Link,
  title: 'Navigation/Link',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

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
  },
  args: {
    href: '#',
    label: 'Link',
  },
};

export const WithoutUnderline: Story = {
  args: {
    href: '#',
    label: 'Link without underline',
    noUnderline: true,
  },
};

export const External: Story = {
  args: {
    href: '#',
    label: 'Link text (opens in a new tab)',
    external: true,
  },
};

export const NoVisited: Story = {
  args: {
    href: '#',
    label: 'Link',
    noVisited: true,
  },
};
