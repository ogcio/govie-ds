import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { createHintText } from '../helpers/forms';
import { HintSize, HintTextProps } from './types';

const meta: Meta<HintTextProps> = {
  title: 'Typography/HintText',
  parameters: {
    docs: {
      description: {
        component:
          'Use hint text alongside a form input for help that’s relevant to the majority of users, like how their information will be used, or where to find it.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<HintTextProps>;

const createElement = (arguments_: HintTextProps) => {
  const component = createHintText(arguments_);
  return parse(component.outerHTML) as React.ReactElement;
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

export const Medium: Story = {
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
