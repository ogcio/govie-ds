import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from './blockquote.js';

const meta = {
  title: 'Typography/Blockquote',
  parameters: {
    docs: {
      description: {
        component:
          '**Deprecated:** `Blockquote` is an alias of `InsetText` and is kept for backward compatibility. Use `InsetText` instead. This will be removed in version 2.',
      },
    },
  },
  component: Blockquote,
} satisfies Meta<typeof Blockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text or component within the blockquote.',
    },
    cite: {
      control: 'text',
      type: { name: 'string', required: false },
      description: 'The source URL or description for the quotation.',
    },
  },
  args: {
    children:
      'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.',
    cite: 'https://example.com/source',
  },
};
