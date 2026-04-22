import type { StoryObj } from '@storybook/angular';
import Button from '../atoms/Button';
import {
  buttonMeta,
  Default as buttonDefault,
  AllVariants as buttonAllVariants,
  AllAppearances as buttonAllAppearances,
  AllSizes as buttonAllSizes,
  InteractionStates as buttonInteractionStates,
  Disabled as buttonDisabled,
} from '../atoms/storybook/Button.meta';

const meta = {
  ...buttonMeta,
  title: 'Components/Button',
};

export default meta;

export const Default: StoryObj = {
  ...buttonDefault,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [Button],
    },
    template: `
      <div class="gi-p-4 gi-w-fit" [class.gi-bg-black]="appearance === 'light'">
        <gi-button [id]="id" [dataTestId]="dataTestId" [variant]="variant" [appearance]="appearance" [size]="size" [disabled]="disabled">Button</gi-button>
      </div>
    `,
  }),
};

export const AllVariants: StoryObj = {
  ...buttonAllVariants,
  render: () => ({
    moduleMetadata: {
      imports: [Button],
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

export const AllAppearances: StoryObj = {
  ...buttonAllAppearances,
  render: () => ({
    moduleMetadata: {
      imports: [Button],
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

export const AllSizes: StoryObj = {
  ...buttonAllSizes,
  render: () => ({
    moduleMetadata: {
      imports: [Button],
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

export const Disabled: StoryObj = {
  ...buttonDisabled,
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [Button] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-primary-default'" variant="primary" appearance="default" [disabled]="true" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)">primary default</gi-button>
          <gi-button variant="primary" appearance="default" [disabled]="true" [className]="'pseudo-hover'">primary default hover</gi-button>
          <gi-button variant="primary" appearance="default" [disabled]="true" [className]="'pseudo-focus'">primary default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-primary-light'" variant="primary" appearance="light" [disabled]="true" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)">primary light</gi-button>
          <gi-button variant="primary" appearance="light" [disabled]="true" [className]="'pseudo-hover'">primary light hover</gi-button>
          <gi-button variant="primary" appearance="light" [disabled]="true" [className]="'pseudo-focus'">primary light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-primary-dark'" variant="primary" appearance="dark" [disabled]="true" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)">primary dark</gi-button>
          <gi-button variant="primary" appearance="dark" [disabled]="true" [className]="'pseudo-hover'">primary dark hover</gi-button>
          <gi-button variant="primary" appearance="dark" [disabled]="true" [className]="'pseudo-focus'">primary dark focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-secondary-default'" variant="secondary" appearance="default" [disabled]="true" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)">secondary default</gi-button>
          <gi-button variant="secondary" appearance="default" [disabled]="true" [className]="'pseudo-hover'">secondary default hover</gi-button>
          <gi-button variant="secondary" appearance="default" [disabled]="true" [className]="'pseudo-focus'">secondary default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-secondary-light'" variant="secondary" appearance="light" [disabled]="true" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)">secondary light</gi-button>
          <gi-button variant="secondary" appearance="light" [disabled]="true" [className]="'pseudo-hover'">secondary light hover</gi-button>
          <gi-button variant="secondary" appearance="light" [disabled]="true" [className]="'pseudo-focus'">secondary light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-secondary-dark'" variant="secondary" appearance="dark" [disabled]="true" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)">secondary dark</gi-button>
          <gi-button variant="secondary" appearance="dark" [disabled]="true" [className]="'pseudo-hover'">secondary dark hover</gi-button>
          <gi-button variant="secondary" appearance="dark" [disabled]="true" [className]="'pseudo-focus'">secondary dark focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-flat-default'" variant="flat" appearance="default" [disabled]="true" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)">flat default</gi-button>
          <gi-button variant="flat" appearance="default" [disabled]="true" [className]="'pseudo-hover'">flat default hover</gi-button>
          <gi-button variant="flat" appearance="default" [disabled]="true" [className]="'pseudo-focus'">flat default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-flat-light'" variant="flat" appearance="light" [disabled]="true" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)">flat light</gi-button>
          <gi-button variant="flat" appearance="light" [disabled]="true" [className]="'pseudo-hover'">flat light hover</gi-button>
          <gi-button variant="flat" appearance="light" [disabled]="true" [className]="'pseudo-focus'">flat light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button [dataTestId]="'button-disabled-flat-dark'" variant="flat" appearance="dark" [disabled]="true" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)">flat dark</gi-button>
          <gi-button variant="flat" appearance="dark" [disabled]="true" [className]="'pseudo-hover'">flat dark hover</gi-button>
          <gi-button variant="flat" appearance="dark" [disabled]="true" [className]="'pseudo-focus'">flat dark focus</gi-button>
        </div>
      </div>
    `,
  }),
};

export const InteractionStates: StoryObj = {
  ...buttonInteractionStates,
  render: () => ({
    moduleMetadata: { imports: [Button] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="primary" appearance="default" [className]="'pseudo-hover'">primary default hover</gi-button>
          <gi-button variant="primary" appearance="default" [className]="'pseudo-focus'">primary default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button variant="primary" appearance="light" [className]="'pseudo-hover'">primary light hover</gi-button>
          <gi-button variant="primary" appearance="light" [className]="'pseudo-focus'">primary light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="primary" appearance="dark" [className]="'pseudo-hover'">primary dark hover</gi-button>
          <gi-button variant="primary" appearance="dark" [className]="'pseudo-focus'">primary dark focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="secondary" appearance="default" [className]="'pseudo-hover'">secondary default hover</gi-button>
          <gi-button variant="secondary" appearance="default" [className]="'pseudo-focus'">secondary default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button variant="secondary" appearance="light" [className]="'pseudo-hover'">secondary light hover</gi-button>
          <gi-button variant="secondary" appearance="light" [className]="'pseudo-focus'">secondary light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="secondary" appearance="dark" [className]="'pseudo-hover'">secondary dark hover</gi-button>
          <gi-button variant="secondary" appearance="dark" [className]="'pseudo-focus'">secondary dark focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="flat" appearance="default" [className]="'pseudo-hover'">flat default hover</gi-button>
          <gi-button variant="flat" appearance="default" [className]="'pseudo-focus'">flat default focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-button variant="flat" appearance="light" [className]="'pseudo-hover'">flat light hover</gi-button>
          <gi-button variant="flat" appearance="light" [className]="'pseudo-focus'">flat light focus</gi-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-button variant="flat" appearance="dark" [className]="'pseudo-hover'">flat dark hover</gi-button>
          <gi-button variant="flat" appearance="dark" [className]="'pseudo-focus'">flat dark focus</gi-button>
        </div>
      </div>
    `,
  }),
};
