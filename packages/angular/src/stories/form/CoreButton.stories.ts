import type { Meta, StoryObj } from '@storybook/angular';
import CoreButton from '../../atoms/CoreButton';

const meta: Meta<CoreButton> = {
  title: 'Form/Button',
  component: CoreButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'flat'],
    },
    appearance: {
      control: 'select',
      options: ['default', 'dark', 'light'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' },
  },
};

export default meta;
type Story = StoryObj<CoreButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<core-button [variant]="variant" [appearance]="appearance" [size]="size" [disabled]="disabled">Click me</core-button>`,
  }),
};
export const Secondary: Story = {
  render: () => ({
    template: `<core-button variant="secondary" appearance="default" size="medium">Click me</core-button>`,
  }),
};

export const Flat: Story = {
  render: () => ({
    template: `<core-button variant="flat" appearance="default" size="medium">Click me</core-button>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<core-button variant="primary" appearance="default" size="medium" [disabled]="true">Click me</core-button>`,
  }),
};
