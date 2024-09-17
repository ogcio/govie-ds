import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from './blockquote.js';

const meta = {
  title: 'typography/Blockquote',
  component: Blockquote,
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
  },
};
