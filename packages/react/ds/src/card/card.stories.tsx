import type { Meta, StoryObj } from '@storybook/react';
import { ButtonVariant } from '../button/types.js';
import { Card } from './card.js';

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
    subTitle: {
      control: { type: 'text' },
      description: 'The subheading or subtitle of the card.',
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
      description: 'The URL or path of the card image.',
      table: {
        category: 'Card Content',
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'object',
      description: 'Icon configuration for the card.',
      table: {
        category: 'Card Content',
        type: { summary: 'Icon' },
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
    tag: {
      control: 'object',
      description: 'Tag configuration for the card (text and type).',
      table: {
        category: 'Card Content',
        type: { summary: 'Tag' },
      },
    },
    action: {
      control: 'object',
      description: 'The action button or link for the card.',
      table: {
        category: 'Actions',
        type: { summary: '{ type: "button" | "link", ...Button | Link }' },
      },
    },
    inset: {
      control: 'select',
      options: ['none', 'body', 'full'],
      description: 'Defines where the content is inset (default is "body").',
      table: {
        category: 'Layout',
        type: { summary: 'none | body | full' },
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'horizontal',
    title: 'Card Title',
    subTitle: 'Subheading',
    img: 'https://placeholderjs.com/400x300',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: {
      text: 'New',
      type: 'info',
    },
    action: {
      type: 'button',
      children: 'Button',
      variant: ButtonVariant.Secondary,
    },
    inset: 'none',
  },
};

export const VerticalWithoutImage: Story = {
  args: {
    type: 'vertical',
    href: '#',
    title: 'Vertical Card Without Image',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      children: 'Learn More',
    },
  },
};

export const VerticalWithLink: Story = {
  args: {
    type: 'vertical',
    href: '#',
    title: 'Vertical Card',
    img: 'https://placeholderjs.com/400x300',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: {
      text: 'Featured',
      type: 'info',
    },
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      children: 'View More',
    },
  },
};

export const VerticalWithButton: Story = {
  args: {
    type: 'vertical',
    href: '#',
    title: 'Vertical Card',
    img: 'https://placeholderjs.com/400x300',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      children: 'Button',
      variant: ButtonVariant.Secondary,
    },
  },
};

export const Horizontal: Story = {
  args: {
    type: 'horizontal',
    title: 'Horizontal Card',
    href: '#',
    img: 'https://placeholderjs.com/600x360',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      children: 'Link',
    },
  },
};

export const HorizontalWithoutImage: Story = {
  args: {
    type: 'horizontal',
    href: '#',
    title: 'Horizontal Card Without Image',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      children: 'Learn More',
    },
  },
};

export const HorizontalWithIcon: Story = {
  args: {
    type: 'horizontal',
    href: '#',
    icon: {
      icon: 'download',
      size: 'xl',
      className: 'gi-text-gray-500',
    },
    title: 'Card With Icon',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      children: 'Download',
      variant: ButtonVariant.Secondary,
    },
  },
};
