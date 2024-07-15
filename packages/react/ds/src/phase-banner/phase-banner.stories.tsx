import type { Meta, StoryObj } from '@storybook/react';
import { PhaseBanner } from './phase-banner.js';

const meta = {
  title: 'navigation/PhaseBanner',
  component: PhaseBanner,
} satisfies Meta<typeof PhaseBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alpha: Story = {
  args: {
    level: 'alpha',
    children: 'This is an alpha service.',
  },
};

export const Beta: Story = {
  args: {
    level: 'beta',
    children: 'This is a beta service.',
  },
};
