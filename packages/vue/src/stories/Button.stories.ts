import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Appearance, ButtonSize, Variant } from '../atoms/Button.styles';
import * as stories from '../atoms/storybook/Button.meta';
import argTypes from '../atoms/storybook/argTypes';
import { Box, Button } from '../index';
import { withAppearanceBackground } from './utils';

const variants = Object.values(Variant);
const appearances = Object.values(Appearance);
const sizes = Object.values(ButtonSize);

const meta: Meta = {
  ...stories.meta,
  title: 'Components/Button',
  component: Button,
  decorators: [withAppearanceBackground],
  argTypes: {
    ...stories.meta.argTypes,
    // Rendered as the default slot.
    children: { table: { disable: true } },
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
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `
      <Button
        :id="args.id"
        :variant="args.variant"
        :appearance="args.appearance"
        :size="args.size"
        :disabled="args.disabled"
        :data-testid="args.dataTestId"
      >{{ args.children }}</Button>
    `,
  }),
};

export const AllVariants: Story = {
  ...stories.AllVariants,
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { Box, Button },
    setup: () => ({ variants }),
    template: `
      <Box class="gi-flex gi-gap-4">
        <Button v-for="variant in variants" :key="variant" :variant="variant" :data-testid="'button-variant-' + variant">
          {{ variant }}
        </Button>
      </Box>
    `,
  }),
};

export const AllAppearances: Story = {
  ...stories.AllAppearances,
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { Box, Button },
    setup: () => ({ appearances, light: Appearance.LIGHT }),
    template: `
      <Box class="gi-flex gi-gap-4">
        <Box v-for="appearance in appearances" :key="appearance" class="gi-p-2" :class="{ 'gi-bg-black': appearance === light }">
          <Button :appearance="appearance" :data-testid="'button-appearance-' + appearance">{{ appearance }}</Button>
        </Box>
      </Box>
    `,
  }),
};

export const AllSizes: Story = {
  ...stories.AllSizes,
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { Box, Button },
    setup: () => ({ sizes }),
    template: `
      <Box class="gi-flex gi-items-center gi-gap-4">
        <Button v-for="size in sizes" :key="size" :size="size" :data-testid="'button-size-' + size">{{ size }}</Button>
      </Box>
    `,
  }),
};

export const Disabled: Story = {
  ...stories.Disabled,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Disabled buttons in every variant and appearance, with their hover and focus states.',
      },
    },
    pseudo: {
      hover: '.pseudo-hover',
      focus: '.pseudo-focus',
    },
  },
  render: () => ({
    components: { Box, Button },
    setup: () => ({ variants, appearances, light: Appearance.LIGHT }),
    template: `
      <Box class="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <template v-for="variant in variants" :key="variant">
          <Box
            v-for="appearance in appearances"
            :key="variant + '-' + appearance"
            class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row"
            :class="{ 'gi-p-4 gi-bg-black': appearance === light }"
          >
            <Button :variant="variant" :appearance="appearance" disabled :data-testid="'button-disabled-' + variant + '-' + appearance">
              Disabled
            </Button>
            <Button :variant="variant" :appearance="appearance" disabled class="pseudo-hover">Hover</Button>
            <Button :variant="variant" :appearance="appearance" disabled class="pseudo-focus">Focus</Button>
          </Box>
        </template>
      </Box>
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
    components: { Box, Button },
    setup: () => ({ variants, appearances, light: Appearance.LIGHT }),
    template: `
      <Box class="gi-flex gi-flex-col gi-gap-2 gi-items-start">
        <template v-for="variant in variants" :key="variant">
          <Box
            v-for="appearance in appearances"
            :key="variant + '-' + appearance"
            class="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row"
            :class="{ 'gi-p-4 gi-bg-black': appearance === light }"
          >
            <Button :variant="variant" :appearance="appearance" :data-testid="'button-' + variant + '-' + appearance">Button</Button>
            <Button :variant="variant" :appearance="appearance" class="pseudo-hover">Hover</Button>
            <Button :variant="variant" :appearance="appearance" class="pseudo-focus">Focus</Button>
          </Box>
        </template>
      </Box>
    `,
  }),
};
