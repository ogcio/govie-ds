import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { GiStack } from '@/Stack';
import { GiText, GiTextDirective } from '@/Text';
import { Size } from '@/atoms/constants';
import * as TextStoryMeta from '@/atoms/storybook/Text.meta';

const meta: Meta<GiText> = {
  ...TextStoryMeta.textMeta,
  title: 'Typography/Text',
  component: GiText,
};

export default meta;
const loremIpsum = 'Lorem ipsum dolor sit amet.';

type Story = StoryObj<GiText & { content: string }>;

export const Default: Story = {
  ...TextStoryMeta.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props: { ...props, content: loremIpsum },
    template: `
      <gi-text
        [id]="id"
        [dataTestId]="dataTestId"
        [size]="size"
        [whitespace]="whitespace"
        [ariaHidden]="ariaHidden"
      >
        {{ content }}
      </gi-text>
    `,
  }),
};

export const AllTextSizes: Story = {
  ...TextStoryMeta.AllTextSizes,
  render: (props) => ({
    props,
    template: `
      <div class="gi-flex gi-flex-col gi-gap-2">
        <gi-text id="text-sm" size="sm" dataTestId="text-all-sizes-sm">Text sm</gi-text>
        <gi-text id="text-md" size="md" dataTestId="text-all-sizes-md">Text md</gi-text>
        <gi-text id="text-lg" size="lg" dataTestId="text-all-sizes-lg">Text lg</gi-text>
        <gi-text id="text-xl" size="xl" dataTestId="text-all-sizes-xl">Text xl</gi-text>
      </div>
    `,
  }),
  play: async (context) => {
    await TextStoryMeta.AllTextSizes.play(context);

    await context.step('renders each static id once', async () => {
      for (const size of Object.values(Size)) {
        expect(context.canvasElement.querySelectorAll(`#text-${size}`)).toHaveLength(1);
      }
    });
  },
};

export const Directive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Adds the `gi-text` styling to a plain `span`, with the same sizes and whitespace handling.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [GiStack, GiTextDirective] },
    template: `
      <gi-stack [gap]="2">
        <span giText size="sm">Text sm</span>
        <span giText size="md">Text md</span>
        <span giText size="lg">Text lg</span>
        <span giText size="xl">Text xl</span>
      </gi-stack>
    `,
  }),
};
