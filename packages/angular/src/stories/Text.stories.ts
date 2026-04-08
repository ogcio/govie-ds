import type { Meta, StoryObj } from '@storybook/angular';
import { Text } from '../atoms';
import * as TextStoryMeta from '../atoms/storybook/Text.meta';

const meta: Meta<Text> = {
  ...TextStoryMeta.textMeta,
  title: 'Typography/Text',
  component: Text,
};

export default meta;
const loremIpsum = 'Lorem ipsum dolor sit amet.';

type Story = StoryObj<Text & { content: string }>;

export const Default: Story = {
  ...TextStoryMeta.Default,
  render: (args: any) => ({
    props: { ...args, content: loremIpsum },
    template: `
      <gi-text
        [id]="id"
        [dataTestId]="dataTestId"
        [styles]="styles"
        [size]="size"
        [whitespace]="whitespace"
        [className]="className"
        [ariaHidden]="ariaHidden"
      >
        {{ content }}
      </gi-text>
    `,
  }),
};

export const AllTextSizes: Story = {
  ...TextStoryMeta.AllTextSizes,
  render: (args: any) => ({
    props: { ...args },
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

export const AlignCenterFixedWidth: Story = {
  ...TextStoryMeta.AlignCenterFixedWidth,
  render: (args: any) => ({
    props: { ...args },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2">
        <gi-text size="md" dataTestId="text-align-center-fixed-width-start" className="gi-w-[200px]" align="start">Text start</gi-text>
        <gi-text size="md" dataTestId="text-align-center-fixed-width-center" className="gi-w-[200px]" align="center">Text center</gi-text>
        <gi-text size="md" dataTestId="text-align-center-fixed-width-end" className="gi-w-[200px]" align="end">Text end</gi-text>
        <gi-text size="md" dataTestId="text-align-center-fixed-width-justify" className="gi-w-[200px]" align="justify">Text justify</gi-text>
      </div>
    `,
  }),
};
