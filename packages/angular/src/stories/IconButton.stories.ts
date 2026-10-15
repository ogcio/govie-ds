import omit from 'lodash/omit';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiIconButton, GiIconButtonDirective } from '@/IconButton';
import { Size } from '@/atoms/constants';
import Info from '@/atoms/icons/Info';
import * as stories from '@/atoms/storybook/IconButton.meta';

const iconSize: Record<string, number> = {
  [Size.SM]: 16,
  [Size.MD]: 24,
  [Size.LG]: 24,
  [Size.XL]: 32,
};

const meta: Meta<GiIconButton> = {
  ...stories.iconButtonMeta,
  title: 'Components/IconButton',
  component: GiIconButton,
  argTypes: omit(stories.iconButtonMeta.argTypes, ['className']),
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

type Story = StoryObj<GiIconButton>;

export const Default: Story = {
  ...stories.Default,
  args: {
    ...stories.iconButtonMeta.args,
  },
  render: (props) => ({
    props: { ...props, iconSize: iconSize[props.size ?? Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `<gi-icon-button [id]="id" [dataTestId]="dataTestId" [variant]="variant" [appearance]="appearance" [size]="size" [ariaLabel]="ariaLabel"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>`,
  }),
};

export const AllVariants: Story = {
  ...stories.AllVariants,
  render: () => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-gap-4">
        <gi-icon-button variant="primary" ariaLabel="primary" dataTestId="icon-button-variant-primary"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        <gi-icon-button variant="secondary" ariaLabel="secondary" dataTestId="icon-button-variant-secondary"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        <gi-icon-button variant="flat" ariaLabel="flat" dataTestId="icon-button-variant-flat"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
      </div>
    `,
  }),
};

export const AllAppearances: Story = {
  ...stories.AllAppearances,
  render: () => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-gap-4">
        <div class="gi-p-2">
          <gi-icon-button appearance="default" ariaLabel="default" dataTestId="icon-button-appearance-default"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-bg-black gi-p-2">
          <gi-icon-button appearance="light" ariaLabel="light" dataTestId="icon-button-appearance-light"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-p-2">
          <gi-icon-button appearance="dark" ariaLabel="dark" dataTestId="icon-button-appearance-dark"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  ...stories.AllSizes,
  render: () => ({
    props: { iconSize },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-items-center gi-gap-4">
        <gi-icon-button size="sm" ariaLabel="sm" dataTestId="icon-button-size-sm"><gi-info-icon [size]="iconSize['sm']"></gi-info-icon></gi-icon-button>
        <gi-icon-button size="md" ariaLabel="md" dataTestId="icon-button-size-md"><gi-info-icon [size]="iconSize['md']"></gi-info-icon></gi-icon-button>
        <gi-icon-button size="lg" ariaLabel="lg" dataTestId="icon-button-size-lg"><gi-info-icon [size]="iconSize['lg']"></gi-info-icon></gi-icon-button>
        <gi-icon-button size="xl" ariaLabel="xl" dataTestId="icon-button-size-xl"><gi-info-icon [size]="iconSize['xl']"></gi-info-icon></gi-icon-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  ...stories.Disabled,
  render: (props) => ({
    props: { ...props, iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="default" [disabled]="true" ariaLabel="primary default disabled" dataTestId="icon-button-disabled-primary-default"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" [disabled]="true" ariaLabel="primary default disabled hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" [disabled]="true" ariaLabel="primary default disabled focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="light" [disabled]="true" ariaLabel="primary light disabled" dataTestId="icon-button-disabled-primary-light"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" [disabled]="true" ariaLabel="primary light disabled hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" [disabled]="true" ariaLabel="primary light disabled focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="dark" [disabled]="true" ariaLabel="primary dark disabled" dataTestId="icon-button-disabled-primary-dark"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" [disabled]="true" ariaLabel="primary dark disabled hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" [disabled]="true" ariaLabel="primary dark disabled focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="default" [disabled]="true" ariaLabel="secondary default disabled" dataTestId="icon-button-disabled-secondary-default"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" [disabled]="true" ariaLabel="secondary default disabled hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" [disabled]="true" ariaLabel="secondary default disabled focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="light" [disabled]="true" ariaLabel="secondary light disabled" dataTestId="icon-button-disabled-secondary-light"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" [disabled]="true" ariaLabel="secondary light disabled hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" [disabled]="true" ariaLabel="secondary light disabled focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="dark" [disabled]="true" ariaLabel="secondary dark disabled" dataTestId="icon-button-disabled-secondary-dark"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" [disabled]="true" ariaLabel="secondary dark disabled hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" [disabled]="true" ariaLabel="secondary dark disabled focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="default" [disabled]="true" ariaLabel="flat default disabled" dataTestId="icon-button-disabled-flat-default"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" [disabled]="true" ariaLabel="flat default disabled hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" [disabled]="true" ariaLabel="flat default disabled focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 gi-p-4 gi-bg-black sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="light" [disabled]="true" ariaLabel="flat light disabled" dataTestId="icon-button-disabled-flat-light"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" [disabled]="true" ariaLabel="flat light disabled hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" [disabled]="true" ariaLabel="flat light disabled focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="dark" [disabled]="true" ariaLabel="flat dark disabled" dataTestId="icon-button-disabled-flat-dark"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" [disabled]="true" ariaLabel="flat dark disabled hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" [disabled]="true" ariaLabel="flat dark disabled focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
      </div>
    `,
  }),
};

export const InteractionStates: Story = {
  ...stories.InteractionStates,
  render: () => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2 gi-items-start">
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="default" ariaLabel="primary default"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" ariaLabel="primary default hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" ariaLabel="primary default focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black">
          <gi-icon-button variant="primary" appearance="light" ariaLabel="primary light"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" ariaLabel="primary light hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" ariaLabel="primary light focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="primary" appearance="dark" ariaLabel="primary dark"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" ariaLabel="primary dark hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" ariaLabel="primary dark focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="default" ariaLabel="secondary default"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" ariaLabel="secondary default hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" ariaLabel="secondary default focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black">
          <gi-icon-button variant="secondary" appearance="light" ariaLabel="secondary light"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" ariaLabel="secondary light hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" ariaLabel="secondary light focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="secondary" appearance="dark" ariaLabel="secondary dark"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" ariaLabel="secondary dark hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" ariaLabel="secondary dark focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="default" ariaLabel="flat default"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" ariaLabel="flat default hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" ariaLabel="flat default focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black">
          <gi-icon-button variant="flat" appearance="light" ariaLabel="flat light"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" ariaLabel="flat light hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" ariaLabel="flat light focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-icon-button variant="flat" appearance="dark" ariaLabel="flat dark"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" ariaLabel="flat dark hover" class="pseudo-hover"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" ariaLabel="flat dark focus" class="pseudo-focus"><gi-info-icon [size]="iconSize"></gi-info-icon></gi-icon-button>
        </div>
      </div>
    `,
  }),
};

export const Directive: StoryObj<GiIconButtonDirective> = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Adds the `gi-icon-button` styling to a plain `button`, with the same variants, appearances, sizes and disabled state.',
      },
    },
  },
  render: () => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info, GiIconButtonDirective] },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <div class="gi-flex gi-gap-4 gi-items-center">
          <button giIconButton type="button" aria-label="Primary"><gi-info-icon [size]="iconSize" /></button>
          <button giIconButton variant="secondary" type="button" aria-label="Secondary"><gi-info-icon [size]="iconSize" /></button>
          <button giIconButton variant="flat" type="button" aria-label="Flat"><gi-info-icon [size]="iconSize" /></button>
        </div>
        <div class="gi-flex gi-gap-4 gi-items-center">
          <button giIconButton disabled type="button" aria-label="Disabled"><gi-info-icon [size]="iconSize" /></button>
          <button giIconButton variant="secondary" [disabled]="true" type="button" aria-label="Disabled secondary"><gi-info-icon [size]="iconSize" /></button>
        </div>
      </div>
    `,
  }),
};
