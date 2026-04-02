import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../atoms';
import * as TextStoryMeta from '../atoms/storybook/Text.meta';

const meta: Meta<typeof Text> = {
  ...TextStoryMeta.textMeta,
  title: 'Typography/Text',
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  ...TextStoryMeta.Default,
};

export const SizeSM: Story = { ...TextStoryMeta.SizeSM };
export const SizeMD: Story = { ...TextStoryMeta.SizeMD };
export const SizeLG: Story = { ...TextStoryMeta.SizeLG };
export const SizeXL: Story = { ...TextStoryMeta.SizeXL };
export const WhitespaceNormal: Story = { ...TextStoryMeta.WhitespaceNormal };
export const WhitespacePre: Story = { ...TextStoryMeta.WhitespacePre };
export const WhitespacePreWrap: Story = { ...TextStoryMeta.WhitespacePreWrap };
export const WhitespaceBreakSpaces: Story = {
  ...TextStoryMeta.WhitespaceBreakSpaces,
};
