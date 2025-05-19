import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../forms/form-field.js';
import { ButtonGroup, ButtonGroupItem } from './button-group.js';

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
    name: {
      control: 'text',
      description: 'Name attribute for the button group',
      type: { name: 'string', required: true },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the buttons',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value',
    },
    onChange: {
      action: 'selected',
      description: 'Callback when a value is selected',
    },
    children: {
      description:
        'ButtonGroupItem components to render inside the ButtonGroup',
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (arguments_) => {
    const options = [
      { label: 'Opt 1', value: '1' },
      { label: 'Opt 2', value: '2' },
      { label: 'Opt 3', value: '3' },
      { label: 'Opt 4', value: '4' },
    ];

    return (
      <ButtonGroup
        name={arguments_.name}
        size={arguments_.size}
        defaultValue={arguments_.defaultValue}
        onChange={(value) => console.log(value)}
      >
        {options.map((option) => (
          <ButtonGroupItem key={option.value} value={option.value}>
            {option.label}
          </ButtonGroupItem>
        ))}
      </ButtonGroup>
    );
  },
  args: {
    name: 'likelihood-feedback',
    size: 'large',
    defaultValue: '6',
  },
};

export const OpinionScale: Story = {
  name: 'Opinion Scale',
  render: (arguments_) => {
    const options = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '10', value: '10' },
    ];

    return (
      <FormField
        className="gi-w-full"
        label={{
          text: 'How likely are you to recommend our service to a friend or colleague?',
        }}
        hint={{
          text: '1 = Not likely, 10 = Extremely likely',
        }}
      >
        <ButtonGroup
          name={arguments_.name}
          size={arguments_.size}
          defaultValue={arguments_.defaultValue}
          onChange={(value) => console.log(value)}
        >
          {options.map((option) => (
            <ButtonGroupItem key={option.value} value={option.value}>
              {option.label}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>
      </FormField>
    );
  },
  args: {
    name: 'likelihood-feedback',
    size: 'large',
    defaultValue: '6',
  },
};

export const ExplicitItems: Story = {
  name: 'Yes/No Question',
  render: (arguments_) => {
    return (
      <FormField
        label={{
          text: 'Are you currently a customer?',
        }}
      >
        <ButtonGroup
          name={arguments_.name}
          size={arguments_.size}
          defaultValue={arguments_.defaultValue}
          onChange={(value) => console.log(value)}
        >
          <ButtonGroupItem value="yes">Yes</ButtonGroupItem>
          <ButtonGroupItem value="no">No</ButtonGroupItem>
        </ButtonGroup>
      </FormField>
    );
  },
  args: {
    name: 'customer-status',
    size: 'medium',
    defaultValue: 'no',
  },
};
