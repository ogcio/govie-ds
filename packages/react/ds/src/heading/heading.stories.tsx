import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './heading.js';

const meta = {
  title: 'typography/Heading',
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      options: Object.values(['xl', 'lg', 'md', 'sm', 'xs', '2xs']),
      description: 'Options for sizes',
      control: { type: 'radio' },
    },
    as: {
      options: Object.values(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
      description: 'Option for the Heading tag',
      control: { type: 'radio' },
    },
    caption: {
      control: 'text',
      description: 'Caption for the heading',
    },
  },
  args: {
    children: 'Heading',
  },
};

export const Small: Story = {
  args: {
    as: 'h6',
    children: 'Small heading',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    as: 'h1',
    children: 'Medium heading',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    as: 'h1',
    children: 'Large heading',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    as: 'h1',
    children: 'Extra large heading',
  },
};

export const Caption: Story = {
  args: {
    size: 'md',
    as: 'h1',
    children: 'Heading with caption',
    caption: 'Caption Text',
  },
};
