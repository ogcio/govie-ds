import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './paragraph.html?raw';
import {
  AlignEnum,
  AsEnum,
  ParagraphProps,
  SizeEnum,
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
  },
  args: {
    content: 'This is a paragraph.',
    as: AsEnum.Paragraph,
    size: SizeEnum.Medium,
    align: AlignEnum.Left,
  },
};

export const RightAlignment: Story = {
  args: {
    content: 'This is a paragraph.',
    as: AsEnum.Paragraph,
    size: SizeEnum.Medium,
    align: AlignEnum.Right,
  },
};
