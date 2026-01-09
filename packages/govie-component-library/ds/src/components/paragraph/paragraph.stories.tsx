import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const meta: Meta = {
  title: 'typography/Paragraph',
  parameters: { layout: 'centered' },
  argTypes: {
    children: { control: 'text' },
    as: { control: 'radio', options: ['p', 'span'] },
    size: { control: 'radio', options: ['lg', 'md', 'sm'] },
    align: { control: 'radio', options: ['start', 'center', 'end', 'justify'] },
    whitespace: {
      control: 'radio',
      options: ['normal', 'pre', 'pre-wrap', 'break-spaces'],
    },
    ariaLabel: { control: 'text' },
    dataTestid: { control: 'text' },
  },
  args: {
    dataTestid: 'paragraph',
    children: 'This is a paragraph.',
    as: 'p',
    size: 'md',
    align: 'start',
    whitespace: 'normal',
  },
};

export default meta;

type Story = StoryObj;

const renderParagraph = (args: any) => {
  const { children, ariaLabel, dataTestid, ...rest } = args;
  return (
    <govie-paragraph {...rest} aria-label={ariaLabel} data-testid={dataTestid}>
      {children}
    </govie-paragraph>
  );
};

export const Default: Story = { render: renderParagraph };

export const RightAlignment: Story = {
  args: {
    align: 'end',
    children: 'This is a paragraph.',
  },
  render: renderParagraph,
};

export const WhitespacePre: Story = {
  args: {
    whitespace: 'pre',
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we?

You will never know.`,
  },
  render: renderParagraph,
};

export const WhitespacePreWrap: Story = {
  args: {
    whitespace: 'pre-wrap',
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we?

You will never know.`,
  },
  render: renderParagraph,
};

export const WhitespaceBreakSpaces: Story = {
  args: {
    whitespace: 'break-spaces',
    children: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we?

You will never know.`,
  },
  render: renderParagraph,
};

export const AsSpan: Story = {
  args: {
    as: 'span',
    children: 'This is a paragraph',
    size: 'md',
  },
  render: renderParagraph,
};

export const RenderHtmlChildren: Story = {
  render: () => (
    <gi-paragraph as="p" size="sm">
      <a href="#">Anchor tag</a>
    </gi-paragraph>
  ),
};
