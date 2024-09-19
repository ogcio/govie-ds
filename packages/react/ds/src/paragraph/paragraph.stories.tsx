import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from './paragraph.js';

const meta = {
  title: 'typography/Paragraph',
  component: Paragraph,
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Paragraph',
  },
};

export const RightAlignment: Story = {
  args: {
    children: 'This is a paragraph.',
    as: 'p',
    size: 'md',
    align: 'right',
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
