import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Appearance, Variant } from '../atoms/Button.styles';
import { Size } from '../atoms/constants';
import * as stories from '../atoms/storybook/IconButton.meta';
import argTypes from '../atoms/storybook/argTypes';
import { InfoIcon } from '../icons';
import { IconButton } from '../index';
import { withAppearanceBackground } from './utils';

const variants = Object.values(Variant);
const appearances = Object.values(Appearance);
const sizes = Object.values(Size);

const iconSize: Record<string, number> = {
  [Size.SM]: 16,
  [Size.MD]: 24,
  [Size.LG]: 24,
  [Size.XL]: 32,
};

const meta: Meta = {
  ...stories.meta,
  title: 'Components/IconButton',
  component: IconButton,
  decorators: [withAppearanceBackground],
  argTypes: {
    ...stories.meta.argTypes,
    // The shared play reads `dataTestId` from the story args; the template binds it as `data-testid`.
    dataTestId: { table: { disable: true } },
    class: {
      ...argTypes.class,
      table: { type: { summary: 'string | object | array' } },
    },
    style: {
      ...argTypes.style,
      table: { type: { summary: 'string | object | array' } },
    },
  },
  parameters: {
    ...stories.meta.parameters,
    docs: {
      ...stories.meta.parameters.docs,
      description: {
        component: `${stories.meta.parameters.docs.description.component}\n\nPlace the icon inside the button as its default slot.`,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (args) => ({
    components: { IconButton, InfoIcon },
    setup: () => ({ args, iconSize, defaultSize: Size.MD }),
    template: `
      <IconButton
        :id="args.id"
        :variant="args.variant"
        :appearance="args.appearance"
        :size="args.size"
        :disabled="args.disabled"
        :aria-label="args.ariaLabel"
        :data-testid="args.dataTestId"
      >
        <InfoIcon :size="iconSize[args.size ?? defaultSize]" />
      </IconButton>
    `,
  }),
};

export const AllVariants: Story = {
  ...stories.AllVariants,
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { IconButton, InfoIcon },
    setup: () => ({ variants }),
    template: `
      <div class="gi-flex gi-gap-4">
        <IconButton
          v-for="variant in variants"
          :key="variant"
          :variant="variant"
          :aria-label="variant"
          :data-testid="'icon-button-variant-' + variant"
        >
          <InfoIcon />
        </IconButton>
      </div>
    `,
  }),
};

export const AllAppearances: Story = {
  ...stories.AllAppearances,
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { IconButton, InfoIcon },
    setup: () => ({ appearances, light: Appearance.LIGHT }),
    template: `
      <div class="gi-flex gi-gap-4">
        <div v-for="appearance in appearances" :key="appearance" class="gi-p-2" :class="{ 'gi-bg-black': appearance === light }">
          <IconButton :appearance="appearance" :aria-label="appearance" :data-testid="'icon-button-appearance-' + appearance">
            <InfoIcon />
          </IconButton>
        </div>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  ...stories.AllSizes,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Match the icon size to the button size: 16 for `sm`, 24 for `md` and `lg`, 32 for `xl`.',
      },
    },
  },
  render: () => ({
    components: { IconButton, InfoIcon },
    setup: () => ({ sizes, iconSize }),
    template: `
      <div class="gi-flex gi-items-center gi-gap-4">
        <IconButton v-for="size in sizes" :key="size" :size="size" :aria-label="size" :data-testid="'icon-button-size-' + size">
          <InfoIcon :size="iconSize[size]" />
        </IconButton>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  ...stories.Disabled,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Disabled icon buttons in every variant and appearance, with their hover and focus states.',
      },
    },
    pseudo: {
      hover: '.pseudo-hover',
      focus: '.pseudo-focus',
    },
  },
  render: () => ({
    components: { IconButton, InfoIcon },
    setup: () => ({ variants, appearances, light: Appearance.LIGHT }),
    template: `
      <div class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <template v-for="variant in variants" :key="variant">
          <div
            v-for="appearance in appearances"
            :key="variant + '-' + appearance"
            class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row"
            :class="{ 'gi-p-4 gi-bg-black': appearance === light }"
          >
            <IconButton
              :variant="variant"
              :appearance="appearance"
              disabled
              :aria-label="variant + ' ' + appearance + ' disabled'"
              :data-testid="'icon-button-disabled-' + variant + '-' + appearance"
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              :variant="variant"
              :appearance="appearance"
              disabled
              :aria-label="variant + ' ' + appearance + ' disabled hover'"
              class="pseudo-hover"
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              :variant="variant"
              :appearance="appearance"
              disabled
              :aria-label="variant + ' ' + appearance + ' disabled focus'"
              class="pseudo-focus"
            >
              <InfoIcon />
            </IconButton>
          </div>
        </template>
      </div>
    `,
  }),
};

export const InteractionStates: Story = {
  ...stories.InteractionStates,
  parameters: {
    ...stories.InteractionStates.parameters,
    controls: { disable: true },
    docs: {
      description: {
        story: 'Default, hover and focus states for every variant and appearance.',
      },
    },
  },
  render: () => ({
    components: { IconButton, InfoIcon },
    setup: () => ({ variants, appearances, light: Appearance.LIGHT }),
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2 gi-items-start">
        <template v-for="variant in variants" :key="variant">
          <div
            v-for="appearance in appearances"
            :key="variant + '-' + appearance"
            class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row"
            :class="{ 'gi-p-4 gi-bg-black': appearance === light }"
          >
            <IconButton
              :variant="variant"
              :appearance="appearance"
              :aria-label="variant + ' ' + appearance"
              :data-testid="'icon-button-' + variant + '-' + appearance"
            >
              <InfoIcon />
            </IconButton>
            <IconButton :variant="variant" :appearance="appearance" :aria-label="variant + ' ' + appearance + ' hover'" class="pseudo-hover">
              <InfoIcon />
            </IconButton>
            <IconButton :variant="variant" :appearance="appearance" :aria-label="variant + ' ' + appearance + ' focus'" class="pseudo-focus">
              <InfoIcon />
            </IconButton>
          </div>
        </template>
      </div>
    `,
  }),
};
