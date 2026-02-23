import type { Meta, StoryObj } from '@storybook/angular';
import DsButton from '../../atoms/DsButton';

const meta: Meta<DsButton> = {
  title: 'Form/Button',
  component: DsButton,
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
type Story = StoryObj<DsButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [appearance]="appearance" [size]="size">Click me</ds-button>`,
  }),
};
export const Secondary: Story = {
  render: () => ({
    template: `<ds-button variant="secondary" appearance="default" size="medium">Click me</ds-button>`,
  }),
};

export const Flat: Story = {
  render: () => ({
    template: `<ds-button variant="flat" appearance="default" size="medium">Click me</ds-button>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<ds-button variant="primary" appearance="default" size="medium" [disabled]="true">Click me</ds-button>`,
  }),
};
