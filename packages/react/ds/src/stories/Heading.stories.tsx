import type { Meta, StoryObj } from '@storybook/react';
import Heading, { Props } from '../Heading';
import {
  headingMeta,
  Default as headingDefault,
  AllHeadingLevels as headingAllLevels,
} from '../atoms/storybook/Heading.meta';

const meta: Meta<typeof Heading> = {
  ...headingMeta,
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    ...headingMeta.argTypes,
    as: {
      control: {
        type: 'select',
      },
      description: 'HTML heading element to render. Defaults to h1.',
    },
    children: {
      table: { disable: true },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Heading> = {
  args: {
    ...headingDefault.args,
    children: 'Heading',
    as: 'h1',
  },
};

export const AllHeadingLevels: StoryObj<typeof Heading> = {
  ...headingAllLevels,
  render: ({ size }: Props) => (
    <>
      <Heading as="h1" size={size} dataTestId="heading-1">
        Heading 1
      </Heading>
      <Heading as="h2" size={size} dataTestId="heading-2">
        Heading 2
      </Heading>
      <Heading as="h3" size={size} dataTestId="heading-3">
        Heading 3
      </Heading>
      <Heading as="h4" size={size} dataTestId="heading-4">
        Heading 4
      </Heading>
      <Heading as="h5" size={size} dataTestId="heading-5">
        Heading 5
      </Heading>
      <Heading as="h6" size={size} dataTestId="heading-6">
        Heading 6
      </Heading>
    </>
  ),
};
