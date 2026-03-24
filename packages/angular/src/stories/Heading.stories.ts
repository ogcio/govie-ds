import type { Meta, StoryObj } from '@storybook/angular';
import H1 from '../atoms/heading/H1';
import H2 from '../atoms/heading/H2';
import H3 from '../atoms/heading/H3';
import H4 from '../atoms/heading/H4';
import H5 from '../atoms/heading/H5';
import H6 from '../atoms/heading/H6';
import {
  headingMeta,
  Default as headingDefault,
  AllHeadingLevels as headingAllLevels,
} from '../atoms/storybook/Heading.meta';

const meta: Meta = {
  ...headingMeta,
  title: 'Typography/Heading',
  argTypes: {
    ...headingMeta.argTypes,
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    ...headingDefault.args,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [H1],
    },
    template: `
      <gi-h1 [id]="heading-id" [size]="size">Heading</gi-h1>
    `,
  }),
};

export const AllHeadingLevels: StoryObj = {
  ...headingAllLevels,
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [H1, H2, H3, H4, H5, H6],
    },
    template: `
      <gi-h1 [dataTestId]="'heading-1'">Heading 1</gi-h1>
      <gi-h2 [dataTestId]="'heading-2'">Heading 2</gi-h2>
      <gi-h3 [dataTestId]="'heading-3'">Heading 3</gi-h3>
      <gi-h4 [dataTestId]="'heading-4'">Heading 4</gi-h4>
      <gi-h5 [dataTestId]="'heading-5'">Heading 5</gi-h5>
      <gi-h6 [dataTestId]="'heading-6'">Heading 6</gi-h6>
    `,
  }),
};
