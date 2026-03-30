import type { Meta, StoryObj } from '@storybook/angular';
import Button from '../atoms/Button';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: Button,
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
  },
};

export default meta;

type Story = StoryObj<Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<gi-button [variant]="variant" [appearance]="appearance" [size]="size" [disabled]="disabled">Click me</gi-button>`,
  }),
};

export const Secondary: Story = {
  render: () => ({
    template: `<gi-button variant="secondary" appearance="default" size="medium">Click me</gi-button>`,
  }),
};

export const Flat: Story = {
  render: () => ({
    template: `<gi-button variant="flat" appearance="default" size="medium">Click me</gi-button>`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `<gi-button variant="primary" appearance="default" size="medium" [disabled]="true">Click me</gi-button>`,
  }),
};
