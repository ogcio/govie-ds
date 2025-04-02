import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createHeading } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import type { HeadingProps } from './types';

const meta: Meta<HeadingProps> = {
  title: 'Typography/Heading',
};

export default meta;
type Story = StoryObj<HeadingProps>;

const createElement = (arguments_: HeadingProps) => {
  const component = createHeading(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    as: 'h1',
    content: 'Heading',
    caption: '',
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
    content: 'Heading with h6',
    caption: 'Caption Text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const caption = canvas.getByText('Caption Text');
    expect(caption).toBeDefined();
  },
};
