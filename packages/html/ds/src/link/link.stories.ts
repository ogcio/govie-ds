import type { Meta, StoryObj } from '@storybook/react';
import {
  ButtonAppearance,
  ButtonSize,
  ButtonVariant,
} from '../button/button-schema';
import { renderComponent } from '../storybook/storybook';
import html from './link.html?raw';
import { LinkProps, LinkSize } from './link.schema';

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
};

export const asButton: Story = {
  args: {
    as: 'button',
    label: 'Link',
  },
};

export const asButtonDisabled: Story = {
  args: {
    as: 'button',
    label: 'Link',
    asButton: {
      disabled: true,
      aria: {
        'aria-disabled': 'true',
      },
    },
  },
};

export const withAriaAttributes: Story = {
  args: {
    href: '#',
    label: 'Link',
    size: LinkSize.Medium,
    aria: {
      'aria-current': '2',
      'aria-disabled': 'false',
    },
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
