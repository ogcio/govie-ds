import type { Meta, StoryObj } from '@storybook/react';
import { Draft } from './draft';

const meta = {
  title: 'Common/Draft',
  component: Draft,
} satisfies Meta<typeof Draft>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
