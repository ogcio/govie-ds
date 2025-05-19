import type { Meta, StoryObj } from '@storybook/react';
import { createInputRadioGroup } from '../helpers/input-radio-group';
import { createParagraph } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { RadioGroupProps } from './types';

const meta: Meta<RadioGroupProps> = {
  title: 'form/Radio/InputRadioGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Radio group component when users can only select one option.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Set the size of the radio button',
    },
  },
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

const standardProps: RadioGroupProps = {
  groupId: 'uniqueId',
  label: {
    content: 'Where do you live?',
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

const createElement = (arguments_: RadioGroupProps) => {
  const component = createInputRadioGroup(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    ...standardProps,
    groupId: 'UniqueId1',
  },
  render: (arguments_) => createElement(arguments_),
};

export const inline: Story = {
  args: {
    ...standardProps,
    groupId: 'UniqueId2',
    inline: true,
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithTitleHint: Story = {
  args: {
    ...standardProps,
    label: {
      content: 'Where do you live?',
    },
    hint: {
      content: 'Specify the location where you live',
    },
    groupId: 'UniqueId3',
  },
  render: (arguments_) => createElement(arguments_),
};

export const withError: Story = {
  args: {
    ...standardProps,
    label: {
      content: 'Where do you live?',
    },
    hint: {
      content: 'Specify the location where you live',
    },
    error: {
      content: 'Select a location',
    },
    groupId: 'UniqueId3',
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithOptionHints: Story = {
  args: {
    label: {
      content: 'Have you changed your name?',
    },
    hint: {
      content:
        'This includes changing your last name or spelling your name differently.',
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
  render: (arguments_) => createElement(arguments_),
};
export const WithDividerOption: Story = {
  args: {
    label: {
      content: 'Have you changed your name?',
    },
    hint: {
      content:
        'This includes changing your last name or spelling your name differently.',
    },
    items: [
      {
        label: 'Dublin',
        value: 'Dublin',
      },
      {
        label: 'Cork',
        value: 'Cork',
      },
      {
        label: 'Galway',
        value: 'Galway',
      },
      {
        slot: createParagraph({ content: 'or' }),
      },
      {
        label: 'None of above',
        value: 'none',
      },
    ],
    groupId: 'UniqueId4',
  },
  render: (arguments_) => createElement(arguments_),
};
export const withConditionalInput: Story = {
  args: {
    label: {
      content: 'How would you prefer to be contacted?',
    },
    items: [
      {
        label: 'email',
        value: 'email',
        conditionalInput: {
          id: 'input-id-email',
          label: {
            content: 'Email address',
            htmlFor: 'input-id-email',
            size: 'md',
          },
          type: 'email',
        },
      },
      {
        label: 'phone',
        value: 'phone',
        conditionalInput: {
          id: 'input-id-phone',
          label: {
            content: 'Phone number',
            htmlFor: 'input-id-phone',
            size: 'md',
          },
          type: 'tel',
        },
      },
    ],
    groupId: 'UniqueId7',
  },
  render: (arguments_) => createElement(arguments_),
};
