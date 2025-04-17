import type { Meta, StoryObj } from '@storybook/react';
import { ButtonSize } from '../button/types.js';
import { ScoreSelect } from './score-select.js';

const meta = {
  title: 'Components/ScoreSelect',
  component: ScoreSelect,
  parameters: {
    docs: {
      description: {
        component:
          'ScoreSelect is a Likert-style button group with optional bottom labels for start, middle, and end. Great for opinion or feedback questions.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', type: { name: 'string', required: true } },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'] as ButtonSize[],
    },
    defaultValue: { control: 'text' },
    label: { control: 'text' },
    hint: { control: 'text' },
    leftLabel: { control: 'text' },
    rightLabel: { control: 'text' },
    onChange: { action: 'selected' },
  },
} satisfies Meta<typeof ScoreSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpinionScale5: Story = {
  name: 'Opinion Scale (1-5)',
  args: {
    name: 'opinion-scale-5',
    label: 'How strongly do you agree with this statement?',
    size: 'large',
    defaultValue: '3',
    options: Array.from({ length: 5 }, (_, index) => ({
      label: String(index + 1),
      value: String(index + 1),
    })),
    onChange(value) {
      console.log('Selected value:', value);
    },
  },
};

export const OpinionScale7: Story = {
  name: 'Opinion Scale (1–7)',
  args: {
    name: 'opinion-scale-7',
    label: 'How satisfied are you with your experience?',
    size: 'large',
    defaultValue: '4',
    options: Array.from({ length: 7 }, (_, index) => ({
      label: String(index + 1),
      value: String(index + 1),
    })),
    leftLabel: 'Very Dissatisfied',
    rightLabel: 'Very Satisfied',
    onChange(value) {
      console.log('Selected value:', value);
    },
  },
};

export const NPS: Story = {
  name: 'Net Promoter Score (0–10)',
  args: {
    name: 'nps',
    label:
      'How likely are you to recommend our service to a friend or colleague?',
    hint: 'Description',
    size: 'large',
    defaultValue: '6',
    options: Array.from({ length: 11 }, (_, index) => ({
      label: String(index),
      value: String(index),
    })),
    leftLabel: 'Not Likely',
    rightLabel: 'Extremely Likely',
    onChange(value) {
      console.log('Selected value:', value);
    },
  },
};
