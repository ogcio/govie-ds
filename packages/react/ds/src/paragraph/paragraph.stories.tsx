import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Paragraph } from './paragraph.js';

const meta = {
  title: 'typography/Paragraph',
  component: Paragraph,
  parameters: {
    docs: {
      description: {
        component:
          'Paragraph component used for rendering body text with consistent spacing, font size, and line height.',
      },
    },
  },
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
    dataTestid: 'paragraph',
    children: 'This is a paragraph.',
    as: 'p',
    size: 'md',
    align: 'start',
    whitespace: 'normal',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph.');
    expect(paragraph).toHaveClass('gi-paragraph-md');
    expect(paragraph).toHaveClass('gi-text-start');
    expect(paragraph).toHaveClass('gi-whitespace-normal');
  },
};

export const RightAlignment: Story = {
  args: {
    dataTestid: 'paragraph',
    children: 'This is a paragraph.',
    as: 'p',
    size: 'md',
    align: 'end',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph.');
    expect(paragraph).toHaveClass('gi-paragraph-md');
    expect(paragraph).toHaveClass('gi-text-end');
    expect(paragraph).toHaveClass('gi-whitespace-normal');
  },
};

export const WhitespacePre: Story = {
  args: {
    dataTestid: 'paragraph',
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: 'p',
    whitespace: 'pre',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-pre');
  },
};

export const WhitespacePreWrap: Story = {
  args: {
    dataTestid: 'paragraph',
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: 'p',
    whitespace: 'pre-wrap',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-pre-wrap');
  },
};

export const WhitespaceBreakSpaces: Story = {
  args: {
    dataTestid: 'paragraph',
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: 'p',
    whitespace: 'break-spaces',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-break-spaces');
  },
};

export const AsSpan: Story = {
  args: {
    dataTestid: 'paragraph',
    as: 'span',
    children: 'This is a paragraph',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph');
    expect(paragraph).toHaveClass('gi-span-md');
  },
};
