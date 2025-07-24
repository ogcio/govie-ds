import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { createHeading } from '../helpers/typography';
import type { HeadingProps } from './types';

const meta: Meta<HeadingProps> = {
  title: 'Typography/Heading',
  parameters: {
    docs: {
      description: {
        component:
          'Heading component for displaying semantic, accessible typographic headings (e.g., h1–h6) with consistent styling.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<HeadingProps>;

const createElement = (arguments_: HeadingProps) => {
  const component = createHeading(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  argTypes: {
    size: {
      options: ['xl', 'lg', 'md', 'sm', 'xs', '2xs'],
      description: 'Options for sizes',
      control: { type: 'radio' },
    },
    as: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Option for the Heading tag',
      control: { type: 'radio' },
    },
    caption: {
      control: 'text',
      description: 'Caption for the heading',
    },
  },
  args: {
    content: 'Heading',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading');
    expect(heading).toBeTruthy();
  },
  render: (arguments_) => createElement(arguments_),
};

export const Small: Story = {
  args: {
    as: 'h6',
    content: 'Small heading',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Small heading');
    expect(heading).toHaveClass('gi-heading-2xs');
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    as: 'h3',
    content: 'Medium heading',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Medium heading');
    expect(heading).toHaveClass('gi-heading-md');
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    as: 'h1',
    content: 'Large heading',
  },
  render: (arguments_) => createElement(arguments_),
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    as: 'h1',
    content: 'Extra large heading',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Caption: Story = {
  args: {
    size: 'md',
    as: 'h1',
    content: 'Heading with caption',
    caption: 'Caption Text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const caption = canvas.getByText('Caption Text');
    expect(caption).toBeDefined();
  },
};
