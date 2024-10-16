import type { Meta, StoryObj } from '@storybook/react';
import { ButtonVariant } from '../button/button-schema';
import { IconId, IconSize } from '../icon/icon.schema';
import { renderComponent } from '../storybook/storybook';
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
          'A card component that displays an image, title, content, tag, and action, with both horizontal and vertical layouts.',
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
    subTitle: {
      control: 'text',
      description: 'The subtitle of the card.',
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
    tag: {
      control: 'object',
      description: 'Tag displayed on the card.',
      table: {
        category: 'Card Content',
        type: { summary: 'Tag' },
      },
    },
    action: {
      control: 'object',
      description: 'Single action button or link for the card.',
      table: {
        category: 'Actions',
        type: { summary: '{ type: "link" | Button | Link }' },
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
  },
  args: {
    type: 'vertical',
    title: 'Card Title',
    subTitle: 'Subheading',
    img: 'https://placeholderjs.com/400x300',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'New', type: 'info' },
    action: {
      type: 'button',
      content: 'Button',
      variant: ButtonVariant.Secondary,
    },
  },
};

export const VerticalWithoutImage: Story = {
  args: {
    type: 'vertical',
    href: '#',
    title: 'Vertical Card Without Image',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      label: 'Learn More',
    },
  },
};

export const VerticalWithLink: Story = {
  args: {
    type: 'vertical',
    href: '#',
    title: 'Vertical Card',
    img: 'https://placeholderjs.com/400x300',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'Featured', type: 'info' },
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      label: 'View More',
    },
  },
};

export const Horizontal: Story = {
  args: {
    type: 'horizontal',
    title: 'Horizontal Card',
    subTitle: 'Subtitle Here',
    href: '#',
    img: 'https://placeholderjs.com/600x360',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      content: 'Click Me',
      variant: ButtonVariant.Primary,
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
      label: 'Learn More',
    },
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
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      content: 'Download',
      variant: ButtonVariant.Secondary,
    },
  },
};
