import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../forms/form-field.js';
import { InputCheckbox } from '../input-checkbox/input-checkbox.js';
import { CheckboxGroup } from './checkbox-group.js';

const meta = {
  title: 'Form/Checkbox/CheckboxGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Checkboxes component when you need to help users select multiple options from a list or toggle a single option on or off',
      },
    },
  },
  component: CheckboxGroup,
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    groupId: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'the unique value for the checkboxes group',
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
      description: 'The sizes of the checkboxes',
    },
  },
  args: {
    groupId: 'UniqueID',
  },
  render: (arguments_) => (
    <FormField label={{ text: 'Organization' }}>
      <CheckboxGroup {...arguments_}>
        <InputCheckbox
          value={'employment-tribunal'}
          label={'Employment Tribunal'}
          id={'UniqueID-check1'}
        />
        <InputCheckbox
          value={'ministry-of-defence'}
          label={'Ministry of Defence'}
          id={'UniqueID-check2'}
        />
        <InputCheckbox
          value={'department-for-transport'}
          label={'Department for Transport'}
          id={'UniqueID-check3'}
        />
        <InputCheckbox
          value={'others'}
          label={'Others'}
          id={'UniqueID-check4'}
          disabled
        />
      </CheckboxGroup>
    </FormField>
  ),
};

export const withHints: Story = {
  args: {
    groupId: 'govie-field-ID',
  },
  render: (arguments_) => (
    <FormField
      label={{ text: 'What is your nationality?' }}
      hint={{
        text: 'If you have dual nationality, select all options that are relevant to you.',
      }}
    >
      <CheckboxGroup {...arguments_}>
        <InputCheckbox value={'irish'} label={'Irish'} id={'UniqueID-check1'} />
        <InputCheckbox
          value={'british'}
          label={'British'}
          hint="including English, Scottish, Welsh and Northern Irish"
          id={'govie-field-ID-check2'}
        />
        <InputCheckbox
          value={'citizen-of-another-country'}
          label={'Citizen of another country'}
          id={'govie-field-ID-check3'}
        />
      </CheckboxGroup>
    </FormField>
  ),
};

export const withErrorMessage: Story = {
  args: {
    groupId: 'govie-field-ID2',
  },
  render: (arguments_) => (
    <FormField
      label={{ text: 'What is your nationality?' }}
      hint={{
        text: 'If you have dual nationality, select all options that are relevant to you.',
      }}
      error={{
        text: 'Select if you are Irish, British or a citizen of a different country',
      }}
    >
      <CheckboxGroup {...arguments_}>
        <InputCheckbox value={'irish'} label={'Irish'} id={'UniqueID-check1'} />
        <InputCheckbox
          value={'british'}
          label={'British'}
          hint="including English, Scottish, Welsh and Northern Irish"
          id={'govie-field-ID2-check2'}
        />
        <InputCheckbox
          value={'citizen-of-another-country'}
          label={'Citizen of another country'}
          id={'govie-field-ID2-check3'}
        />
      </CheckboxGroup>
    </FormField>
  ),
};
