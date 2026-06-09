import type { StoryObj } from '@storybook/angular';
import LinkButton from '../atoms/LinkButton';
import Box from '../atoms/Box';
import {
  linkButtonMeta,
  Default as defaultStory,
  AllVariants as allVariants,
  AllAppearances as allAppearances,
  AllSizes as allSizes,
  InteractionStates as interactionStates,
  Disabled as disabledStory,
} from '../atoms/storybook/LinkButton.meta';

const meta = {
  ...linkButtonMeta,
  title: 'Components/LinkButton',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [LinkButton, Box],
    },
    template: `
      <gi-box [className]="appearance === 'light' ? 'gi-p-4 gi-bg-black gi-w-fit' : 'gi-p-4 gi-w-fit'">
        <gi-link-button [id]="id" [dataTestId]="dataTestId" [href]="href" [variant]="variant" [appearance]="appearance" [size]="size" [disabled]="disabled">LinkButton</gi-link-button>
      </gi-box>
    `,
  }),
};

export const AllVariants: StoryObj = {
  ...allVariants,
  render: () => ({
    moduleMetadata: {
      imports: [LinkButton, Box],
    },
    template: `
      <gi-box className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
        <gi-link-button href="https://www.gov.ie" dataTestId="link-button-variant-primary" variant="primary">primary LinkButton</gi-link-button>
        <gi-link-button href="https://www.gov.ie" dataTestId="link-button-variant-secondary" variant="secondary">secondary LinkButton</gi-link-button>
        <gi-link-button href="https://www.gov.ie" dataTestId="link-button-variant-flat" variant="flat">flat LinkButton</gi-link-button>
      </gi-box>
    `,
  }),
};

export const AllAppearances: StoryObj = {
  ...allAppearances,
  render: () => ({
    moduleMetadata: {
      imports: [LinkButton, Box],
    },
    template: `
      <gi-box className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
          <gi-link-button href="https://www.gov.ie" dataTestId="link-button-appearance-default" appearance="default">default LinkButton</gi-link-button>
          <gi-link-button href="https://www.gov.ie" dataTestId="link-button-appearance-dark" appearance="dark">dark LinkButton</gi-link-button>
        <gi-box className="gi-p-4 gi-bg-black gi-w-fit">
          <gi-link-button href="https://www.gov.ie" dataTestId="link-button-appearance-light" appearance="light">light LinkButton</gi-link-button>
        </gi-box>
      </gi-box>
    `,
  }),
};

export const AllSizes: StoryObj = {
  ...allSizes,
  render: () => ({
    moduleMetadata: {
      imports: [LinkButton, Box],
    },
    template: `
      <gi-box className="gi-flex gi-flex-col gi-gap-2 gi-items-start">
        <gi-link-button href="https://www.gov.ie" dataTestId="link-button-size-sm" size="sm">sm LinkButton</gi-link-button>
        <gi-link-button href="https://www.gov.ie" dataTestId="link-button-size-md" size="md">md LinkButton</gi-link-button>
        <gi-link-button href="https://www.gov.ie" dataTestId="link-button-size-lg" size="lg">lg LinkButton</gi-link-button>
      </gi-box>
    `,
  }),
};

export const InteractionStates: StoryObj = {
  ...interactionStates,
  render: () => ({
    moduleMetadata: { imports: [LinkButton, Box] },
    template: `
      <gi-box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="default" [className]="'pseudo-hover'">primary default hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="default" [className]="'pseudo-focus'">primary default focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="light" [className]="'pseudo-hover'">primary light hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="light" [className]="'pseudo-focus'">primary light focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="dark" [className]="'pseudo-hover'">primary dark hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="dark" [className]="'pseudo-focus'">primary dark focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="default" [className]="'pseudo-hover'">secondary default hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="default" [className]="'pseudo-focus'">secondary default focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="light" [className]="'pseudo-hover'">secondary light hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="light" [className]="'pseudo-focus'">secondary light focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="dark" [className]="'pseudo-hover'">secondary dark hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="dark" [className]="'pseudo-focus'">secondary dark focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="default" [className]="'pseudo-hover'">flat default hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="default" [className]="'pseudo-focus'">flat default focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="light" [className]="'pseudo-hover'">flat light hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="light" [className]="'pseudo-focus'">flat light focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="dark" [className]="'pseudo-hover'">flat dark hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="dark" [className]="'pseudo-focus'">flat dark focus</gi-link-button>
        </gi-box>
      </gi-box>
    `,
  }),
};

export const Disabled: StoryObj = {
  ...disabledStory,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [LinkButton, Box] },
    template: `
      <gi-box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="default" [disabled]="true" dataTestId="link-button-disabled-primary-default" (onClick)="onClick && onClick($event)">primary default</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="default" [disabled]="true" [className]="'pseudo-hover'">primary default hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="default" [disabled]="true" [className]="'pseudo-focus'">primary default focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="light" [disabled]="true" dataTestId="link-button-disabled-primary-light" (onClick)="onClick && onClick($event)">primary light</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="light" [disabled]="true" [className]="'pseudo-hover'">primary light hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="light" [disabled]="true" [className]="'pseudo-focus'">primary light focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="dark" [disabled]="true" dataTestId="link-button-disabled-primary-dark" (onClick)="onClick && onClick($event)">primary dark</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="dark" [disabled]="true" [className]="'pseudo-hover'">primary dark hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="primary" appearance="dark" [disabled]="true" [className]="'pseudo-focus'">primary dark focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="default" [disabled]="true" dataTestId="link-button-disabled-secondary-default" (onClick)="onClick && onClick($event)">secondary default</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="default" [disabled]="true" [className]="'pseudo-hover'">secondary default hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="default" [disabled]="true" [className]="'pseudo-focus'">secondary default focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="light" [disabled]="true" dataTestId="link-button-disabled-secondary-light" (onClick)="onClick && onClick($event)">secondary light</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="light" [disabled]="true" [className]="'pseudo-hover'">secondary light hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="light" [disabled]="true" [className]="'pseudo-focus'">secondary light focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="dark" [disabled]="true" dataTestId="link-button-disabled-secondary-dark" (onClick)="onClick && onClick($event)">secondary dark</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="dark" [disabled]="true" [className]="'pseudo-hover'">secondary dark hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="secondary" appearance="dark" [disabled]="true" [className]="'pseudo-focus'">secondary dark focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="default" [disabled]="true" dataTestId="link-button-disabled-flat-default" (onClick)="onClick && onClick($event)">flat default</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="default" [disabled]="true" [className]="'pseudo-hover'">flat default hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="default" [disabled]="true" [className]="'pseudo-focus'">flat default focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="light" [disabled]="true" dataTestId="link-button-disabled-flat-light" (onClick)="onClick && onClick($event)">flat light</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="light" [disabled]="true" [className]="'pseudo-hover'">flat light hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="light" [disabled]="true" [className]="'pseudo-focus'">flat light focus</gi-link-button>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="dark" [disabled]="true" dataTestId="link-button-disabled-flat-dark" (onClick)="onClick && onClick($event)">flat dark</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="dark" [disabled]="true" [className]="'pseudo-hover'">flat dark hover</gi-link-button>
          <gi-link-button href="https://www.gov.ie" variant="flat" appearance="dark" [disabled]="true" [className]="'pseudo-focus'">flat dark focus</gi-link-button>
        </gi-box>
      </gi-box>
    `,
  }),
};
