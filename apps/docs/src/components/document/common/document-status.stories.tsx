import type { Meta, StoryObj } from '@storybook/react';
import { DocumentStatus } from './document-status';

const meta = {
  title: 'Common/DocumentStatus',
  component: DocumentStatus,
} satisfies Meta<typeof DocumentStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InDevelopment: Story = {
  args: {
    status: 'in-development',
  },
};

export const ComingSoon: Story = {
  args: {
    status: 'coming-soon',
  },
};
