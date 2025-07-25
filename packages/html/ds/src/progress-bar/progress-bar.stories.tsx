import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { ProgressBarProps } from './types';

const meta: Meta<ProgressBarProps> = {
  title: 'indicators/ProgressBar',
};

export default meta;
type Story = StoryObj<ProgressBarProps>;

const createProgressBar = (arguments_: ProgressBarProps) => {
  const progressBarContainer = document.createElement('div');
  progressBarContainer.className = 'gi-progress-bar-container';

  const progressBar = document.createElement('div');
  progressBar.role = 'progressbar';
  progressBar.ariaValueNow = arguments_.isIndeterminate
    ? null
    : `${arguments_.value}`;
  progressBar.ariaValueMin = '0';
  if (arguments_.max) {
    progressBar.ariaValueMax = `${arguments_.max}`;
  }
  progressBar.ariaLabel = 'Progress bar';
  progressBar.className = 'gi-progress-bar';

  if (arguments_.isIndeterminate) {
    const indeterminate = document.createElement('div');
    indeterminate.className = 'gi-progress-bar-indeterminate';
    progressBar.append(indeterminate);
  } else if (arguments_.value && arguments_.max) {
    const percentage = (arguments_.value * 100) / arguments_.max;
    const progress = document.createElement('div');
    progress.style.width = `${percentage}%`;
    progressBar.append(progress);
  }

  progressBarContainer.append(progressBar);

  if (arguments_.label) {
    const label = document.createElement('span');
    label.textContent = arguments_.label;
    progressBarContainer.append(label);
  }

  return progressBarContainer;
};

const createElement = (arguments_: ProgressBarProps) => {
  const component = createProgressBar(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  args: {
    value: 50,
    max: 100,
    label: 'Label',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveAttribute('style', 'width: 50%;');
  },
};

export const WithLabelIndeterminate: Story = {
  args: {
    isIndeterminate: true,
    label: 'Loading...',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveClass('gi-progress-bar-indeterminate');
  },
};

export const Completed = {
  args: {
    value: 100,
    max: 100,
  },
  render: () => createElement,
};
