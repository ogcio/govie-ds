import type { Meta, StoryObj } from '@storybook/react';
import Heading, { Props } from '../atoms/Heading';
import {
  headingMeta,
  Default as headingDefault,
} from '../atoms/storybook/Heading.meta';

const meta: Meta<typeof Heading> = {
  ...headingMeta,
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    ...headingMeta.argTypes,
    as: {
      control: false,
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML heading element to render. Defaults to h1.',
    },
    children: {
      table: { disable: true },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Heading> = {
  ...headingDefault,
  render: ({ size }: Props) => (
    <>
      <Heading as="h1" size={size}>
        Heading 1
      </Heading>
      <Heading as="h2" size={size}>
        Heading 2
      </Heading>
      <Heading as="h3" size={size}>
        Heading 3
      </Heading>
      <Heading as="h4" size={size}>
        Heading 4
      </Heading>
      <Heading as="h5" size={size}>
        Heading 5
      </Heading>
      <Heading as="h6" size={size}>
        Heading 6
      </Heading>
    </>
  ),
};
