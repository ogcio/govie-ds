import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react/jsx-runtime';
import { Icon } from '../icon/icon.js';
import { Button } from './button.js';
import { ButtonAppearance, ButtonVariant, ButtonSize } from './types.js';

const meta = {
  title: 'Form/Button',
  decorators: (Story, context) => {
    const isLight = context?.args?.appearance === 'light' && 'gi-bg-black';
    return (
      <div className={`gi-p-4 ${isLight}`}>
        <Story />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        component: 'use this button where it is appropiate',
      },
    },
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string' },
      description: 'the React Node that the button will accept',
    },
    variant: {
      control: 'radio',
      options: Object.values(ButtonVariant),
      description: 'The variants of the button',
    },
    appearance: {
      control: 'radio',
      options: Object.values(ButtonAppearance),
      description: 'The description of the button',
      type: 'string',
    },
    size: {
      control: 'radio',
      options: Object.values(ButtonSize),
      type: { name: 'string' },
      description: 'The sizes of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Specify if the button is disabled',
      type: 'boolean',
    },
  },
  args: {
    children: 'Button',
    variant: ButtonVariant.Primary,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <Fragment>
        <Icon icon="thumb_up" />
        Button
      </Fragment>
    ),
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <Fragment>
        Button
        <Icon icon="thumb_up" />
      </Fragment>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};
