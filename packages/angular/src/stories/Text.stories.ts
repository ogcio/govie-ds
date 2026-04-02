import type { Meta, StoryObj } from '@storybook/angular';
import { Text } from '../atoms';
import * as TextStoryMeta from '../atoms/storybook/Text.meta';

const meta: Meta<Text> = {
  ...TextStoryMeta.textMeta,
  title: 'Typography/Text',
  component: Text,
};

export default meta;

const textRender = (args: Record<string, unknown>) => ({
  props: {
    ...args,
    content: String((args as { children?: string }).children ?? ''),
  },
  template: `
      <gi-text
        [id]="id"
        [dataTestId]="dataTestId"
        [styles]="styles"
        [size]="size"
        [whitespace]="whitespace"
        [className]="className"
      >
        {{ content }}
      </gi-text>
    `,
});

type Story = StoryObj<Text & { content: string }>;

export const Default: Story = {
  ...TextStoryMeta.Default,
  args: {
    ...TextStoryMeta.Default.args,
  },
  render: textRender,
};

export const SizeSM: Story = {
  ...TextStoryMeta.SizeSM,
  render: textRender,
};
export const SizeMD: Story = {
  ...TextStoryMeta.SizeMD,
  render: textRender,
};
export const SizeLG: Story = {
  ...TextStoryMeta.SizeLG,
  render: textRender,
};
export const SizeXL: Story = {
  ...TextStoryMeta.SizeXL,
  render: textRender,
};
export const WhitespaceNormal: Story = {
  ...TextStoryMeta.WhitespaceNormal,
  render: textRender,
};
export const WhitespacePre: Story = {
  ...TextStoryMeta.WhitespacePre,
  render: textRender,
};
export const WhitespacePreWrap: Story = {
  ...TextStoryMeta.WhitespacePreWrap,
  render: textRender,
};
export const WhitespaceBreakSpaces: Story = {
  ...TextStoryMeta.WhitespaceBreakSpaces,
  render: textRender,
};
