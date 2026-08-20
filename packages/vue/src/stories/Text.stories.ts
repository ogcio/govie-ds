import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { Text } from '../atoms';
import { Size } from '../atoms/constants';
import { textMeta, Default as defaultStory, AllTextSizes as allTextSizes } from '../atoms/storybook/Text.meta';

const meta: Meta<typeof Text> = {
  ...textMeta,
  title: 'Typography/Text',
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  ...defaultStory,
  render: (args) => ({
    components: { Text },
    setup: () => ({ args, text: 'Lorem ipsum dolor sit amet.' }),
    template: '<Text v-bind="args">{{ text }}</Text>',
  }),
};

export const AllTextSizes: Story = {
  ...allTextSizes,
  render: () => ({
    components: { Text },
    setup: () => ({ sizes: Object.values(Size) }),
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2">
        <Text v-for="size in sizes" :key="size" :size="size" :data-test-id="\`text-all-sizes-\${size}\`">
          Text {{ size }}
        </Text>
      </div>
    `,
  }),
};
