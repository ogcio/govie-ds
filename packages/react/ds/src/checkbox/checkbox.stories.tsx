import type { Meta, StoryObj } from '@storybook/react';
import CheckboxesGroup from './checkboxes-group.js';

const meta = {
  title: 'Form/Checkboxes',
  parameters: {
    docs: {
      description: {
        component: 'use this checkbox text where it is appropiate',
      },
    },
  },
  component: CheckboxesGroup,
} satisfies Meta<typeof CheckboxesGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    fieldId: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'the unique value for the checboxes group',
    },
    items: {
      control: 'object',
      type: {
        name: 'object',
        required: true,
        value: {
          label: {
            name: 'string',
          },
          value: {
            name: 'string',
            required: true,
          },
          hint: {
            name: 'string',
          },
        },
      },
      description: 'A list of the label, values and hint for the checkboxes',
    },
    errorMessage: {
      control: 'text',
      type: { name: 'string' },
      description: 'The text of the error message',
    },
    title: {
      control: 'object',
      type: {
        name: 'object',
        value: {
          value: {
            name: 'string',
          },
          asHeading: {
            name: 'boolean',
          },
          hint: {
            name: 'string',
          },
        },
      },
      description: 'The label, hint and option the make the title a heading',
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
      description: 'The sizes of the checkboxes',
    },
  },
  args: {
    fieldId: 'UniqueID',
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
    ],
    title: {
      value: 'Organisation',
      asHeading: {
        size: 'md',
        tag: 'h1',
      },
    },
  },
};

export const withHints: Story = {
  args: {
    fieldId: 'govie-field-ID',
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
    title: {
      value: 'What is your nationality?',
      asHeading: {
        size: 'md',
        tag: 'h1',
      },
      hint: 'If you have dual nationality, select all options that are relevant to you.',
    },
  },
};

export const withErrorMessage: Story = {
  args: {
    fieldId: 'govie-field-ID',
    items: [
      {
        label: 'Irish',
        value: 'irish',
      },
      {
        label: 'British',
        value: 'british',
      },
      {
        label: 'Citizen of another country',
        value: 'citizen-of-another-country',
      },
    ],
    title: {
      value: 'What is your nationality?',
      asHeading: {
        size: 'md',
        tag: 'h1',
      },
      hint: 'If you have dual nationality, select all options that are relevant to you.',
    },
    errorMessage:
      'Select if you are Irish, British or a citizen of a different country',
  },
};
