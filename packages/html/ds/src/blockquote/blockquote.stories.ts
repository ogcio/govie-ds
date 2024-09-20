import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './blockquote.html?raw';
import { BlockquoteProps } from './blockquote.schema';

const macro = { name: 'govieBlockquote', html };

const Blockquote = renderComponent<BlockquoteProps>(macro);

const meta = {
  component: Blockquote,
  title: 'Typography/Blockquote',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text content of the blockquote.',
    },
  },
  args: {
    content:
      'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
  },
};