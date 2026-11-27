import type { Meta, StoryObj } from '@storybook/vue3-vite';
import omit from 'lodash/omit';
import Paragraph from '../Paragraph.vue';
import { Align, Size, Whitespace } from '../constants';
import * as stories from '../atoms/storybook/Paragraph.meta';
import argTypes from '../atoms/storybook/argTypes';

const meta: Meta = {
  ...stories.paragraphMeta,
  title: 'Typography/Paragraph',
  component: Paragraph,
  args: omit(stories.paragraphMeta.args, ['dataTestId']),
  argTypes: {
    ...omit(stories.paragraphMeta.argTypes, ['ariaHidden', 'dataTestId']),
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
  tags: ['skip-playwright'],
  render: (args) => ({
    components: { Paragraph },
    setup: () => ({ args }),
    template:
      '<Paragraph :id="args.id" :size="args.size" :align="args.align" :whitespace="args.whitespace" data-testid="paragraph-default">{{ args.children }}</Paragraph>',
  }),
};

export const AllParagraphSizes: Story = {
  ...stories.AllParagraphSizes,
  render: () => ({
    components: { Paragraph },
    setup: () => ({ sizes: Object.values(Size) }),
    template: `
      <div>
        <Paragraph v-for="size in sizes" :key="size" :size="size" :data-testid="'paragraph-' + size">
          Paragraph {{ size }}
        </Paragraph>
      </div>
    `,
  }),
};

export const AllWhitespaces: Story = {
  ...stories.AllWhitespaces,
  tags: ['skip-playwright'],
  render: () => ({
    components: { Paragraph },
    setup: () => ({ whitespaces: Object.values(Whitespace), content: stories.paragraphMeta.loremIpsum }),
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6">
        <div v-for="ws in whitespaces" :key="ws" class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">{{ ws }}</span>
          <Paragraph :whitespace="ws" :data-testid="'paragraph-ws-' + ws">{{ content }}</Paragraph>
        </div>
      </div>
    `,
  }),
};

export const AllAlignments: Story = {
  ...stories.AllAlignments,
  tags: ['skip-playwright'],
  render: () => ({
    components: { Paragraph },
    setup: () => ({ alignments: Object.values(Align), content: stories.paragraphMeta.loremIpsum }),
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6">
        <div v-for="align in alignments" :key="align" class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">{{ align }}</span>
          <Paragraph :align="align" :data-testid="'paragraph-align-' + align">{{ content }}</Paragraph>
        </div>
      </div>
    `,
  }),
};
