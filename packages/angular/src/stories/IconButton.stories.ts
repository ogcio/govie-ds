import type { Meta, StoryObj } from '@storybook/angular';
import IconButton, { IconButtonSize as Size } from '../atoms/IconButton';
import Info from '../atoms/icons/Info';
import {
  iconButtonMeta,
  Default as defaultStory,
  InteractionStates as interactionStates,
  Disabled as disabledStory,
  AllVariants as allVariants,
  AllAppearances as allAppearances,
  AllSizes as allSizes,
} from '../atoms/storybook/IconButton.meta';

const iconSize: Record<string, number> = {
  [Size.SM]: 16,
  [Size.MD]: 24,
  [Size.LG]: 24,
  [Size.XL]: 32,
};

const meta: Meta<IconButton> = {
  ...iconButtonMeta,
  title: 'Components/IconButton',
  component: IconButton,
  decorators: [
    (story, context) => {
      const isLight = context?.args?.['appearance'] === 'light' ? 'gi-bg-black' : '';
      return {
        ...story(),
        template: `<div class="gi-p-4 gi-w-fit ${isLight}">${story().template}</div>`,
      };
    },
  ],
};

export default meta;

type Story = StoryObj<IconButton>;

export const Default: Story = {
  ...defaultStory,
  args: {
    ...iconButtonMeta.args,
  },
  render: (props) => ({
    props: { ...props, iconSize: iconSize[props.size ?? Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `<gi-icon-button [id]="id" [dataTestId]="dataTestId" [variant]="variant" [appearance]="appearance" [size]="size" [ariaLabel]="ariaLabel"><info [size]="iconSize"></info></gi-icon-button>`,
  }),
};

export const AllVariants: Story = {
  ...allVariants,
  render: () => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-gap-4">
        <gi-icon-button variant="primary" ariaLabel="primary" dataTestId="icon-button-variant-primary"><info [size]="iconSize"></info></gi-icon-button>
        <gi-icon-button variant="secondary" ariaLabel="secondary" dataTestId="icon-button-variant-secondary"><info [size]="iconSize"></info></gi-icon-button>
        <gi-icon-button variant="flat" ariaLabel="flat" dataTestId="icon-button-variant-flat"><info [size]="iconSize"></info></gi-icon-button>
      </div>
    `,
  }),
};

export const AllAppearances: Story = {
  ...allAppearances,
  render: () => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-gap-4">
        <div class="gi-p-2">
          <gi-icon-button appearance="default" ariaLabel="default" dataTestId="icon-button-appearance-default"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-bg-black gi-p-2">
          <gi-icon-button appearance="light" ariaLabel="light" dataTestId="icon-button-appearance-light"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-p-2">
          <gi-icon-button appearance="dark" ariaLabel="dark" dataTestId="icon-button-appearance-dark"><info [size]="iconSize"></info></gi-icon-button>
        </div>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  ...allSizes,
  render: () => ({
    props: { iconSize },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-items-center gi-gap-4">
        <gi-icon-button size="sm" ariaLabel="sm" dataTestId="icon-button-size-sm"><info [size]="iconSize['sm']"></info></gi-icon-button>
        <gi-icon-button size="md" ariaLabel="md" dataTestId="icon-button-size-md"><info [size]="iconSize['md']"></info></gi-icon-button>
        <gi-icon-button size="lg" ariaLabel="lg" dataTestId="icon-button-size-lg"><info [size]="iconSize['lg']"></info></gi-icon-button>
        <gi-icon-button size="xl" ariaLabel="xl" dataTestId="icon-button-size-xl"><info [size]="iconSize['xl']"></info></gi-icon-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  ...disabledStory,
  render: (args) => ({
    props: { ...args, iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="default" [disabled]="true" ariaLabel="primary default disabled" dataTestId="icon-button-disabled-primary-default" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" [disabled]="true" ariaLabel="primary default disabled hover" [className]="'pseudo-hover'"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" [disabled]="true" ariaLabel="primary default disabled focus" [className]="'pseudo-focus'"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="light" [disabled]="true" ariaLabel="primary light disabled" dataTestId="icon-button-disabled-primary-light" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" [disabled]="true" ariaLabel="primary light disabled hover" [className]="'pseudo-hover'"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" [disabled]="true" ariaLabel="primary light disabled focus" [className]="'pseudo-focus'"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="dark" [disabled]="true" ariaLabel="primary dark disabled" dataTestId="icon-button-disabled-primary-dark" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" [disabled]="true" ariaLabel="primary dark disabled hover" [className]="'pseudo-hover'"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" [disabled]="true" ariaLabel="primary dark disabled focus" [className]="'pseudo-focus'"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="default" [disabled]="true" ariaLabel="secondary default disabled" dataTestId="icon-button-disabled-secondary-default" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" [disabled]="true" ariaLabel="secondary default disabled hover" [className]="'pseudo-hover'"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" [disabled]="true" ariaLabel="secondary default disabled focus" [className]="'pseudo-focus'"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="light" [disabled]="true" ariaLabel="secondary light disabled" dataTestId="icon-button-disabled-secondary-light" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" [disabled]="true" ariaLabel="secondary light disabled hover" [className]="'pseudo-hover'"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" [disabled]="true" ariaLabel="secondary light disabled focus" [className]="'pseudo-focus'"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="dark" [disabled]="true" ariaLabel="secondary dark disabled" dataTestId="icon-button-disabled-secondary-dark" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" [disabled]="true" ariaLabel="secondary dark disabled hover" [className]="'pseudo-hover'"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" [disabled]="true" ariaLabel="secondary dark disabled focus" [className]="'pseudo-focus'"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="default" [disabled]="true" ariaLabel="flat default disabled" dataTestId="icon-button-disabled-flat-default" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" [disabled]="true" ariaLabel="flat default disabled hover" [className]="'pseudo-hover'"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" [disabled]="true" ariaLabel="flat default disabled focus" [className]="'pseudo-focus'"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="light" [disabled]="true" ariaLabel="flat light disabled" dataTestId="icon-button-disabled-flat-light" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" [disabled]="true" ariaLabel="flat light disabled hover" [className]="'pseudo-hover'"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" [disabled]="true" ariaLabel="flat light disabled focus" [className]="'pseudo-focus'"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="dark" [disabled]="true" ariaLabel="flat dark disabled" dataTestId="icon-button-disabled-flat-dark" (onClick)="onClick && onClick($event)" (onFocus)="onFocus && onFocus($event)"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" [disabled]="true" ariaLabel="flat dark disabled hover" [className]="'pseudo-hover'"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" [disabled]="true" ariaLabel="flat dark disabled focus" [className]="'pseudo-focus'"><info [size]="iconSize"></info></gi-icon-button>
        </div>
      </div>
    `,
  }),
};

