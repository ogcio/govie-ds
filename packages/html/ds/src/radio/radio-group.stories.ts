import type { Meta, StoryObj } from '@storybook/react';
import { Size, Tag } from '../heading/heading.schema';
import { renderComponent } from '../storybook/storybook';
import { InputTypeEnum } from '../text-input/text-input.schema';
import type { RadiosProps } from './radio.schema';
import html from './radios-group.html?raw';

const macro = { name: 'govieRadioGroup', html };

const Radios = renderComponent<RadiosProps>(macro);

const standardProps = {
  groupId: 'uniqueId',
  title: {
    value: 'Where do you live?',
    asHeading: {
      size: Size.MEDIUM,
      as: Tag.H2,
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
  component: Radios,
  title: 'form/Radio/RadioGroup',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Radio component when users can only select one option from a list.',
      },
    },
  },
} satisfies Meta<typeof Radios>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    groupId: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'The unique value for the radios group',
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
    groupId: 'UniqueId1',
  },
};

export const inline: Story = {
  args: {
    ...standardProps,
    groupId: 'UniqueId2',
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
        size: Size.MEDIUM,
        as: Tag.H2,
      },
    },
    groupId: 'UniqueId3',
  },
};

export const withOptionHints: Story = {
  args: {
    title: {
      value: 'Have you changed your name?',
      hint: 'This includes changing your last name or spelling your name differently.',
      asHeading: {
        size: Size.MEDIUM,
        as: Tag.H2,
      },
    },
    items: [
      {
        label: 'Yes',
        value: 'no',
        hint: 'Yes, I have changed my name',
      },
      {
        label: 'No',
        value: 'no',
        hint: "No, I didn't change my name",
      },
    ],
    groupId: 'UniqueId4',
  },
};

export const withDividerOption: Story = {
  args: {
    ...standardProps,
    dividerOption: {
      label: 'None of the above',
      value: 'none of the above',
    },
    groupId: 'UniqueId5',
  },
};

export const withError: Story = {
  args: {
    ...standardProps,
    errorMessage: 'Please select an option',
    groupId: 'UniqueId6',
  },
};

export const withConditionalInput: Story = {
  args: {
    title: {
      value: 'How would you prefer to be contacted?',
      asHeading: {
        size: Size.MEDIUM,
        as: Tag.H2,
      },
    },
    items: [
      {
        label: 'Email',
        value: 'email',
        conditionalInput: {
          id: 'input-id-email',
          label: {
            content: 'Email address',
            for: 'input-id-email',
            size: 'md',
          },
          type: InputTypeEnum.EMAIL,
        },
      },
      {
        label: 'Phone',
        value: 'phone',
        conditionalInput: {
          id: 'input-id-phone',
          label: {
            content: 'Phone number',
            for: 'input-id-phone',
            size: 'md',
          },
          type: InputTypeEnum.TEL,
        },
      },
    ],
    groupId: 'UniqueId7',
  },
};

export const withNoTitle: Story = {
  args: {
    groupId: 'uniqueId8',
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

export const singleRadio: Story = {
  args: {
    groupId: 'uniqueId9',
    items: [
      {
        label: 'England',
        value: 'england',
      },
    ],
  },
};

export const withDefaultChecked: Story = {
  args: {
    groupId: 'uniqueId10',
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
    defaultValue: 'ireland',
  },
};
