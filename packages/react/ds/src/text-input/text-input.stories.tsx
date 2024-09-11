import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './text-input.js';

const meta = {
  title: 'form/TextInput',
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
