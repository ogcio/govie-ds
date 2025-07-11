import type { Meta, StoryObj } from '@storybook/react';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { InputRadio } from '../input-radio/input-radio.js';
import { InputRadioGroup } from '../input-radio-group/input-radio-group.js';
import { Paragraph } from '../paragraph/paragraph.js';

const meta = {
  title: 'Form/Radio/InputRadioGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Radio group component when users can only select one option.',
      },
    },
  },
  component: InputRadioGroup,
} satisfies Meta<typeof InputRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    inline: {
      control: 'boolean',
      description: 'Specify if the radios should be inline',
    },
  },
  args: {
    groupId: 'city',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const Inline: Story = {
  args: {
    inline: true,
    groupId: 'city2',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <InputRadioGroup {...arguments_} inline>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithTitleHint: Story = {
  args: {
    groupId: 'city3',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <FormFieldHint>Select a city</FormFieldHint>
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    groupId: 'city6',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <FormFieldHint>Select a city</FormFieldHint>
      <FormFieldError>Please select a city</FormFieldError>
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithOptionHints: Story = {
  args: {
    groupId: 'login',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Have you changed your name?</FormFieldLabel>
      <FormFieldHint>
        This includes changing your last name or spelling your name differently.
      </FormFieldHint>
      <InputRadioGroup {...arguments_}>
        <InputRadio
          value="val1"
          label="Yes"
          hint="Yes, I have changed my name"
        />
        <InputRadio
          value="val2"
          label="No"
          hint="No, I didn't change my name"
        />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithDividerOption: Story = {
  args: {
    groupId: 'city5',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <FormFieldHint>Select a city</FormFieldHint>
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
        <Paragraph>or</Paragraph>
        <InputRadio value="none" label="None of the above" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithConditionalInput: Story = {
  args: {
    groupId: 'contact',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>How would you prefer to be contacted?</FormFieldLabel>
      <InputRadioGroup {...arguments_}>
        <InputRadio
          value="email"
          label="Email"
          conditionalInput={{ id: 'email', placeholder: 'Email address' }}
        />
        <InputRadio
          value="phone"
          label="Phone"
          conditionalInput={{ id: 'phone', placeholder: 'Phone number' }}
        />
      </InputRadioGroup>
    </FormField>
  ),
};
