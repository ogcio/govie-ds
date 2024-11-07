import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './link.js';

const meta = {
  title: 'Navigation/Link',
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
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
    children: 'Link',
  },
};

export const WithoutUnderline: Story = {
  args: {
    href: '#',
    children: 'Link without underline',
    noUnderline: true,
  },
};

export const External: Story = {
  args: {
    href: '#',
    children: 'Link text (opens in a new tab)',
    external: true,
  },
};

export const NoVisited: Story = {
  args: {
    href: '#',
    children: 'Link',
    noVisited: true,
  },
};

export const AllStates: Story = {
  args: {
    href: '#',
    children: '',
    noVisited: true,
  },
  render: () => (
    <div className="gi-gap-4 gi-flex">
      <Link href="#">Default</Link>
      <Link href="#">Hover</Link>
      <Link href="#">Focus</Link>
    </div>
  ),
  parameters: {
    pseudo: {
      hover: '.gi-link:nth-child(2)',
      focus: '.gi-link:nth-child(3)',
    },
  },
};