export const InteractionStates: Story = {
  ...interactionStates,
  render: () => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2 gi-items-start">
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="default" ariaLabel="primary default"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" ariaLabel="primary default hover" className="pseudo-hover"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" ariaLabel="primary default focus" className="pseudo-focus"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black">
          <gi-icon-button variant="primary" appearance="light" ariaLabel="primary light"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" ariaLabel="primary light hover" className="pseudo-hover"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" ariaLabel="primary light focus" className="pseudo-focus"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="dark" ariaLabel="primary dark"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" ariaLabel="primary dark hover" className="pseudo-hover"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" ariaLabel="primary dark focus" className="pseudo-focus"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="default" ariaLabel="secondary default"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" ariaLabel="secondary default hover" className="pseudo-hover"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" ariaLabel="secondary default focus" className="pseudo-focus"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black">
          <gi-icon-button variant="secondary" appearance="light" ariaLabel="secondary light"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" ariaLabel="secondary light hover" className="pseudo-hover"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" ariaLabel="secondary light focus" className="pseudo-focus"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="dark" ariaLabel="secondary dark"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" ariaLabel="secondary dark hover" className="pseudo-hover"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" ariaLabel="secondary dark focus" className="pseudo-focus"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="default" ariaLabel="flat default"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" ariaLabel="flat default hover" className="pseudo-hover"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" ariaLabel="flat default focus" className="pseudo-focus"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black">
          <gi-icon-button variant="flat" appearance="light" ariaLabel="flat light"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" ariaLabel="flat light hover" className="pseudo-hover"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" ariaLabel="flat light focus" className="pseudo-focus"><info [size]="iconSize"></info></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="dark" ariaLabel="flat dark"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" ariaLabel="flat dark hover" className="pseudo-hover"><info [size]="iconSize"></info></gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" ariaLabel="flat dark focus" className="pseudo-focus"><info [size]="iconSize"></info></gi-icon-button>
        </div>
      </div>
    `,
  }),
};
