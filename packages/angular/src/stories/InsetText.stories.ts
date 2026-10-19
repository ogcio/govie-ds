import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { GiInsetText, GiInsetTextDirective } from '@/InsetText';
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

export const Directive: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Adds the `gi-inset-text` styling to a plain `blockquote`.',
      },
    },
  },
  render: () => ({
    props: { content: insetTextMeta.args.children },
    moduleMetadata: { imports: [GiInsetTextDirective] },
    template: `<blockquote giInsetText>{{content}}</blockquote>`,
  }),
};

export const TestStaticId: StoryObj = {
  tags: ['!dev', '!autodocs', 'skip-playwright'],
  render: () => ({
    template: `<gi-inset-text id="inset-text-static-id">Inset text</gi-inset-text>`,
  }),
  play: async ({ canvasElement }) => {
    const matches = canvasElement.querySelectorAll('#inset-text-static-id');
    await expect(matches).toHaveLength(1);
    await expect(matches[0].tagName).toBe('BLOCKQUOTE');
  },
};
