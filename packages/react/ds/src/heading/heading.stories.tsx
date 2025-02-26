import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading');
    expect(heading).toBeTruthy();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading');
    expect(heading).toHaveClass('gi-heading-2xs');
    expect(heading.tagName.toLowerCase()).toBe('h6');
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    as: 'h1',
    children: 'Medium heading',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading');
    expect(heading).toHaveClass('gi-heading-md');
    expect(heading.tagName.toLowerCase()).toBe('h1');
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    as: 'h1',
    children: 'Large heading',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading');
    expect(heading).toHaveClass('gi-heading-lg');
    expect(heading.tagName.toLowerCase()).toBe('h1');
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    as: 'h1',
    children: 'Extra large heading',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading');
    expect(heading).toHaveClass('gi-heading-xl');
    expect(heading.tagName.toLowerCase()).toBe('h1');
  },
};

export const Caption: Story = {
  args: {
    size: 'md',
    as: 'h1',
    children: 'Heading with caption',
    caption: 'Caption Text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const caption = canvas.getByText('Caption Text');
    expect(caption).toBeTruthy();
  },
};
