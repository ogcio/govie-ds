import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './button-group.js';

const meta = {
  title: 'Form/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'ButtonGroup component that behaves like a radio group using buttons. Useful for questionnaire-style inputs.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the button group',
      type: { name: 'string', required: true },
    },
    hint: {
      control: 'text',
      description: 'Optional hint displayed below the label',
      type: { name: 'string' },
    },
    name: {
      control: 'text',
      description: 'Name attribute for the button group',
      type: { name: 'string', required: true },
    },
    options: {
      control: 'object',
      description: 'Array of options for the button group',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value',
    },
    onChange: {
      action: 'selected',
      description: 'Callback when a value is selected',
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Feedback Likelihood Scale',
  render: (arguments_) => {
    return (
      <div className="gi-flex gi-flex-col gi-items-center gi-gap-1">
        <ButtonGroup {...arguments_} onChange={(value) => console.log(value)} />
        <div className="gi-flex gi-w-full gi-justify-between gi-text-sm gi-pt-1">
          <span>Extremely Dissatisfied</span>
          <span>Extremely Satisfied</span>
        </div>
      </div>
    );
  },
  args: {
    name: 'likelihood-feedback',
    label:
      'How likely are you to recommend our service to a friend or colleague?',
    hint: '1 = Not likely, 10 = Extremely likely',
    size: 'large',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '10', value: '10' },
    ],
    defaultValue: '6',
  },
};
