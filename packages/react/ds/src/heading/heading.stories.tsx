import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './heading.js';

const meta = {
  title: 'Typography/Heading',
  component: Heading,
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Heading',
  },
};
