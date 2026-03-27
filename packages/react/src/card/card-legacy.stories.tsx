import type { Meta, StoryObj } from '@storybook/react';
import { generateSvgPlaceholderDataUrl } from '../utils/placeholder.js';
import { Card } from './card.js';

const backgroundImageUrl400x300 = generateSvgPlaceholderDataUrl(400, 300);
const backgroundImageUrl600x360 = generateSvgPlaceholderDataUrl(600, 360);
const backgroundImageUrl600x400 = generateSvgPlaceholderDataUrl(600, 338);

const meta = {
  title: 'Components/Card/Deprecated',
  parameters: {
    deprecated: true,
    docs: {
      description: {
        component:
          'This Card version is deprecated. Please use the Composable version.',
      },
    },
  },
  component: Card,
  tags: ['skip-playwright'],
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
    media: {
      control: 'object',
      description: 'Media configuration for the card (image, icon, or iframe).',
      table: {
        category: 'Card Content',
        type: {
          summary:
            '{ type: "image" | "icon" | "iframe", config: ImagePropTypes | IconProps | IframePropTypes }',
        },
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
      description: 'Defines where the content is inset.',
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
    href: '#',
    media: {
      type: 'image',
      config: {
        src: backgroundImageUrl400x300,
        alt: 'Card Title',
        aspectRatio: '4 / 3',
      },
    },
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: {
      text: 'New',
      type: 'info',
    },
    action: {
      type: 'button',
      children: 'Button',
      variant: 'secondary',
    },
    inset: 'none',
  },
};

export const VerticalWithoutImage: Story = {
  args: {
    type: 'vertical',
    title: 'Vertical Card Without Image',
    href: '#',
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
    title: 'Vertical Card',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: backgroundImageUrl400x300,
        alt: 'Vertical Card',
      },
    },
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
    title: 'Vertical Card',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: backgroundImageUrl400x300,
        alt: 'Vertical Card',
      },
    },
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      children: 'Button',
      variant: 'secondary',
    },
  },
};

export const Horizontal: Story = {
  args: {
    type: 'horizontal',
    title: 'Horizontal Card',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: backgroundImageUrl600x360,
        alt: 'Horizontal Card',
      },
    },
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
    media: {
      type: 'icon',
      config: {
        icon: 'download',
        size: 'xl',
        className: 'gi-text-gray-500',
      },
    },
    title: 'Card With Icon',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      children: 'Download',
      variant: 'secondary',
    },
  },
};

export const WithIframeEmbed: Story = {
  args: {
    type: 'horizontal',
    title: 'Featured Video',
    href: '#',
    media: {
      type: 'iframe',
      config: {
        src: 'https://www.youtube.com/embed/K4TOrB7at0Y',
        title: 'Sample YouTube Video',
        allowFullScreen: true,
        allow:
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      },
    },
    content:
      'This card demonstrates embedding a YouTube video using an iframe.',
    tag: {
      text: 'Video',
      type: 'info',
    },
    action: {
      type: 'button',
      children: 'Watch Later',
      variant: 'secondary',
    },
    inset: 'none',
  },
};

export const MediaImageWithAspectRatio: Story = {
  args: {
    type: 'vertical',
    title: 'Card Title',
    subTitle: 'Subheading',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: backgroundImageUrl600x400,
        alt: '16 / 9 aspect ratio image',
        aspectRatio: '16 / 9',
      },
    },
    content: 'Card with 16 / 9 aspect ratio media',
    action: {
      type: 'button',
      children: 'Button',
      variant: 'secondary',
    },
    tag: {
      text: 'Featured',
      type: 'info',
    },
    inset: 'none',
  },
};

export const WithCustomTitleLink: Story = {
  args: {
    type: 'horizontal',
    title: 'Card Title',
    subTitle: 'Subheading',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: backgroundImageUrl400x300,
        alt: 'Card Title',
        aspectRatio: '4 / 3',
      },
    },
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: {
      text: 'New',
      type: 'info',
    },
    action: {
      type: 'button',
      children: 'Button',
      variant: 'secondary',
    },
    inset: 'none',
    titleAsChild: true,
    children: <a href="#">Custom Title Link</a>,
  },
};

export const WithoutTitleLink: Story = {
  args: {
    type: 'horizontal',
    title: 'Card Title',
    subTitle: 'Subheading',
    media: {
      type: 'image',
      config: {
        src: backgroundImageUrl400x300,
        alt: 'Card Title',
        aspectRatio: '4 / 3',
      },
    },
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: {
      text: 'New',
      type: 'info',
    },
    action: {
      type: 'button',
      children: 'Button',
      variant: 'secondary',
    },
    inset: 'none',
  },
};
