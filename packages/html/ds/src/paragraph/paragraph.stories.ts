import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import {
  AlignEnum,
  AsEnum,
  ParagraphProps,
  SizeEnum,
  WhitespaceEnum,
} from './paragraph.schema';

const meta: Meta<ParagraphProps> = {
  title: 'Typography/Paragraph',
};

export default meta;
type Story = StoryObj<ParagraphProps>;

const createParagraph = (arguments_: ParagraphProps) => {
  const container = document.createElement('div');

  let classSize = '';
  if (arguments_.size == 'lg') {
    classSize = arguments_.as == 'span' ? 'gi-span-lg' : 'gi-paragraph-lg';
  } else if (arguments_.size == 'sm') {
    classSize = arguments_.as == 'span' ? 'gi-span-sm' : 'gi-paragraph-sm';
  } else {
    classSize = arguments_.as == 'span' ? 'gi-span-md' : 'gi-paragraph-md';
  }

  let alignClass = '';
  if (arguments_.align == 'end') {
    alignClass = 'gi-text-end';
  } else if (arguments_.align == 'center') {
    alignClass = 'gi-text-center';
  } else if (arguments_.align == 'justify') {
    alignClass = 'gi-text-justify';
  } else {
    alignClass = 'gi-text-start';
  }

  let whitespaceClass = '';
  if (arguments_.whitespace == 'pre') {
    whitespaceClass = 'gi-whitespace-pre';
  } else if (arguments_.whitespace == 'pre-wrap') {
    whitespaceClass = 'gi-whitespace-pre-wrap';
  } else if (arguments_.whitespace == 'break-spaces') {
    whitespaceClass = 'gi-whitespace-break-spaces';
  } else {
    whitespaceClass = 'gi-whitespace-normal';
  }

  const component = document.createElement(arguments_.as ?? 'p');
  component.className =
    `${classSize} ${alignClass} ${whitespaceClass} gi-max-w-prose`.trim();
  component.textContent = arguments_.content;
  component.dataset.testid = arguments_.dataTestid ?? 'paragraph';

  container.append(component);

  return beautifyHtmlNode(container);
};

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text content of the paragraph.',
    },
    as: {
      control: 'radio',
      options: Object.values(AsEnum),
      type: { name: 'string', required: false },
      description: 'Specifies the HTML element to render the component as.',
    },
    size: {
      control: 'radio',
      options: Object.values(SizeEnum),
      type: { name: 'string', required: false },
      description: 'Specifies the size of the paragraph.',
    },
    align: {
      control: 'radio',
      options: Object.values(AlignEnum),
      type: { name: 'string', required: false },
      description: 'Specifies the alignment of the paragraph.',
    },
    whitespace: {
      control: 'radio',
      options: Object.values(WhitespaceEnum),
      type: { name: 'string', required: false },
      description: 'Specifies the whitespace property.',
    },
  },
  args: {
    content: 'This is a paragraph.',
    as: AsEnum.Paragraph,
    size: SizeEnum.Medium,
    align: AlignEnum.Start,
    whitespace: WhitespaceEnum.Normal,
  },
  render: (arguments_) => createParagraph(arguments_),
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
    as: AsEnum.Paragraph,
    size: SizeEnum.Medium,
    align: AlignEnum.End,
  },
  render: (arguments_) => createParagraph(arguments_),
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
    content: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: AsEnum.Paragraph,
    whitespace: WhitespaceEnum.Pre,
    dataTestid: 'paragraph',
  },
  render: (arguments_) => createParagraph(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-pre');
  },
};

export const WhitespacePreWrap: Story = {
  args: {
    content: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: AsEnum.Paragraph,
    whitespace: WhitespaceEnum.PreWrap,
    dataTestid: 'paragraph',
  },
  render: (arguments_) => createParagraph(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-pre-wrap');
  },
};

export const WhitespaceBreakSpaces: Story = {
  args: {
    content: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: AsEnum.Paragraph,
    whitespace: WhitespaceEnum.BreakSpaces,
    dataTestid: 'paragraph',
  },
  render: (arguments_) => createParagraph(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByTestId('paragraph');
    expect(paragraph).toHaveClass('gi-whitespace-break-spaces');
  },
};

export const AsSpan: Story = {
  args: {
    as: AsEnum.Span,
    content: 'This is a paragraph',
    size: SizeEnum.Medium,
  },
  render: (arguments_) => createParagraph(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph');
    expect(paragraph).toHaveClass('gi-span-md');
  },
};
