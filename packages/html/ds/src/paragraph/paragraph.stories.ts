import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createParagraph } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ParagraphProps } from './types';

const meta: Meta<ParagraphProps> = {
  title: 'Typography/Paragraph',
  parameters: {
    docs: {
      description: {
        component:
          'Paragraph component used for rendering body text with consistent spacing, font size, and line height.',
      },
    },
  },
  argTypes: {
    content: {
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
};

export default meta;
type Story = StoryObj<ParagraphProps>;

const createElement = (arguments_: ParagraphProps) => {
  const component = createParagraph(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    content: 'Paragraph.',
    dataTestid: 'paragraph',
    as: 'p',
    size: 'md',
    align: 'start',
    whitespace: 'normal',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('Paragraph.');
    expect(paragraph).toHaveClass('gi-paragraph-md');
    expect(paragraph).toHaveClass('gi-text-start');
    expect(paragraph).toHaveClass('gi-whitespace-normal');
  },
};

export const RightAlignment: Story = {
  args: {
    content: 'This is a paragraph.',
    as: 'p',
    size: 'md',
    align: 'end',
  },
  render: (arguments_) => createElement(arguments_),
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
    content: `<pre>Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.</pre>`,
    as: 'p',
    whitespace: 'pre',
    dataTestid: 'paragraph',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-pre');
  },
};

export const WhitespacePreWrap: Story = {
  args: {
    content: `<pre>Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.</pre>`,
    as: 'p',
    whitespace: 'pre-wrap',
    dataTestid: 'paragraph',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-pre-wrap');
  },
};

export const WhitespaceBreakSpaces: Story = {
  args: {
    content: `<pre>Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.</pre>`,
    as: 'p',
    whitespace: 'break-spaces',
    dataTestid: 'paragraph',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-break-spaces');
  },
};

export const AsSpan: Story = {
  args: {
    as: 'span',
    content: 'This is a paragraph',
    size: 'md',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph');
    expect(paragraph).toHaveClass('gi-span-md');
  },
};
