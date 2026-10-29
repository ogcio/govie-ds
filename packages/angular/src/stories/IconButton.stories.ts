import omit from 'lodash/omit';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiBox } from '@/Box';
import { GiIconButton, GiIconButtonDirective } from '@/IconButton';
import { GiStack, GiStackDirective } from '@/Stack';
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
  ...stories.meta,
  title: 'Components/IconButton',
  component: GiIconButton,
  argTypes: {
    ...omit(stories.meta.argTypes, ['className']),
    class: {
      control: false,
      description: 'Additional CSS classes applied to the button element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description: 'Inline styles applied to the button element.',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;

type Story = StoryObj<GiIconButton>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props: { ...props, iconSize: iconSize[props.size ?? Size.MD] },
    moduleMetadata: { imports: [Info, GiBox] },
    template: `
      <gi-box [class]="appearance === 'light' ? 'gi-p-4 gi-w-fit gi-bg-black' : 'gi-p-4 gi-w-fit'">
        <gi-icon-button [id]="id" [dataTestId]="dataTestId" [variant]="variant" [appearance]="appearance" [size]="size" [disabled]="disabled" [ariaLabel]="ariaLabel">
          <gi-info-icon [size]="iconSize" />
        </gi-icon-button>
      </gi-box>
    `,
  }),
};

export const AllVariants: Story = {
  ...stories.AllVariants,
  render: (_props) => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info, GiStack] },
    template: `
      <gi-stack direction="row" [gap]="4">
        <gi-icon-button variant="primary" ariaLabel="primary" dataTestId="icon-button-variant-primary">
          <gi-info-icon [size]="iconSize" />
        </gi-icon-button>
        <gi-icon-button variant="secondary" ariaLabel="secondary" dataTestId="icon-button-variant-secondary">
          <gi-info-icon [size]="iconSize" />
        </gi-icon-button>
        <gi-icon-button variant="flat" ariaLabel="flat" dataTestId="icon-button-variant-flat">
          <gi-info-icon [size]="iconSize" />
        </gi-icon-button>
      </gi-stack>
    `,
  }),
};

export const AllAppearances: Story = {
  ...stories.AllAppearances,
  render: (_props) => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info, GiBox, GiStack] },
    template: `
      <gi-stack direction="row" [gap]="4">
        <gi-box class="gi-p-2">
          <gi-icon-button appearance="default" ariaLabel="default" dataTestId="icon-button-appearance-default">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-box>
        <gi-box class="gi-bg-black gi-p-2">
          <gi-icon-button appearance="light" ariaLabel="light" dataTestId="icon-button-appearance-light">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-box>
        <gi-box class="gi-p-2">
          <gi-icon-button appearance="dark" ariaLabel="dark" dataTestId="icon-button-appearance-dark">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-box>
      </gi-stack>
    `,
  }),
};

export const AllSizes: Story = {
  ...stories.AllSizes,
  tags: ['skip-playwright'],
  render: (_props) => ({
    props: { iconSize },
    moduleMetadata: { imports: [Info, GiStack] },
    template: `
      <gi-stack direction="row" [gap]="4" align="center">
        <gi-icon-button size="sm" ariaLabel="sm" dataTestId="icon-button-size-sm">
          <gi-info-icon [size]="iconSize['sm']" />
        </gi-icon-button>
        <gi-icon-button size="md" ariaLabel="md" dataTestId="icon-button-size-md">
          <gi-info-icon [size]="iconSize['md']" />
        </gi-icon-button>
        <gi-icon-button size="lg" ariaLabel="lg" dataTestId="icon-button-size-lg">
          <gi-info-icon [size]="iconSize['lg']" />
        </gi-icon-button>
        <gi-icon-button size="xl" ariaLabel="xl" dataTestId="icon-button-size-xl">
          <gi-info-icon [size]="iconSize['xl']" />
        </gi-icon-button>
      </gi-stack>
    `,
  }),
};

export const Disabled: Story = {
  ...stories.Disabled,
  tags: ['skip-playwright'],
  render: (_props) => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info, GiStack] },
    template: `
      <gi-stack direction="column" [gap]="4" align="start">
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="primary" appearance="default" [disabled]="true" ariaLabel="primary default disabled" dataTestId="icon-button-disabled-primary-default">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" [disabled]="true" ariaLabel="primary default disabled hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" [disabled]="true" ariaLabel="primary default disabled focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2" class="gi-p-4 gi-bg-black">
          <gi-icon-button variant="primary" appearance="light" [disabled]="true" ariaLabel="primary light disabled" dataTestId="icon-button-disabled-primary-light">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" [disabled]="true" ariaLabel="primary light disabled hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" [disabled]="true" ariaLabel="primary light disabled focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="primary" appearance="dark" [disabled]="true" ariaLabel="primary dark disabled" dataTestId="icon-button-disabled-primary-dark">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" [disabled]="true" ariaLabel="primary dark disabled hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" [disabled]="true" ariaLabel="primary dark disabled focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="secondary" appearance="default" [disabled]="true" ariaLabel="secondary default disabled" dataTestId="icon-button-disabled-secondary-default">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" [disabled]="true" ariaLabel="secondary default disabled hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" [disabled]="true" ariaLabel="secondary default disabled focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2" class="gi-p-4 gi-bg-black">
          <gi-icon-button variant="secondary" appearance="light" [disabled]="true" ariaLabel="secondary light disabled" dataTestId="icon-button-disabled-secondary-light">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" [disabled]="true" ariaLabel="secondary light disabled hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" [disabled]="true" ariaLabel="secondary light disabled focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="secondary" appearance="dark" [disabled]="true" ariaLabel="secondary dark disabled" dataTestId="icon-button-disabled-secondary-dark">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" [disabled]="true" ariaLabel="secondary dark disabled hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" [disabled]="true" ariaLabel="secondary dark disabled focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="flat" appearance="default" [disabled]="true" ariaLabel="flat default disabled" dataTestId="icon-button-disabled-flat-default">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" [disabled]="true" ariaLabel="flat default disabled hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" [disabled]="true" ariaLabel="flat default disabled focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2" class="gi-p-4 gi-bg-black">
          <gi-icon-button variant="flat" appearance="light" [disabled]="true" ariaLabel="flat light disabled" dataTestId="icon-button-disabled-flat-light">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" [disabled]="true" ariaLabel="flat light disabled hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" [disabled]="true" ariaLabel="flat light disabled focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="flat" appearance="dark" [disabled]="true" ariaLabel="flat dark disabled" dataTestId="icon-button-disabled-flat-dark">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" [disabled]="true" ariaLabel="flat dark disabled hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" [disabled]="true" ariaLabel="flat dark disabled focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
      </gi-stack>
    `,
  }),
};

