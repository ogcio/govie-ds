import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from './paragraph.js';

const meta = {
  title: 'typography/Paragraph',
  component: Paragraph,
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text content of the paragraph.',
    },
    as: {
      control: 'radio',
      options: ['p', 'span'],
      type: { name: 'string', required: false },
      description: 'Specifies the HTML element to render the component as.',
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
      type: { name: 'string', required: false },
      description: 'Specifies the size of the paragraph.',
    },
    align: {
      control: 'radio',
      options: ['start', 'center', 'end', 'justify'],
      type: { name: 'string', required: false },
      description: 'Specifies the alignment of the paragraph.',
    },
    whitespace: {
      control: 'radio',
      options: ['normal', 'pre', 'pre-wrap', 'break-spaces'],
      type: { name: 'string', required: false },
      description: 'Specifies the whitespace property.',
    },
  },
  args: {
    children: 'Paragraph',
    as: 'p',
    size: 'md',
    align: 'start',
    whitespace: 'normal',
  },
};

export const RightAlignment: Story = {
  args: {
    children: 'This is a paragraph.',
    as: 'p',
    size: 'md',
    align: 'end',
  },
};

export const WhitespacePre: Story = {
  args: {
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: 'p',
    whitespace: 'pre',
  },
};

export const WhitespacePreWrap: Story = {
  args: {
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: 'p',
    whitespace: 'pre-wrap',
  },
};

export const WhitespaceBreakSpaces: Story = {
  args: {
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: 'p',
    whitespace: 'break-spaces',
  },
};
