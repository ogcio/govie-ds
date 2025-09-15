import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { ProgressBar } from './progress-bar.js';

const meta = {
  title: 'indicators/ProgressBar',
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    value: {
      type: { name: 'number' },
      description: 'The current value of the progress bar.',
    },
    max: {
      type: { name: 'number' },
      description: 'The max value of the progress bar.',
    },
    isIndeterminate: {
      type: { name: 'boolean' },
      description: 'Set infinite progress for the progress bar',
    },
    label: {
      type: { name: 'string' },
      description: 'Set custom label for the progress bars',
    },
  },
  args: {
    value: 50,
    label: 'Label',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render a progress bar with a specified value',
      async () => {
        const progressBar = await canvas.findByTestId('progress-bar');
        expect(progressBar).toBeTruthy();

        const progressBarInner =
          progressBar.firstElementChild as HTMLElement | null;
        expect(progressBarInner).toBeTruthy();
        expect(progressBarInner?.style?.width).toBe('50%');
      },
    );
  },
};

export const WithLabelIndeterminate: Story = {
  args: {
    isIndeterminate: true,
    label: 'Loading...',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render an indeterminate progress bar correctly',
      async () => {
        const progressBar = await canvas.findByTestId('progress-bar');
        expect(progressBar).toBeTruthy();

        const progressBarInner =
          progressBar.firstElementChild as HTMLElement | null;
        expect(progressBarInner).toBeTruthy();
        expect(progressBarInner).toHaveClass('gi-progress-bar-indeterminate');
      },
    );
  },
};

export const Completed = {
  args: {
    value: 100,
  },
};

export const TestMax500Value200: Story = {
  args: {
    max: 500,
    value: 200,
  },
  tags: ['skip-playwright'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render progress bar with final value set', async () => {
      const progressBar = await canvas.findByTestId('progress-bar');
      expect(progressBar).toBeTruthy();

      const progressBarInner =
        progressBar.firstElementChild as HTMLElement | null;
      expect(progressBarInner).toBeTruthy();
      expect(progressBarInner?.style?.width).toBe('40%');
    });
  },
};
