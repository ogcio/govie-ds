import omit from 'lodash/omit';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiButton, GiButtonDirective } from '@/Button';
import * as stories from '../atoms/storybook/Button.meta';

const meta: Meta<GiButton> = {
  ...stories.buttonMeta,
  title: 'Components/Button',
  component: GiButton,
  argTypes: omit(stories.buttonMeta.argTypes, ['className']),
};

export default meta;

type Story = StoryObj<GiButton>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiButton],
    },
    template: `
      <div class="gi-p-4 gi-w-fit" [class.gi-bg-black]="appearance === 'light'">
        <gi-button [id]="id" [dataTestId]="dataTestId" [variant]="variant" [appearance]="appearance" [size]="size" [disabled]="disabled">Button</gi-button>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  ...stories.AllVariants,
  render: () => ({
    moduleMetadata: {
      imports: [GiButton],
    },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2 gi-items-start">
        <gi-button [dataTestId]="'button-variant-primary'" variant="primary">primary Button</gi-button>
        <gi-button [dataTestId]="'button-variant-secondary'" variant="secondary">secondary Button</gi-button>
        <gi-button [dataTestId]="'button-variant-flat'" variant="flat">flat Button</gi-button>
      </div>
    `,
  }),
};

export const AllAppearances: Story = {
  ...stories.AllAppearances,
  render: () => ({
    moduleMetadata: {
      imports: [GiButton],
    },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2 gi-items-start">
          <gi-button [dataTestId]="'button-appearance-default'" appearance="default">default Button</gi-button>
          <gi-button [dataTestId]="'button-appearance-dark'" appearance="dark">dark Button</gi-button>
        <div class="gi-p-4 gi-bg-black gi-w-fit">
          <gi-button [dataTestId]="'button-appearance-light'" appearance="light">light Button</gi-button>
        </div>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  ...stories.AllSizes,
  render: () => ({
    moduleMetadata: {
      imports: [GiButton],
    },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2 gi-items-start">
        <gi-button [dataTestId]="'button-size-sm'" size="sm">sm Button</gi-button>
        <gi-button [dataTestId]="'button-size-md'" size="md">md Button</gi-button>
        <gi-button [dataTestId]="'button-size-lg'" size="lg">lg Button</gi-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  ...stories.Disabled,
  render: () => ({
    moduleMetadata: { imports: [GiButton] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-primary-default'" variant="primary" appearance="default" [disabled]="true">primary default</gi-button>
          <gi-button variant="primary" appearance="default" [disabled]="true" class="pseudo-hover">primary default hover</gi-button>
          <gi-button variant="primary" appearance="default" [disabled]="true" class="pseudo-focus">primary default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-primary-light'" variant="primary" appearance="light" [disabled]="true">primary light</gi-button>
          <gi-button variant="primary" appearance="light" [disabled]="true" class="pseudo-hover">primary light hover</gi-button>
          <gi-button variant="primary" appearance="light" [disabled]="true" class="pseudo-focus">primary light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-primary-dark'" variant="primary" appearance="dark" [disabled]="true">primary dark</gi-button>
          <gi-button variant="primary" appearance="dark" [disabled]="true" class="pseudo-hover">primary dark hover</gi-button>
          <gi-button variant="primary" appearance="dark" [disabled]="true" class="pseudo-focus">primary dark focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-secondary-default'" variant="secondary" appearance="default" [disabled]="true">secondary default</gi-button>
          <gi-button variant="secondary" appearance="default" [disabled]="true" class="pseudo-hover">secondary default hover</gi-button>
          <gi-button variant="secondary" appearance="default" [disabled]="true" class="pseudo-focus">secondary default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-secondary-light'" variant="secondary" appearance="light" [disabled]="true">secondary light</gi-button>
          <gi-button variant="secondary" appearance="light" [disabled]="true" class="pseudo-hover">secondary light hover</gi-button>
          <gi-button variant="secondary" appearance="light" [disabled]="true" class="pseudo-focus">secondary light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-secondary-dark'" variant="secondary" appearance="dark" [disabled]="true">secondary dark</gi-button>
          <gi-button variant="secondary" appearance="dark" [disabled]="true" class="pseudo-hover">secondary dark hover</gi-button>
          <gi-button variant="secondary" appearance="dark" [disabled]="true" class="pseudo-focus">secondary dark focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-flat-default'" variant="flat" appearance="default" [disabled]="true">flat default</gi-button>
          <gi-button variant="flat" appearance="default" [disabled]="true" class="pseudo-hover">flat default hover</gi-button>
          <gi-button variant="flat" appearance="default" [disabled]="true" class="pseudo-focus">flat default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-flat-light'" variant="flat" appearance="light" [disabled]="true">flat light</gi-button>
          <gi-button variant="flat" appearance="light" [disabled]="true" class="pseudo-hover">flat light hover</gi-button>
          <gi-button variant="flat" appearance="light" [disabled]="true" class="pseudo-focus">flat light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-flat-dark'" variant="flat" appearance="dark" [disabled]="true">flat dark</gi-button>
          <gi-button variant="flat" appearance="dark" [disabled]="true" class="pseudo-hover">flat dark hover</gi-button>
          <gi-button variant="flat" appearance="dark" [disabled]="true" class="pseudo-focus">flat dark focus</gi-button>
        </div>
      </div>
    `,
  }),
};

export const InteractionStates: Story = {
  ...stories.InteractionStates,
  render: () => ({
    moduleMetadata: { imports: [GiButton] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="primary" appearance="default" class="pseudo-hover">primary default hover</gi-button>
          <gi-button variant="primary" appearance="default" class="pseudo-focus">primary default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button variant="primary" appearance="light" class="pseudo-hover">primary light hover</gi-button>
          <gi-button variant="primary" appearance="light" class="pseudo-focus">primary light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="primary" appearance="dark" class="pseudo-hover">primary dark hover</gi-button>
          <gi-button variant="primary" appearance="dark" class="pseudo-focus">primary dark focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="secondary" appearance="default" class="pseudo-hover">secondary default hover</gi-button>
          <gi-button variant="secondary" appearance="default" class="pseudo-focus">secondary default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button variant="secondary" appearance="light" class="pseudo-hover">secondary light hover</gi-button>
          <gi-button variant="secondary" appearance="light" class="pseudo-focus">secondary light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="secondary" appearance="dark" class="pseudo-hover">secondary dark hover</gi-button>
          <gi-button variant="secondary" appearance="dark" class="pseudo-focus">secondary dark focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="flat" appearance="default" class="pseudo-hover">flat default hover</gi-button>
          <gi-button variant="flat" appearance="default" class="pseudo-focus">flat default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button variant="flat" appearance="light" class="pseudo-hover">flat light hover</gi-button>
          <gi-button variant="flat" appearance="light" class="pseudo-focus">flat light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="flat" appearance="dark" class="pseudo-hover">flat dark hover</gi-button>
          <gi-button variant="flat" appearance="dark" class="pseudo-focus">flat dark focus</gi-button>
        </div>
      </div>
    `,
  }),
};

export const Directive: StoryObj<GiButtonDirective> = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Adds the `gi-button` styling to a plain `button`, with the same variants, appearances, sizes and disabled state.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [GiButtonDirective] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <div class="gi-flex gi-gap-4 gi-items-center">
          <button giButton type="button">Primary</button>
          <button giButton variant="secondary" type="button">Secondary</button>
          <button giButton variant="flat" type="button">Flat</button>
        </div>
        <div class="gi-flex gi-gap-4 gi-items-center">
          <button giButton size="sm" type="button">Small</button>
          <button giButton size="md" type="button">Medium</button>
          <button giButton size="lg" type="button">Large</button>
        </div>
        <div class="gi-flex gi-gap-4 gi-items-center">
          <button giButton disabled type="button">Disabled</button>
          <button giButton variant="secondary" [disabled]="true" type="button">Disabled secondary</button>
        </div>
        <div class="gi-bg-black gi-p-4 gi-rounded gi-w-fit gi-flex gi-gap-4 gi-items-center">
          <button giButton appearance="light" type="button">Light Appearance</button>
        </div>
      </div>
    `,
  }),
};
