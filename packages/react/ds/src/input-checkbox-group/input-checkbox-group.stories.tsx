import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { InputCheckbox } from '../input-checkbox/input-checkbox.js';
import { InputCheckboxGroup } from './input-checkbox-group.js';

const meta = {
  title: 'Form/Checkbox/InputCheckboxGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Checkboxes component when you need to help users select multiple options from a list or toggle a single option on or off',
      },
    },
  },
  component: InputCheckboxGroup,
} satisfies Meta<typeof InputCheckboxGroup>;

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
  render: (props) => (
    <FormField>
      <FormFieldLabel>Organisation</FormFieldLabel>
      <InputCheckboxGroup {...props}>
        <InputCheckbox
          value="employment-tribunal"
          label="Employment Tribunal"
          id="UniqueID-check1"
        />
        <InputCheckbox
          value="ministry-of-defence"
          label="Ministry of Defence"
          id="UniqueID-check2"
        />
        <InputCheckbox
          value="department-for-transport"
          label="Department for Transport"
          id="UniqueID-check3"
        />
        <InputCheckbox
          value="others"
          label="Others"
          id="UniqueID-check4"
          disabled
        />
      </InputCheckboxGroup>
    </FormField>
  ),
};

export const WithLabelHintAndError: Story = {
  args: {
    groupId: 'govie-field-ID2',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>What is your nationality?</FormFieldLabel>
      <FormFieldHint>
        If you have dual nationality, select all options that are relevant to
        you.
      </FormFieldHint>
      <FormFieldError>
        Select if you are Irish, British or a citizen of a different country
      </FormFieldError>
      <InputCheckboxGroup {...arguments_}>
        <InputCheckbox value="irish" label="Irish" id="UniqueID-check1" />
        <InputCheckbox
          value="british"
          label="British"
          hint="including English, Scottish, Welsh and Northern Irish"
          id="govie-field-ID2-check2"
        />
        <InputCheckbox
          value="citizen-of-another-country"
          label="Citizen of another country"
          id="govie-field-ID2-check3"
        />
      </InputCheckboxGroup>
    </FormField>
  ),
};

export const Controlled: Story = {
  args: {
    groupId: 'controlled-checkbox-group',
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates a controlled input checkbox group where users can select multiple hobbies. The selected values are managed in the component's state, allowing for dynamic updates as checkboxes are checked or unchecked.",
      },
    },
  },
  render: (props) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

    return (
      <FormField>
        <FormFieldLabel>Select your hobbies</FormFieldLabel>
        <InputCheckboxGroup
          {...props}
          values={selectedValues}
          onChange={setSelectedValues}
        >
          <InputCheckbox
            value="reading"
            label="Reading"
            id="controlled-check1"
            checked={selectedValues.includes('reading')}
          />
          <InputCheckbox
            value="traveling"
            label="Traveling"
            id="controlled-check2"
            checked={selectedValues.includes('traveling')}
          />
          <InputCheckbox
            value="gaming"
            label="Gaming"
            id="controlled-check3"
            checked={selectedValues.includes('gaming')}
          />
        </InputCheckboxGroup>
      </FormField>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const readingCheckbox = await canvas.getByLabelText('Reading');
    const travelingCheckbox = await canvas.getByLabelText('Traveling');

    await userEvent.click(readingCheckbox);
    await userEvent.click(travelingCheckbox);

    await waitFor(() => {
      expect(readingCheckbox).toBeChecked();
      expect(travelingCheckbox).toBeChecked();
    });
  },
};
