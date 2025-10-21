import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { createCard } from '../helpers/card';
import { IconId, IconSize } from '../icon/icon.schema';
import { CardProps } from './types';

const meta: Meta<CardProps> = {
  title: 'Components/Card',
};

export default meta;
type Story = StoryObj<CardProps>;

const createElement = (arguments_: CardProps) => {
  const component = createCard(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Controls the layout of the card.',
      table: { category: 'Layout', type: { summary: 'horizontal | vertical' } },
    },
    inset: {
      control: 'select',
      options: ['none', 'body', 'full'],
      description: 'Defines where the content is inset.',
      table: { category: 'Layout', type: { summary: 'none | body | full' } },
    },
    background: {
      control: { type: 'select' },
      options: ['white', 'grey'],
      description: 'Background color of the card.',
      table: {
        category: 'Layout',
        type: { summary: 'white | grey' },
        defaultValue: { summary: 'white' },
      },
    },
    truncate: {
      control: 'boolean',
      description: 'Clamp CardTitle and CardSubtitle to 2 lines.',
      table: { category: 'Typography', type: { summary: 'boolean' } },
    },
    title: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
      description: 'Card title text.',
    },
    subtitle: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
      description: 'Card subtitle text.',
    },
    content: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
      description: 'Card description text.',
    },
  },
  args: {
    type: 'horizontal',
    title: 'Card Title',
    subtitle: 'This is the subtitle',
    inset: 'full',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/400x300',
        alt: 'Alt text for image',
      },
    },
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'New', type: 'info' },
    action: {
      type: 'button',
      content: 'Action 1',
      variant: 'secondary',
    },
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const titleElement = canvas.getByText('Card Title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName).toBe('A');

    const contentElement = canvas.getByText(
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    );
    expect(contentElement).toBeTruthy();
    expect(contentElement.tagName).toBe('P');

    const subTitleElement = canvas.getByText('This is the subtitle');
    expect(subTitleElement.tagName).toBe('DIV');
    expect(subTitleElement.classList.contains('gi-card-subheading')).toBe(true);

    const tagElement = canvas.getByText('New');
    expect(tagElement).toBeTruthy();

    const imageElement = canvasElement.querySelector('img')!;
    expect(imageElement).toBeTruthy();
    expect(imageElement.getAttribute('src')).toBe(
      'https://placeholderjs.com/400x300',
    );
    expect(imageElement.getAttribute('alt')).toBe('Alt text for image');

    const actionLink1 = canvas.getByText('Action 1');
    expect(actionLink1).toBeTruthy();
  },
};

export const VerticalWithoutImage: Story = {
  args: {
    type: 'vertical',
    title: 'Vertical Card Without Image',
    subtitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      content: 'Learn More',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const VerticalWithLink: Story = {
  args: {
    type: 'vertical',
    title: 'Vertical Card',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/400x300',
        alt: '400x300',
      },
    },
    subtitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'Featured', type: 'info' },
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      content: 'View More',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const VerticalWithButton: Story = {
  args: {
    type: 'vertical',
    title: 'Vertical Card',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/400x300',
        alt: '400x300',
      },
    },
    subtitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'Featured', type: 'info' },
    action: {
      type: 'button',
      content: 'Button',
      variant: 'secondary',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const Horizontal: Story = {
  args: {
    type: 'horizontal',
    title: 'Horizontal Card',
    subtitle: 'Subtitle Here',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/600x360',
        alt: '600x360',
      },
    },
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      content: 'Click Me',
      variant: 'secondary',
    },
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const cardElement = canvasElement.querySelector('.gi-card-horizontal')!;
    expect(cardElement).toBeTruthy();
  },
};

export const HorizontalWithoutImage: Story = {
  args: {
    type: 'horizontal',
    title: 'Horizontal Card Without Image',
    subtitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      content: 'Learn More',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const HorizontalWithIcon: Story = {
  args: {
    type: 'horizontal',
    media: {
      type: 'icon',
      config: {
        icon: IconId.Download,
        size: IconSize.EXTRA_LARGE,
        className: 'gi-text-gray-500',
      },
    },
    title: 'Card With Icon',
    subtitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      content: 'Download',
      variant: 'secondary',
    },
  },
  render: (arguments_) => createElement(arguments_),
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
      content: 'Watch Later',
      variant: 'secondary',
    },
    inset: 'none',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const iframeElement = canvasElement.querySelector('iframe')!;
    expect(iframeElement).toBeTruthy();
    expect(iframeElement.getAttribute('src')).toBe(
      'https://www.youtube.com/embed/K4TOrB7at0Y',
    );
    expect(iframeElement.getAttribute('title')).toBe('Sample YouTube Video');
  },
};

export const MediaImageWithAspectRatio: Story = {
  args: {
    type: 'horizontal',
    title: 'Card Title',
    subtitle: 'Subheading',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/600x400',
        alt: '16 / 9 aspect ratio image',
        aspectRatio: '16 / 9',
      },
    },
    content: 'Card with 16 / 9 aspect ratio media',
    action: {
      type: 'button',
      content: 'Button',
      variant: 'secondary',
    },
    tag: { text: 'Featured', type: 'info' },
    inset: 'none',
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithoutTitleLink: Story = {
  args: {
    titleAsChild: true,
    type: 'horizontal',
    title: 'Card Title',
    subtitle: 'Subheading',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/400x300',
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
      content: 'Button',
      variant: 'secondary',
    },
    inset: 'none',
  },
  render: (arguments_) => createElement(arguments_),
};
