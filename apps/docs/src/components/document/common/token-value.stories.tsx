import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TokenValue } from './token-value';

const meta = {
  title: 'Common/TokenValue',
  component: TokenValue,
} satisfies Meta<typeof TokenValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '1rem',
  },
};

export const WithConverted: Story = {
  args: {
    ...Default.args,
    converted: '16px',
  },
};

export const Inline: Story = {
  args: {
    ...WithConverted.args,
    inline: true,
  },
};
