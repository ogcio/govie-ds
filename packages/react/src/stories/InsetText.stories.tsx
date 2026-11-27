import type { Meta, StoryObj } from '@storybook/react-vite';
import InsetText from '@/atoms/InsetText';
import { insetTextMeta, Default as insetTextDefault } from '@/atoms/storybook/InsetText.meta';
import argTypes from '@/atoms/storybook/argTypes';

const meta: Meta<typeof InsetText> = {
  ...insetTextMeta,
  title: 'Typography/InsetText',
  component: InsetText,
  argTypes: {
    ...insetTextMeta.argTypes,
    className: argTypes.class,
    styles: argTypes.style,
  },
};

export default meta;

export const Default: StoryObj<typeof InsetText> = {
  ...insetTextDefault,
};
