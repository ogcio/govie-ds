import type { Meta, StoryObj } from '@storybook/angular-vite';
import { GiH1, GiH1Directive } from '@/heading/H1';
import { GiH2, GiH2Directive } from '@/heading/H2';
import { GiH3, GiH3Directive } from '@/heading/H3';
import { GiH4, GiH4Directive } from '@/heading/H4';
import { GiH5, GiH5Directive } from '@/heading/H5';
import { GiH6, GiH6Directive } from '@/heading/H6';
import {
  headingMeta,
  Default as headingDefault,
  AllHeadingLevels as headingAllLevels,
} from '@/atoms/storybook/Heading.meta';

const meta: Meta = {
  ...headingMeta,
  title: 'Typography/Heading',
  argTypes: {
    ...headingMeta.argTypes,
  },
};

export default meta;

export const Default: StoryObj = {
  ...headingDefault,
  args: {
    ...headingDefault.args,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [GiH1],
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
      imports: [GiH1, GiH2, GiH3, GiH4, GiH5, GiH6],
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

export const Directive: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Adds the `gi-h1`–`gi-h6` styling to a plain `h1`–`h6`, keeping the same per-level default sizes.',
      },
    },
  },
  render: () => ({
    moduleMetadata: {
      imports: [GiH1Directive, GiH2Directive, GiH3Directive, GiH4Directive, GiH5Directive, GiH6Directive],
    },
    template: `
      <h1 giHeading>Heading 1</h1>
      <h2 giHeading>Heading 2</h2>
      <h3 giHeading>Heading 3</h3>
      <h4 giHeading>Heading 4</h4>
      <h5 giHeading>Heading 5</h5>
      <h6 giHeading>Heading 6</h6>
    `,
  }),
};
