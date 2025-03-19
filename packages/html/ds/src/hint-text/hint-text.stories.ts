import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createHintText } from '../helpers/forms';
import { beautifyHtmlNode } from '../storybook/storybook';
import { HintSize, HintTextProps } from './hint-text.schema';

const meta: Meta<HintTextProps> = {
  title: 'Typography/HintText',
};

export default meta;
type Story = StoryObj<HintTextProps>;

const createElement = (arguments_: HintTextProps) => {
  const label = createHintText(arguments_);
  return beautifyHtmlNode(label);
};

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'This is hint text' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        type: { summary: 'Size of the hint text' },
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
    size: HintSize.Medium,
    content: 'This is hint text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText('This is hint text');
    expect(hint).toHaveClass('gi-hint-text-md');
  },
};

export const Large: Story = {
  args: {
    size: HintSize.Large,
    content: 'This is hint text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText('This is hint text');
    expect(hint).toHaveClass('gi-hint-text-lg');
  },
};

export const Small: Story = {
  args: {
    size: HintSize.Small,
    content: 'This is hint text',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText('This is hint text');
    expect(hint).toHaveClass('gi-hint-text-sm');
  },
};
