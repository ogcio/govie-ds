import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '../paragraph/paragraph.js';
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
    children: <Paragraph>This is an alpha service.</Paragraph>,
  },
};

export const Beta: Story = {
  args: {
    level: 'beta',
    children: <Paragraph>This is a beta service.</Paragraph>,
  },
};
