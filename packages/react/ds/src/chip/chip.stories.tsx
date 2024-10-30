import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './chip.js';

const meta = {
  title: 'components/Chip',
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    onClose: () => {},
  },
};
