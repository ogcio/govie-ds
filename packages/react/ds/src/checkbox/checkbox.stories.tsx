import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxesGroup } from './checkboxes-group.js';

const meta = {
  title: 'Form/Checkboxes',
  parameters: {
    docs: {
      description: {
        component:
          'Checkboxes component when you need to help users select multiple options from a list or toggle a single option on or off',
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
      description: 'the unique value for the checkboxes group',
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
    noneOption: {
      control: 'object',
      type: {
        name: 'object',
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
      description: 'The label, value and hint of the none option checkbox',
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
      {
        label: 'Others',
        value: 'others',
        disabled: true,
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

export const withNoneOption: Story = {
  args: {
    fieldId: 'govie-field-ID',
    items: [
      {
        label: 'France',
        value: 'france',
      },
      {
        label: 'Portugal',
        value: 'portugal',
      },
      {
        label: 'Spain',
        value: 'spain',
      },
    ],
    title: {
      value: 'Will you be travelling to any of these countries?',
      asHeading: {
        size: 'md',
        tag: 'h1',
      },
      hint: 'Select all countries that apply',
    },
    noneOption: {
      label: 'No, I will not be travelling to any of these countries',
      value: 'no-travel',
    },
  },
};

export const AllStates: Story = {
  args: {
    fieldId: 'govie-field-ID',
    items: [
      {
        label: '',
        value: '',
      },
    ],
  },
  render: () => (
    <div className="gi-flex gi-gap-4 gi-flex-col">
      <CheckboxesGroup
        items={[
          {
            label: 'Default',
            value: 'default',
          },
        ]}
        fieldId="default-checkbox"
      />
      <CheckboxesGroup
        items={[
          {
            label: 'Hover',
            value: 'hover',
          },
        ]}
        fieldId="hover-checkbox"
      />
      <CheckboxesGroup
        items={[
          {
            label: 'Focus',
            value: 'focus',
          },
        ]}
        fieldId="focus-checkbox"
      />
      <CheckboxesGroup
        items={[
          {
            label: 'Disabled',
            value: 'disabled',
            disabled: true,
          },
        ]}
        fieldId="disabled-checkbox"
      />
    </div>
  ),
  parameters: {
    pseudo: {
      hover: '#hover-checkbox-0',
      focus: '#focus-checkbox-0',
    },
  },
};
