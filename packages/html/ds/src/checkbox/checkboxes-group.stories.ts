import type { Meta, StoryObj } from '@storybook/react';
import { Size, Tag } from '../heading/heading.schema';
import { renderComponent } from '../storybook/storybook';
import html from './checkboxes-group.html?raw';
import type { CheckboxesProps } from './checkboxes.schema';

const macro = { name: 'govieCheckboxesGroup', html };

const Checkboxes = renderComponent<CheckboxesProps>(macro);

const meta = {
  component: Checkboxes,
  title: 'form/Checkbox/CheckboxesGroup',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Checkboxes component when you need to help users select multiple options from a list or toggle a single option on or off',
      },
    },
  },
} satisfies Meta<typeof Checkboxes>;

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
        size: Size.LARGE,
        as: Tag.H1,
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
        size: Size.MEDIUM,
        as: Tag.H1,
      },
      hint: 'If you have dual nationality, select all options that are relevant to you.',
    },
  },
};

export const withErrorMessage: Story = {
  args: {
    fieldId: 'govie-field-ID-2',
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
        size: Size.MEDIUM,
        as: Tag.H3,
      },
      hint: 'If you have dual nationality, select all options that are relevant to you.',
    },
    errorMessage:
      'Select if you are Irish, British or a citizen of a different country',
  },
};

export const withNoneOption: Story = {
  args: {
    fieldId: 'govie-field-ID-3',
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
        size: Size.MEDIUM,
        as: Tag.H1,
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
    fieldId: '',
    items: [],
  },
  render: () =>
    `<div class="gi-flex gi-gap-4 gi-flex-col">
      <div class="gi-checkbox-group-checkboxes-container">
        <div class="gi-checkbox-container">
          <input
            name="Default"
            data-element="checkbox0"
            id="default-checkbox-0"
            class="gi-w-8 gi-h-8 checked:before:gi-w-5 checked:before:gi-h-2.5 checked:before:gi-left-1 checked:before:gi-top-1.5 gi-checkbox-input"
            type="checkbox"
            value="default"
          />
          <label for="default-checkbox-0" class="gi-checkbox-label">Default</label>
        </div>
    </div>
    <div class="gi-checkbox-group-container">
      <fieldset>
        <div class="gi-checkbox-group-checkboxes-container">
          <div class="gi-checkbox-container">
            <input
              name="Hover"
              data-element="checkbox0"
              id="hover-checkbox-0"
              class="gi-w-8 gi-h-8 checked:before:gi-w-5 checked:before:gi-h-2.5 checked:before:gi-left-1 checked:before:gi-top-1.5 gi-checkbox-input pseudo-hover"
              type="checkbox"
              value="hover"
            />
            <label for="hover-checkbox-0" class="gi-checkbox-label">Hover</label>
          </div>
        </div>
      </fieldset>
    </div>
  
    <div class="gi-checkbox-group-container">
      <fieldset>
        <div class="gi-checkbox-group-checkboxes-container">
          <div class="gi-checkbox-container">
            <input
              name="Focus"
              data-element="checkbox0"
              id="focus-checkbox-0"
              class="gi-w-8 gi-h-8 checked:before:gi-w-5 checked:before:gi-h-2.5 checked:before:gi-left-1 checked:before:gi-top-1.5 gi-checkbox-input pseudo-focus"
              type="checkbox"
              value="focus"
            />
            <label for="focus-checkbox-0" class="gi-checkbox-label">Focus</label>
          </div>
        </div>
      </fieldset>
    </div>
  
    <div class="gi-checkbox-group-container">
      <fieldset>
        <div class="gi-checkbox-group-checkboxes-container">
          <div class="gi-checkbox-container">
            <input
              name="Disabled"
              data-element="checkbox0"
              id="disabled-checkbox-0"
              class="gi-w-8 gi-h-8 checked:before:gi-w-5 checked:before:gi-h-2.5 checked:before:gi-left-1 checked:before:gi-top-1.5 gi-checkbox-input"
              disabled
              type="checkbox"
              value="disabled"
            />
            <label for="disabled-checkbox-0" class="gi-checkbox-label">Disabled</label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
  `,
};
