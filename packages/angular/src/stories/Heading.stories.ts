import type { Meta, StoryObj } from '@storybook/angular';
import CoreH1 from '../atoms/heading/CoreH1';
import CoreH2 from '../atoms/heading/CoreH2';
import CoreH3 from '../atoms/heading/CoreH3';
import CoreH4 from '../atoms/heading/CoreH4';
import CoreH5 from '../atoms/heading/CoreH5';
import CoreH6 from '../atoms/heading/CoreH6';
import { headingMeta, Default as headingDefault } from '../atoms/storybook/Heading.meta';

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
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CoreH1, CoreH2, CoreH3, CoreH4, CoreH5, CoreH6],
    },
    template: `
      <core-h1 [size]="size" [className]="className">Heading 1</core-h1>
      <core-h2 [size]="size" [className]="className">Heading 2</core-h2>
      <core-h3 [size]="size" [className]="className">Heading 3</core-h3>
      <core-h4 [size]="size" [className]="className">Heading 4</core-h4>
      <core-h5 [size]="size" [className]="className">Heading 5</core-h5>
      <core-h6 [size]="size" [className]="className">Heading 6</core-h6>
    `,
  }),
};
