import type { Meta, StoryObj } from '@storybook/vue3-vite';
import omit from 'lodash/omit';
import InsetText from '../InsetText.vue';
import * as stories from '../atoms/storybook/InsetText.meta';
import argTypes from '../atoms/storybook/argTypes';

const meta: Meta = {
  ...stories.insetTextMeta,
  title: 'Typography/InsetText',
  component: InsetText,
  args: omit(stories.insetTextMeta.args, ['describedBy', 'labelledBy']),
  argTypes: {
    ...omit(stories.insetTextMeta.argTypes, ['describedBy', 'labelledBy']),
    // Native attribute, passed through to the element.
    id: { table: { disable: true } },
    // Rendered as the default slot.
    children: { table: { disable: true } },
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
  args: {},
  render: (args) => ({
    components: { InsetText },
    setup: () => ({ args }),
    template: '<InsetText :id="args.id" :cite="args.cite">{{ args.children }}</InsetText>',
  }),
};
