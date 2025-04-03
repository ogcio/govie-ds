import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../forms/form-field.js';
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
    <FormField label={{ text: 'Where do you live?' }}>
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
    <FormField label={{ text: 'Where do you live?' }}>
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
    <FormField
      label={{ text: 'Where do you live?' }}
      hint={{ text: 'Select a city' }}
    >
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
    <FormField
      label={{ text: 'How do you want to sign in?' }}
      hint={{
        text: "You'll need an account to prove your identity and complete your Self Assessment",
      }}
    >
      <InputRadioGroup {...arguments_}>
        <InputRadio
          value={'val1'}
          label={'Sign in with Username and Password'}
          hint="You'll have a user ID if you've registered for Self Assessment or filed a tax return online before"
        />
        <InputRadio
          value={'val2'}
          label={'Sign in with MyGovID'}
          hint="If you don't have a MyGovID Login, you can create one"
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
    <FormField
      label={{ text: 'Where do you live?' }}
      hint={{ text: 'Select a city' }}
    >
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
        <Paragraph>or</Paragraph>
        <InputRadio value={'none'} label={'Non of above'} />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    groupId: 'city6',
  },
  render: (arguments_) => (
    <FormField
      label={{ text: 'Where do you live?' }}
      hint={{ text: 'Select a city' }}
      error={{ text: 'Please select a city' }}
    >
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithConditionalInput: Story = {
  args: {
    groupId: 'contact',
  },
  render: (arguments_) => (
    <FormField label={{ text: 'How would you prefer to be contacted?' }}>
      <InputRadioGroup {...arguments_}>
        <InputRadio
          value={'email'}
          label={'email'}
          conditionalInput={{ id: 'email', placeholder: 'Email address' }}
        />
        <InputRadio
          value={'phone'}
          label={'Phone'}
          conditionalInput={{ id: 'phone', placeholder: 'Phone number' }}
        />
      </InputRadioGroup>
    </FormField>
  ),
};
