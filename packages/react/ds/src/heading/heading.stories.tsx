import type { Meta, StoryObj } from '@storybook/react';
import { Heading, HeadingProps, headingVariants } from './heading.js';

export default {
  title: 'typography/Heading',
  component: Heading,
} satisfies Meta<HeadingProps>;

type Story = StoryObj<HeadingProps>;

export const Default: Story = {
  argTypes: {
    size: {
      options: Object.keys(headingVariants.variants.size),
      description: 'Options for sizes',
      control: { type: 'radio' },
    },
    as: {
      options: Object.keys(headingVariants.variants.as),
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

export const WithSize: Story = () => {
  return (
    <div className="flex flex-row gap-2">
      {Object.keys(headingVariants.variants.size).map((size) => (
        <Heading
          key={size}
          size={size as keyof typeof headingVariants.variants.size}
        >
          Heading {size}
        </Heading>
      ))}
    </div>
  );
};
WithSize.args = {};

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
