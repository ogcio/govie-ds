import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createParagraph } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ParagraphProps } from './types';

const meta: Meta<ParagraphProps> = {
  title: 'Typography/Paragraph',
};

export default meta;
type Story = StoryObj<ParagraphProps>;

const createElement = (arguments_: ParagraphProps) => {
  const component = createParagraph(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    content: 'This is a paragraph.',
    as: 'p',
    size: 'md',
    align: 'start',
    whitespace: 'normal',
  },
  render: (arguments_) => createElement(arguments_),
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
