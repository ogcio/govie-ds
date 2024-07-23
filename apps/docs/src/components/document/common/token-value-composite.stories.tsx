import type { Meta, StoryObj } from '@storybook/react';
import { TokenValueComposite } from './token-value-composite';

const meta = {
  title: 'Common/TokenValueComposite',
  component: TokenValueComposite,
} satisfies Meta<typeof TokenValueComposite>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tokens: [
      { name: 'Font size', value: '1rem' },
      { name: 'Line height', value: '2' },
    ],
  },
};
