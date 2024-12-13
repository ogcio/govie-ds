import type { Meta, StoryObj } from '@storybook/react';
import { ButtonVariant } from '../button/button-schema';
import { IconId, IconSize } from '../icon/icon.schema';
import { LinkSize } from '../link/link.schema';
import { renderComponent } from '../storybook/storybook';
import html from './card.html?raw';
import { CardProps, CardType, InsetType } from './card.schema';

const macro = { name: 'govieCard', html };

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
      description:
        'Single action for the card, either a button or link, determined by the "type" property.',
      table: {
        category: 'Actions',
        type: { summary: '{ type: "button" | "link", ...Button | Link }' },
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
    inset: {
      control: 'select',
      options: Object.values(InsetType),
      description: 'Defines where the content is inset.',
      table: {
        category: 'Layout',
        type: { summary: 'none | body | full' },
      },
    },
  },
  args: {
    type: CardType.Horizontal,
    title: 'Card Title',
    subTitle: 'Subheading',
    inset: InsetType.None,
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
    type: CardType.Vertical,
    title: 'Vertical Card Without Image',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: LinkSize.MEDIUM,
      href: '#',
      label: 'Learn More',
    },
  },
};

export const VerticalWithLink: Story = {
  args: {
    type: CardType.Vertical,
    title: 'Vertical Card',
    img: 'https://placeholderjs.com/400x300',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'Featured', type: 'info' },
    action: {
      type: 'link',
      size: LinkSize.MEDIUM,
      href: '#',
      label: 'View More',
    },
  },
};

export const VerticalWithButton: Story = {
  args: {
    type: CardType.Vertical,
    title: 'Vertical Card',
    img: 'https://placeholderjs.com/400x300',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'Featured', type: 'info' },
    action: {
      type: 'button',
      content: 'Button',
      variant: ButtonVariant.Secondary,
    },
  },
};

export const Horizontal: Story = {
  args: {
    type: CardType.Horizontal,
    title: 'Horizontal Card',
    subTitle: 'Subtitle Here',
    img: 'https://placeholderjs.com/600x360',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      content: 'Click Me',
      variant: ButtonVariant.Secondary,
    },
  },
};

export const HorizontalWithoutImage: Story = {
  args: {
    type: CardType.Horizontal,
    title: 'Horizontal Card Without Image',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: LinkSize.MEDIUM,
      href: '#',
      label: 'Learn More',
    },
  },
};

export const HorizontalWithIcon: Story = {
  args: {
    type: CardType.Horizontal,
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