export const InteractionStates: Story = {
  ...stories.InteractionStates,
  tags: ['skip-playwright'],
  render: (_props) => ({
    props: { iconSize: iconSize[Size.MD] },
    moduleMetadata: { imports: [Info, GiStack] },
    template: `
      <gi-stack direction="column" [gap]="2" align="start">
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="primary" appearance="default" ariaLabel="primary default">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" ariaLabel="primary default hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="default" ariaLabel="primary default focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2" class="gi-p-4 gi-bg-black">
          <gi-icon-button variant="primary" appearance="light" ariaLabel="primary light">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" ariaLabel="primary light hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="light" ariaLabel="primary light focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="primary" appearance="dark" ariaLabel="primary dark">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" ariaLabel="primary dark hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="primary" appearance="dark" ariaLabel="primary dark focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="secondary" appearance="default" ariaLabel="secondary default">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" ariaLabel="secondary default hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="default" ariaLabel="secondary default focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2" class="gi-p-4 gi-bg-black">
          <gi-icon-button variant="secondary" appearance="light" ariaLabel="secondary light">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" ariaLabel="secondary light hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="light" ariaLabel="secondary light focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="secondary" appearance="dark" ariaLabel="secondary dark">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" ariaLabel="secondary dark hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="secondary" appearance="dark" ariaLabel="secondary dark focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="flat" appearance="default" ariaLabel="flat default">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" ariaLabel="flat default hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="default" ariaLabel="flat default focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2" class="gi-p-4 gi-bg-black">
          <gi-icon-button variant="flat" appearance="light" ariaLabel="flat light">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" ariaLabel="flat light hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="light" ariaLabel="flat light focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
        <gi-stack [direction]="{ base: 'column', sm: 'row' }" [gap]="2">
          <gi-icon-button variant="flat" appearance="dark" ariaLabel="flat dark">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" ariaLabel="flat dark hover" class="pseudo-hover">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
          <gi-icon-button variant="flat" appearance="dark" ariaLabel="flat dark focus" class="pseudo-focus">
            <gi-info-icon [size]="iconSize" />
          </gi-icon-button>
        </gi-stack>
      </gi-stack>
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
  render: (_props) => ({
    props: { iconSize },
    moduleMetadata: { imports: [Info, GiStackDirective, GiIconButtonDirective] },
    template: `
      <div giStack direction="column" [gap]="4" align="start">
        <div giStack direction="row" [gap]="4">
          <button giIconButton type="button" aria-label="Primary">
            <gi-info-icon [size]="iconSize['md']" />
          </button>
          <button giIconButton variant="secondary" type="button" aria-label="Secondary">
            <gi-info-icon [size]="iconSize['md']" />
          </button>
          <button giIconButton variant="flat" type="button" aria-label="Flat">
            <gi-info-icon [size]="iconSize['md']" />
          </button>
        </div>
        <div giStack direction="row" [gap]="4" align="center">
          <button giIconButton size="sm" type="button" aria-label="Small">
            <gi-info-icon [size]="iconSize['sm']" />
          </button>
          <button giIconButton size="md" type="button" aria-label="Medium">
            <gi-info-icon [size]="iconSize['md']" />
          </button>
          <button giIconButton size="lg" type="button" aria-label="Large">
            <gi-info-icon [size]="iconSize['lg']" />
          </button>
          <button giIconButton size="xl" type="button" aria-label="Extra large">
            <gi-info-icon [size]="iconSize['xl']" />
          </button>
        </div>
        <div giStack direction="row" [gap]="4">
          <button giIconButton disabled type="button" aria-label="Disabled">
            <gi-info-icon [size]="iconSize['md']" />
          </button>
          <button giIconButton variant="secondary" [disabled]="true" type="button" aria-label="Disabled secondary">
            <gi-info-icon [size]="iconSize['md']" />
          </button>
        </div>
        <div giStack class="gi-bg-black gi-p-4">
          <button giIconButton appearance="light" type="button" aria-label="Light appearance">
            <gi-info-icon [size]="iconSize['md']" />
          </button>
        </div>
      </div>
    `,
  }),
};
