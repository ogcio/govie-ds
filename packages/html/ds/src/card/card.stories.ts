import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import { IconId, IconSize } from '../icon/icon.schema';
import html from './card.html?raw';
import { CardProps } from './card.schema';

const path = import.meta.url.split('/card')[0];

const macro = { name: 'govieCard', html, path };

const Card = renderComponent<CardProps>(macro);

const meta = {
  component: Card,
  title: 'Components/Card',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'A card component that displays an image, title, content, and actions, with both horizontal and vertical layouts.',
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    type: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Controls the layout of the card.',
      table: {
        category: 'Layout',
        type: { summary: 'horizontal | vertical' },
      },
    },
    title: {
      control: 'text',
      description: 'The title of the card.',
      table: {
        category: 'Card Content',
        type: { summary: 'string' },
      },
    },
    href: {
      control: 'text',
      description: 'The link to which the card redirects.',
      table: {
        category: 'Card Content',
        type: { summary: 'string' },
      },
    },
    img: {
      control: 'text',
      description: 'The URL or path of the card image.',
      table: {
        category: 'Card Content',
        type: { summary: 'string' },
      },
    },
    content: {
      control: 'text',
      description: 'The content or description of the card.',
      table: {
        category: 'Card Content',
        type: { summary: 'string' },
      },
    },
    actions: {
      control: 'object',
      description:
        'Array of actions that are displayed as links at the bottom of the card.',
      table: {
        category: 'Actions',
        type: { summary: 'Array<{ href: string, text: string }>' },
      },
    },
    icon: {
      control: 'object',
      description: 'Icon configuration for the card.',
      table: {
        category: 'Card Content',
        type: { summary: 'Object with icon, size, className, etc.' },
      },
    },
  },
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
    img: 'https://via.placeholder.com/600x360',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
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
    icon: {
      icon: IconId.Download,
      size: IconSize.ExtraLarge,
      className: 'gi-text-gray-500',
    },
    title: 'Card With Icon',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
  },
};
