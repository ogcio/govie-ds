import type { Meta, StoryObj } from '@storybook/react';
import { TokenName } from './token-name';

const meta = {
  title: 'Common/TokenName',
  component: TokenName,
} satisfies Meta<typeof TokenName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'font-size/md',
  },
};
