import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiText } from '@/Text';
import * as TextStoryMeta from '@/atoms/storybook/Text.meta';

const meta: Meta<GiText> = {
  ...TextStoryMeta.textMeta,
  title: 'Typography/Text',
  component: GiText,
};

export default meta;
const loremIpsum = 'Lorem ipsum dolor sit amet.';

type Story = StoryObj<GiText & { content: string }>;

export const Default: Story = {
  ...TextStoryMeta.Default,
  render: (props: any) => ({
    props: { ...props, content: loremIpsum },
    template: `
      <gi-text
        [id]="id"
        [dataTestId]="dataTestId"
        [size]="size"
        [whitespace]="whitespace"
        [ariaHidden]="ariaHidden"
      >
        {{ content }}
      </gi-text>
    `,
  }),
};

export const AllTextSizes: Story = {
  ...TextStoryMeta.AllTextSizes,
  render: (props: any) => ({
    props,
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2">
        <gi-text size="sm" dataTestId="text-all-sizes-sm">Text sm</gi-text>
        <gi-text size="md" dataTestId="text-all-sizes-md">Text md</gi-text>
        <gi-text size="lg" dataTestId="text-all-sizes-lg">Text lg</gi-text>
        <gi-text size="xl" dataTestId="text-all-sizes-xl">Text xl</gi-text>
      </div>
    `,
  }),
};
