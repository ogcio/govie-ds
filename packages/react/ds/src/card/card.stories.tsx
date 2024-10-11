import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card.js';
import { Icon } from '../icon/icon.js';

const meta = {
  title: 'Components/Card',
  parameters: {
    docs: {
      description: {
        component:
          'A card component that displays an image, title, content, and actions, with both horizontal and vertical layouts.',
      },
    },
  },
  component: Card,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Controls the layout of the card.',
      table: {
        category: 'Layout',
        type: { summary: 'horizontal | vertical' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'The title of the card.',
      table: {
        category: 'Card Content',
        type: { summary: 'string' },
      },
    },
    href: {
      control: { type: 'text' },
      description: 'The link to which the card redirects.',
      table: {
        category: 'Card Content',
        type: { summary: 'string' },
      },
    },
    img: {
      control: { type: 'text' },
      description: 'The URL of the card image.',
      table: {
        category: 'Card Content',
        type: { summary: 'string' },
      },
    },
    content: {
      control: { type: 'text' },
      description: 'The content or description of the card.',
      table: {
        category: 'Card Content',
        type: { summary: 'string' },
      },
    },
    actions: {
      control: { type: 'object' },
      description:
        'Array of actions that are displayed as links at the bottom of the card.',
      table: {
        category: 'Actions',
        type: { summary: 'Array<{ href: string, text: string }>' },
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default card example
export const Default: Story = {
  args: {
    type: 'vertical',
    title: 'Card Title',
    img: 'https://via.placeholder.com/300x180',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    actions: [{ href: '#', text: 'Link' }],
  },
};

export const VerticalWithoutImage: Story = {
  args: {
    type: 'vertical',
    href: '#',
    title: 'Vertical Card Without Image',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
  },
};

export const VerticalWithLink: Story = {
  args: {
    type: 'vertical',
    href: '#',
    title: 'Vertical Card',
    img: 'https://via.placeholder.com/300x180',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    actions: [{ href: '#', text: 'Link' }],
  },
};

export const Horizontal: Story = {
  args: {
    type: 'horizontal',
    title: 'Horizontal Card',
    href: '#',
    img: 'https://via.placeholder.com/600',
    content:
      'Lorem ipsum dolor sit amet cons fectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    actions: [{ href: '#', text: 'Link' }],
  },
};

export const HorizontalWithoutImage: Story = {
  args: {
    type: 'horizontal',
    href: '#',
    title: 'Horizontal Card Without Image',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
  },
};

export const HorizontalWithIcon: Story = {
  args: {
    type: 'horizontal',
    href: '#',
    icon: <Icon icon="download" size="xl" className="gi-text-gray-500" />,
    title: 'Card With Icon',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
  },
};
