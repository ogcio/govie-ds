import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './container.js';

const meta = {
  title: 'Layout/Container',
  parameters: {
    docs: {
      description: {
        component:
          'Container component when you need a centralised, consistent layout wrapper for content on your webpage.',
      },
    },
  },
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      description:
        'HTML content or other components to be rendered inside the container.',
    },
  },
  args: {
    children: `Paragraph`,
  },
};

export const WithInset: Story = {
  args: {
    children: 'Paragraph',
    inset: true,
  },
};
