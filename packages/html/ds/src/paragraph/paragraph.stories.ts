import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './paragraph.html?raw';
import {
  AlignEnum,
  AsEnum,
  ParagraphProps,
  SizeEnum,
  WhitespaceEnum,
} from './paragraph.schema';

const macro = { name: 'govieParagraph', html };

const Paragraph = renderComponent<ParagraphProps>(macro);

const meta = {
  component: Paragraph,
  title: 'Typography/Paragraph',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

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
};

export const RightAlignment: Story = {
  args: {
    content: 'This is a paragraph.',
    as: AsEnum.Paragraph,
    size: SizeEnum.Medium,
    align: AlignEnum.End,
  },
};

export const WhitespacePre: Story = {
  args: {
    content: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: AsEnum.Paragraph,
    whitespace: WhitespaceEnum.Pre,
  },
};

export const WhitespacePreWrap: Story = {
  args: {
    content: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: AsEnum.Paragraph,
    whitespace: WhitespaceEnum.PreWrap,
  },
};

export const WhitespaceBreakSpaces: Story = {
  args: {
    content: `Hey everyone!

It's almost 2022       and we still don't know if there       is aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.`,
    as: AsEnum.Paragraph,
    whitespace: WhitespaceEnum.BreakSpaces,
  },
};
