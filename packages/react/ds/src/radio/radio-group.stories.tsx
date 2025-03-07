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
  args: {
    groupId: 'city',
  },
  render: (arguments_) => (
    <FormField label={{ text: 'Where do you live?' }}>
      <RadioGroup {...arguments_}>
        <Radio value={'dublin'} label={'Dublin'} />
        <Radio value={'cork'} label={'Cork'} />
        <Radio value={'galway'} label={'Galway'} />
      </RadioGroup>
    </FormField>
  ),
};

export const inline: Story = {
  args: {
    inline: true,
    groupId: 'city2',
  },
  render: (arguments_) => (
    <FormField label={{ text: 'Where do you live?' }}>
      <RadioGroup {...arguments_} inline>
        <Radio value={'dublin'} label={'Dublin'} />
        <Radio value={'cork'} label={'Cork'} />
        <Radio value={'galway'} label={'Galway'} />
      </RadioGroup>
    </FormField>
  ),
};

export const withTitleHint: Story = {
  args: {
    groupId: 'city3',
  },
  render: (arguments_) => (
    <FormField
      label={{ text: 'Where do you live?' }}
      hint={{ text: 'Select a city' }}
    >
      <RadioGroup {...arguments_}>
        <Radio value={'dublin'} label={'Dublin'} />
        <Radio value={'cork'} label={'Cork'} />
        <Radio value={'galway'} label={'Galway'} />
      </RadioGroup>
    </FormField>
  ),
};

export const withOptionHints: Story = {
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
      <RadioGroup {...arguments_}>
        <Radio
          value={'val1'}
          label={'Sign in with Username and Password'}
          hint="You'll have a user ID if you've registered for Self Assessment or filed a tax return online before"
        />
        <Radio
          value={'val2'}
          label={'Sign in with MyGovID'}
          hint="If you don't have a MyGovID Login, you can create one"
        />
      </RadioGroup>
    </FormField>
  ),
};

export const withDividerOption: Story = {
  args: {
    groupId: 'city5',
  },
  render: (arguments_) => (
    <FormField
      label={{ text: 'Where do you live?' }}
      hint={{ text: 'Select a city' }}
    >
      <RadioGroup {...arguments_}>
        <Radio value={'dublin'} label={'Dublin'} />
        <Radio value={'cork'} label={'Cork'} />
        <Radio value={'galway'} label={'Galway'} />
        <Paragraph>or</Paragraph>
        <Radio value={'none'} label={'Non of above'} />
      </RadioGroup>
    </FormField>
  ),
};

export const withError: Story = {
  args: {
    groupId: 'city6',
  },
  render: (arguments_) => (
    <FormField
      label={{ text: 'Where do you live?' }}
      hint={{ text: 'Select a city' }}
      error={{ text: 'Please select a city' }}
    >
      <RadioGroup {...arguments_}>
        <Radio value={'dublin'} label={'Dublin'} />
        <Radio value={'cork'} label={'Cork'} />
        <Radio value={'galway'} label={'Galway'} />
      </RadioGroup>
    </FormField>
  ),
};

export const withConditionalInput: Story = {
  args: {
    groupId: 'contact',
  },
  render: (arguments_) => (
    <FormField label={{ text: 'How would you prefer to be contacted?' }}>
      <RadioGroup {...arguments_}>
        <Radio
          value={'email'}
          label={'email'}
          conditionalInput={{ id: 'email', placeholder: 'Email address' }}
        />
        <Radio
          value={'phone'}
          label={'Phone'}
          conditionalInput={{ id: 'phone', placeholder: 'Phone number' }}
        />
      </RadioGroup>
    </FormField>
  ),
};
