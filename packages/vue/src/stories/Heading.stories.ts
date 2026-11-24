import type { Meta, StoryObj } from '@storybook/vue3-vite';
import omit from 'lodash/omit';
import * as stories from '../atoms/storybook/Heading.meta';
import { H1, H2, H3, H4, H5, H6 } from '../index';
import argTypes from '../atoms/storybook/argTypes';

const meta: Meta = {
  ...stories.headingMeta,
  title: 'Typography/Heading',
  component: H1,
  argTypes: {
    ...omit(stories.headingMeta.argTypes, ['dataTestId']),
    // Native attribute, passed through to the element.
    id: { table: { disable: true } },
    class: {
      ...argTypes.class,
      table: { type: { summary: 'string | object | array' } },
    },
    style: {
      ...argTypes.style,
      table: { type: { summary: 'string | object | array' } },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (args) => ({
    components: { H1 },
    setup: () => ({ args }),
    template: '<H1 :id="args.id" :size="args.size">Heading</H1>',
  }),
};

export const AllHeadingLevels: Story = {
  ...stories.AllHeadingLevels,
  render: () => ({
    components: { H1, H2, H3, H4, H5, H6 },
    template: `
      <div>
        <H1 data-testid="heading-1">Heading 1</H1>
        <H2 data-testid="heading-2">Heading 2</H2>
        <H3 data-testid="heading-3">Heading 3</H3>
        <H4 data-testid="heading-4">Heading 4</H4>
        <H5 data-testid="heading-5">Heading 5</H5>
        <H6 data-testid="heading-6">Heading 6</H6>
      </div>
    `,
  }),
};
