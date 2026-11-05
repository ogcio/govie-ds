import type { Meta, StoryObj } from '@storybook/vue3-vite';
import omit from 'lodash/omit';
import Text from '../Text.vue';
import { Size } from '../constants';
import * as stories from '../atoms/storybook/Text.meta';

const meta: Meta<typeof Text> = {
  ...stories.textMeta,
  title: 'Typography/Text',
  component: Text,
  args: omit(stories.textMeta.args, ['dataTestId']),
  argTypes: {
    ...omit(stories.textMeta.argTypes, ['className', 'styles', 'dataTestId']),
    class: {
      control: false,
      description: 'Additional CSS classes, merged with the classes of the root `<span>` element.',
      table: { type: { summary: 'string | object | array' } },
    },
    style: {
      control: false,
      description: 'Inline CSS styles applied to the root `<span>` element.',
      table: { type: { summary: 'string | object | array' } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  play: stories.Default.play,
  render: (args) => ({
    components: { Text },
    setup: () => ({ args }),
    template: '<Text v-bind="args" data-testid="text-default">Lorem ipsum dolor sit amet.</Text>',
  }),
};

export const AllTextSizes: Story = {
  play: stories.AllTextSizes.play,
  render: () => ({
    components: { Text },
    setup: () => ({ sizes: Object.values(Size) }),
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2">
        <Text v-for="size in sizes" :key="size" :size="size" :data-testid="\`text-all-sizes-\${size}\`">
          Text {{ size }}
        </Text>
      </div>
    `,
  }),
};
