import type { Meta, StoryObj } from '@storybook/react';
import { SectionBreak } from './section-break.js';

const meta = {
  title: 'typography/SectionBreak',
  component: SectionBreak,
} satisfies Meta<typeof SectionBreak>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
