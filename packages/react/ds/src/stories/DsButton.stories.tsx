import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import DsButton from '../atoms/DsButton';
import {
  meta as dsButtonMeta,
  stories as dsButtonStories,
} from '../atoms/DsButton.meta';

const meta = {
  ...dsButtonMeta,
  title: 'Form/DsButton',
  component: DsButton,
  args: {
    ...dsButtonMeta.args,
    children: {
      control: 'text',
      description: 'Click me',
    },
  },
} satisfies Meta<typeof DsButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: dsButtonStories.default.args,
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const contentText = typeof args.children === 'string' ? args.children : '';

    await step('renders button content', async () => {
      const element = canvas.getByRole('button', { name: contentText });
      expect(element).toBeInTheDocument();
    });

    await step('renders enabled by default', async () => {
      const element = canvas.getByRole('button', { name: contentText });
      expect(element).toBeEnabled();
    });
  },
};

export const Secondary: Story = {
  args: {
    ...dsButtonStories.secondary.args,
    children: 'Click me',
  },
};

export const Flat: Story = {
  args: {
    ...dsButtonStories.flat.args,
    children: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    ...dsButtonStories.disabled.args,
    children: 'Click me',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const contentText = typeof args.children === 'string' ? args.children : '';

    await step('renders disabled button', async () => {
      const element = canvas.getByRole('button', { name: contentText });
      expect(element).toBeDisabled();
    });
  },
};
