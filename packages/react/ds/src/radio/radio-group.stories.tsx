import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from '../forms/form-field.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { RadioGroup } from './radio-group.js';
import { Radio } from './radio.js';

const meta = {
  title: 'Form/Radio/RadioGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Radio group component when users can only select one option.',
      },
    },
  },
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    inline: {
      control: 'boolean',
      description: 'Specify if the radios should be inline',
    },
  },
  args: {},
  render: (arguments_) => (
    <FormField label={{ text: 'Where do you live?' }}>
      <RadioGroup {...arguments_}>
        <Radio name="city" value={'dublin'} label={'Dublin'} />
        <Radio name="city" value={'cork'} label={'Cork'} />
        <Radio name="city" value={'galway'} label={'Galway'} />
      </RadioGroup>
    </FormField>
  ),
};

export const inline: Story = {
  args: {
    inline: true,
  },
  render: (arguments_) => (
    <FormField label={{ text: 'Where do you live?' }}>
      <RadioGroup {...arguments_} inline>
        <Radio name="city2" value={'dublin'} label={'Dublin'} />
        <Radio name="city2" value={'cork'} label={'Cork'} />
        <Radio name="city2" value={'galway'} label={'Galway'} />
      </RadioGroup>
    </FormField>
  ),
};

export const withTitleHint: Story = {
  args: {},
  render: (arguments_) => (
    <FormField
      label={{ text: 'Where do you live?' }}
      hint={{ text: 'Select a city' }}
    >
      <RadioGroup {...arguments_}>
        <Radio name="city3" value={'dublin'} label={'Dublin'} />
        <Radio name="city3" value={'cork'} label={'Cork'} />
        <Radio name="city3" value={'galway'} label={'Galway'} />
      </RadioGroup>
    </FormField>
  ),
};

export const withOptionHints: Story = {
  args: {},
  render: (arguments_) => (
    <FormField
      label={{ text: 'How do you want to sign in?' }}
      hint={{
        text: "You'll need an account to prove your identity and complete your Self Assessment",
      }}
    >
      <RadioGroup {...arguments_}>
        <Radio
          name="login"
          value={'val1'}
          label={'Sign in with Username and Password'}
          hint="You'll have a user ID if you've registered for Self Assessment or filed a tax return online before"
        />
        <Radio
          name="login"
          value={'val2'}
          label={'Sign in with MyGovID'}
          hint="If you don't have a MyGovID Login, you can create one"
        />
      </RadioGroup>
    </FormField>
  ),
};

export const withDividerOption: Story = {
  args: {},
  render: (arguments_) => (
    <FormField
      label={{ text: 'Where do you live?' }}
      hint={{ text: 'Select a city' }}
    >
      <RadioGroup {...arguments_}>
        <Radio name="city5" value={'dublin'} label={'Dublin'} />
        <Radio name="city5" value={'cork'} label={'Cork'} />
        <Radio name="city5" value={'galway'} label={'Galway'} />
        <Paragraph>or</Paragraph>
        <Radio name="city5" value={'none'} label={'Non of above'} />
      </RadioGroup>
    </FormField>
  ),
};

export const withError: Story = {
  args: {},
  render: (arguments_) => (
    <FormField
      label={{ text: 'Where do you live?' }}
      hint={{ text: 'Select a city' }}
      error={{ text: 'Please select a city' }}
    >
      <RadioGroup {...arguments_}>
        <Radio name="city6" value={'dublin'} label={'Dublin'} />
        <Radio name="city6" value={'cork'} label={'Cork'} />
        <Radio name="city6" value={'galway'} label={'Galway'} />
      </RadioGroup>
    </FormField>
  ),
};

export const withConditionalInput: Story = {
  args: {},
  render: (arguments_) => (
    <FormField label={{ text: 'How would you prefer to be contacted?' }}>
      <RadioGroup {...arguments_}>
        <Radio
          name="contact"
          value={'email'}
          label={'email'}
          conditionalInput={{ id: 'email', placeholder: 'Email address' }}
        />
        <Radio
          name="contact"
          value={'phone'}
          label={'Phone'}
          conditionalInput={{ id: 'phone', placeholder: 'Phone number' }}
        />
      </RadioGroup>
    </FormField>
  ),
};
