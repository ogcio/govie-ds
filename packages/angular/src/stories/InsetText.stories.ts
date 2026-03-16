import type { Meta, StoryObj } from '@storybook/angular';
import InsetText from '../atoms/InsetText';
import {
  insetTextMeta,
  Default as insetTextDefault,
} from '../atoms/storybook/InsetText.meta';

const meta: Meta<InsetText> = {
  ...insetTextMeta,
  title: 'Typography/InsetText',
  component: InsetText,
};

export default meta;

export const Default: StoryObj<InsetText & { content: string }> = {
  ...insetTextDefault,
  args: {
    ...insetTextDefault.args,
    content: String(insetTextDefault.args?.children),
  },
  render: (args) => ({
    props: args,
    template: `
      <inset-text
        [id]="id"
        [cite]="cite"
        [describedBy]="describedBy"
        [labelledBy]="labelledBy"
      >
        {{content}}
      </inset-text>
    `,
  }),
};
