import type { Meta, StoryObj } from '@storybook/angular';
import Heading from '../atoms/Heading';
import { headingMeta, Default as headingDefault } from '../atoms/storybook/Heading.meta';

const meta: Meta<Heading> = {
  ...headingMeta,
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    ...headingMeta.argTypes,
    tag: {
      control: false,
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML heading element to render. Defaults to h1.',
    },
    text: {
      table: { disable: true },
    },
  },
};

export default meta;

export const Default: StoryObj<Heading> = {
  ...headingDefault,
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [Heading],
    },
    template: `
      <heading tag="h1" [size]="size" text="Heading 1"></heading>
      <heading tag="h2" [size]="size" text="Heading 2"></heading>
      <heading tag="h3" [size]="size" text="Heading 3"></heading>
      <heading tag="h4" [size]="size" text="Heading 4"></heading>
      <heading tag="h5" [size]="size" text="Heading 5"></heading>
      <heading tag="h6" [size]="size" text="Heading 6"></heading>
    `,
  }),
};
