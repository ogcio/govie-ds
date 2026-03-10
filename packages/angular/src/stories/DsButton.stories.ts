import type { Meta, StoryObj } from '@storybook/angular';
import { within, expect } from 'storybook/test';
import DsButton from '../atoms/DsButton';
import {
  meta as dsButtonMeta,
  stories as dsButtonStories,
} from '../atoms/DsButton.meta';

const meta = {
  ...dsButtonMeta,
  title: 'Form/DsButton',
  component: DsButton,
} satisfies Meta<DsButton>;

export default meta;

type Story = StoryObj<DsButton>;

export const Default: Story = {
  args: dsButtonStories.default.args,
  render: (args) => ({
    props: args,
    template: `
      <ds-button
        [variant]="variant"
        [appearance]="appearance"
        [size]="size"
        [disabled]="disabled"
      >
        Click me
      </ds-button>
    `,
  }),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('renders button content', async () => {
      const element = canvas.getByRole('button', { name: 'Click me' });
      expect(element).toBeInTheDocument();
    });

    await step('renders enabled by default', async () => {
      const element = canvas.getByRole('button', { name: 'Click me' });
      expect(element).toBeEnabled();
    });
  },
};

export const Secondary: Story = {
  args: dsButtonStories.secondary.args,
  render: (args) => ({
    props: args,
    template: `
      <ds-button
        [variant]="variant"
        [appearance]="appearance"
        [size]="size"
        [disabled]="disabled"
      >
        Click me
      </ds-button>
    `,
  }),
};

export const Flat: Story = {
  args: dsButtonStories.flat.args,
  render: (args) => ({
    props: args,
    template: `
      <ds-button
        [variant]="variant"
        [appearance]="appearance"
        [size]="size"
        [disabled]="disabled"
      >
        Click me
      </ds-button>
    `,
  }),
};

export const Disabled: Story = {
  args: dsButtonStories.disabled.args,
  render: (args) => ({
    props: args,
    template: `
      <ds-button
        [variant]="variant"
        [appearance]="appearance"
        [size]="size"
        [disabled]="disabled"
      >
       Click me
      </ds-button>
    `,
  }),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    await step('renders disabled button', async () => {
      const element = canvas.getByRole('button', { name: 'Click me' });
      expect(element).toBeDisabled();
    });
  },
};
