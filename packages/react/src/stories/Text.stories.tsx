import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../atoms';
import { textMeta, Default as textDefault } from '../atoms/storybook/Text.meta';

const meta: Meta<typeof Text> = {
  ...textMeta,
  title: 'Typography/Text',
  component: Text,
};

export default meta;

export const Default: StoryObj<typeof Text> = {
  ...textDefault,
};
