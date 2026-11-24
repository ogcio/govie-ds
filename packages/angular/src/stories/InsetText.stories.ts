import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { GiInsetText, GiInsetTextDirective } from '@/InsetText';
import { insetTextMeta, Default as insetTextDefault } from '@/atoms/storybook/InsetText.meta';
import argTypes from '@/atoms/storybook/argTypes';

const meta: Meta<GiInsetText & { children: string }> = {
  ...insetTextMeta,
  title: 'Typography/InsetText',
  component: GiInsetText,
  argTypes: {
    ...insetTextMeta.argTypes,
    // Projected content, not an input.
    children: { table: { disable: true } },
    class: argTypes.class,
    style: {
      ...argTypes.style,
      table: { type: { summary: 'string | Record<string, string | number | null | undefined>' } },
    },
  },
};

export default meta;

export const Default: StoryObj<GiInsetText> = {
  ...insetTextDefault,
  args: {
    ...insetTextDefault.args,
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
        {{children}}
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
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [GiInsetTextDirective] },
    template: `<blockquote giInsetText>{{children}}</blockquote>`,
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
