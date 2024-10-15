import type { Meta, StoryObj } from '@storybook/react';
import { RadiosGroup } from './radios-group.js';
import { RadiosGroupType } from './types.js';

const standardProps: RadiosGroupType = {
  fieldId: 'uniqueId',
  title: {
    value: 'Where do you live?',
    asHeading: {
      size: 'md',
      as: 'h2',
    },
  },
  items: [
    {
      label: 'England',
      value: 'england',
    },
    {
      label: 'Scotland',
      value: 'scotland',
    },
    {
      label: 'Ireland',
      value: 'ireland',
    },
  ],
};

const meta = {
  title: 'Form/Radios',
  parameters: {
    docs: {
      description: {
        component: 'use this radio component where it is appropiate',
      },
    },
  },
  component: RadiosGroup,
} satisfies Meta<typeof RadiosGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    fieldId: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'the unique value for the radios group',
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
          conditionalInput: {
            name: 'other',
            value:
              'Conditional input associated with the radio (see text input component)',
          },
        },
      },
      description:
        'A list of the label, values, hint and conditional for the radios',
    },
    inline: {
      control: 'boolean',
      description: 'Specify if the radios should be inline',
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
    ...standardProps,
    fieldId: 'UniqueId1',
  },
};

export const inline: Story = {
  args: {
    ...standardProps,
    fieldId: 'UniqueId2',
    inline: true,
  },
};

export const withTitleHint: Story = {
  args: {
    ...standardProps,
    title: {
      value: 'Where do you live?',
      hint: 'Specify the location where you live',
      asHeading: {
        size: 'md',
        as: 'h2',
      },
    },
    fieldId: 'UniqueId3',
  },
};

export const withOptionHints: Story = {
  args: {
    title: {
      value: 'Have you changed your name?',
      hint: 'This includes changing your last name or spelling your name differently.',
      asHeading: {
        size: 'md',
        as: 'h2',
      },
    },
    items: [
      {
        label: 'Yes',
        value: 'yes',
        hint: 'Yes, I have changed my name',
      },
      {
        label: 'No',
        value: 'no',
        hint: "No, I didn't change my name",
      },
    ],
    fieldId: 'UniqueId4',
  },
};

export const withDividerOption: Story = {
  args: {
    ...standardProps,
    dividerOption: {
      label: 'None of the above',
      value: 'none of the above',
    },
    fieldId: 'UniqueId5',
  },
};

export const withError: Story = {
  args: {
    ...standardProps,
    errorMessage: 'Please select an option',
    fieldId: 'UniqueId6',
  },
};

export const withConditionalInput: Story = {
  args: {
    title: {
      value: 'How would you prefer to be contacted?',
      asHeading: {
        size: 'md',
        as: 'h2',
      },
    },
    items: [
      {
        label: 'Email',
        value: 'email',
        conditionalInput: {
          id: 'input-id-email',
          label: {
            text: 'Email address',
          },
          type: 'email',
        },
      },
      {
        label: 'Phone',
        value: 'phone',
        conditionalInput: {
          id: 'input-id-phone',
          label: {
            text: 'Phone number',
          },
          type: 'tel',
        },
      },
    ],
    fieldId: 'UniqueId7',
  },
};

export const withNoTitle: Story = {
  args: {
    fieldId: 'uniqueId8',
    items: [
      {
        label: 'England',
        value: 'england',
      },
      {
        label: 'Scotland',
        value: 'scotland',
      },
      {
        label: 'Ireland',
        value: 'ireland',
      },
    ],
  },
};
