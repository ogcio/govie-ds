import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import type { HeadingProps } from './heading.schema';
import { Size, Tag } from './heading.schema';

const meta: Meta<HeadingProps> = {
  title: 'typography/Heading',
};

export default meta;
type Story = StoryObj<HeadingProps>;

const createHeader = (arguments_: HeadingProps) => {
  const container = document.createElement('div');

  let classSize = '';
  if (arguments_.size === undefined) {
    switch (arguments_.as) {
      case 'h6': {
        classSize = 'gi-heading-2xs';
        break;
      }
      case 'h5': {
        classSize = 'gi-heading-xs';
        break;
      }
      case 'h4': {
        classSize = 'gi-heading-sm';
        break;
      }
      case 'h3': {
        classSize = 'gi-heading-md';
        break;
      }
      case 'h2': {
        classSize = 'gi-heading-lg';
        break;
      }
      case 'h1': {
        classSize = 'gi-heading-xl';
        break;
      }
    }
  } else {
    switch (arguments_.size) {
      case '2xs': {
        classSize = 'gi-heading-2xs';
        break;
      }
      case 'xs': {
        classSize = 'gi-heading-xs';
        break;
      }
      case 'sm': {
        classSize = 'gi-heading-sm';
        break;
      }
      case 'md': {
        classSize = 'gi-heading-md';
        break;
      }
      case 'lg': {
        classSize = 'gi-heading-lg';
        break;
      }
      case 'xl': {
        classSize = 'gi-heading-xl';
        break;
      }
    }
  }

  const component = document.createElement(arguments_.as ?? 'h1');
  component.className = classSize;
  component.textContent = arguments_.text;

  if (arguments_.caption) {
    const caption = document.createElement('span');
    caption.className = 'gi-text-gray-500';
    caption.textContent = arguments_.caption;

    container.append(caption);
  } else {
    return beautifyHtmlNode(component);
  }

  container.append(component);

  return beautifyHtmlNode(container);
};

export const Default: Story = {
  args: {
    as: Tag.H1,
    text: 'Heading',
    caption: '',
  },
  argTypes: {
    size: {
      options: Object.values(Size),
      description: 'Options for sizes',
      control: { type: 'radio' },
    },
    as: {
      options: Object.values(Tag),
      description: 'Option for the Heading tag',
      control: { type: 'radio' },
    },
    caption: {
      control: 'text',
      description: 'Caption for the heading',
    },
  },
  render: (arguments_) => createHeader(arguments_),
};

export const Small: Story = {
  args: {
    as: Tag.H6,
    text: 'Small heading',
  },
  render: (arguments_) => createHeader(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Small heading');
    expect(heading).toHaveClass('gi-heading-2xs');
  },
};

export const Medium: Story = {
  args: {
    size: Size.Medium,
    as: Tag.H3,
    text: 'Medium heading',
  },
  render: (arguments_) => createHeader(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Medium heading');
    expect(heading).toHaveClass('gi-heading-md');
  },
};

export const Large: Story = {
  args: {
    size: Size.Large,
    as: Tag.H1,
    text: 'Large heading',
  },
  render: (arguments_) => createHeader(arguments_),
};

export const ExtraLarge: Story = {
  args: {
    size: Size.ExtraLarge,
    as: Tag.H1,
    text: 'Extra large heading',
  },
  render: (arguments_) => createHeader(arguments_),
};

export const Caption: Story = {
  args: {
    size: Size.Medium,
    as: Tag.H1,
    text: 'Heading with h6',
    caption: 'Caption Text',
  },
  render: (arguments_) => createHeader(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const caption = canvas.getByText('Caption Text');
    expect(caption).toBeDefined();
  },
};
