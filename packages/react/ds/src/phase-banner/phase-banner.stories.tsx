import type { Meta, StoryObj } from '@storybook/react';
import { PhaseBanner } from './phase-banner.js';

const meta = {
  title: 'Typography/PhaseBanner',
  component: PhaseBanner,
} satisfies Meta<typeof PhaseBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The text content of the phase banner.',
    },
    level: {
      control: 'radio',
      options: ['alpha', 'beta'],
      type: { name: 'string', required: false },
      description: 'Specifies the level of the phase banner.',
    },
  },
  args: {
    children: 'This is a phase banner.',
    level: 'alpha',
  },
};
