import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './chip.js';

const meta = {
  title: 'components/Chip',
  component: Chip,
  parameters: {
    docs: {
      description: {
        component:
          'A Chip is a compact UI element that displays information, can be removed via a close button, and is ideal for tags, filters, or selection indicators.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      name: 'label',
      type: 'string',
      description: 'The content of the chip',
    },
    onClose: {
      name: 'onClose',
      type: 'function',
      control: 'object',
      description: 'The event attached on closing the chip',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    onClose: () => {},
  },
};
