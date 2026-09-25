import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiInsetText } from '@/InsetText';
import { insetTextMeta, Default as insetTextDefault } from '@/atoms/storybook/InsetText.meta';

const meta: Meta<GiInsetText> = {
  ...insetTextMeta,
  title: 'Typography/InsetText',
  component: GiInsetText,
};

export default meta;

export const Default: StoryObj<GiInsetText & { content: string }> = {
  ...insetTextDefault,
  args: {
    ...insetTextDefault.args,
    content: String(insetTextDefault.args?.children),
  },
  render: (args) => ({
    props: args,
    template: `
      <gi-inset-text
        [id]="id"
        [cite]="cite"
        [describedBy]="describedBy"
        [labelledBy]="labelledBy"
      >
        {{content}}
      </gi-inset-text>
    `,
  }),
};
