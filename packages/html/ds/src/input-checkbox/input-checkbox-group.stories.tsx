import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createCheckboxGroup } from '../helpers/forms';
import type { CheckboxGroupProps } from './types';

const meta: Meta<CheckboxGroupProps> = {
  title: 'form/Checkbox/InputCheckboxGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Checkboxes component when you need to help users select multiple options from a list or toggle a single option on or off',
      },
    },
  },
  argTypes: {
    groupId: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'the unique value for the checkboxes group',
    },
    size: {
      control: 'radio',
      options: ['md', 'sm'],
      description: 'The sizes of the checkboxes',
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxGroupProps>;

const createElement = (arguments_: CheckboxGroupProps) => {
  const component = createCheckboxGroup(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  args: {
    groupId: 'UniqueID',
    items: [
      {
        label: 'Employment Tribunal',
        value: 'employment-tribunal',
      },
      {
        label: 'Ministry of Defence',
        value: 'ministry-of-defence',
      },
      {
        label: 'Department for Transport',
        value: 'department-for-transport',
      },
      {
        label: 'Others',
        value: 'others',
        disabled: true,
      },
    ],
    label: {
      content: 'Organisation',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const withLabelHintAndError: Story = {
  args: {
    groupId: 'govie-field-ID-2',
    items: [
      {
        label: 'Irish',
        value: 'irish',
      },
      {
        label: 'British',
        value: 'british',
        hint: 'including English, Scottish, Welsh and Northern Irish',
      },
      {
        label: 'Citizen of another country',
        value: 'citizen-of-another-country',
      },
    ],
    label: {
      content: 'What is your nationality?',
    },
    hint: {
      content:
        'If you have dual nationality, select all options that are relevant to you.',
    },
    error: {
      content:
        'Select if you are Irish, British or a citizen of a different country',
    },
  },
  render: (arguments_) => createElement(arguments_),
};
