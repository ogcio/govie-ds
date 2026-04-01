import type { Meta, StoryObj } from '@storybook/angular';
import { Text } from '../atoms';
import { textMeta, Default as textDefault } from '../atoms/storybook/Text.meta';

const meta: Meta<Text> = {
  ...textMeta,
  title: 'Typography/Text',
  component: Text,
};

export default meta;

export const Default: StoryObj<Text & { content: string }> = {
  ...textDefault,
  args: {
    ...textDefault.args,
  },
  render: (args) => ({
    props: {
      ...args,
      content: String((args as { children?: string }).children ?? ''),
    },
    template: `
      <text
        [id]="id"
        [dataTestid]="dataTestid"
        [size]="size"
        [whitespace]="whitespace"
        [className]="className"
      >
        {{ content }}
      </text>
    `,
  }),
};
