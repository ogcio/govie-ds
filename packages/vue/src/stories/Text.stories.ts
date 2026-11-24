import type { Meta, StoryObj } from '@storybook/vue3-vite';
import omit from 'lodash/omit';
import Text from '../Text.vue';
import { Size } from '../constants';
import * as stories from '../atoms/storybook/Text.meta';
import argTypes from '../atoms/storybook/argTypes';

const meta: Meta = {
  ...stories.textMeta,
  title: 'Typography/Text',
  component: Text,
  args: omit(stories.textMeta.args, ['dataTestId']),
  argTypes: {
    ...omit(stories.textMeta.argTypes, ['ariaHidden', 'dataTestId']),
    // Native attribute, passed through to the element.
    id: { table: { disable: true } },
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

const content = 'Lorem ipsum dolor sit amet.';

type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (args) => ({
    components: { Text },
    setup: () => ({ args, content }),
    template:
      '<Text :id="args.id" :size="args.size" :whitespace="args.whitespace" data-testid="text-default">{{ content }}</Text>',
  }),
};

export const AllTextSizes: Story = {
  ...stories.AllTextSizes,
  render: () => ({
    components: { Text },
    setup: () => ({ sizes: Object.values(Size) }),
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2">
        <Text v-for="size in sizes" :key="size" :size="size" :data-testid="'text-all-sizes-' + size">
          Text {{ size }}
        </Text>
      </div>
    `,
  }),
};
