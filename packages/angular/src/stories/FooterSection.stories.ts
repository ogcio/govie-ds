import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/FooterSection.meta';
import argTypes from '@/atoms/storybook/argTypes';
import { GiFooterSection } from '@/footer/FooterSection';

const meta = {
  ...stories.meta,
  argTypes: {
    ...stories.meta.argTypes,
    class: {
      ...argTypes.class,
      description: 'Additional CSS classes, merged with the classes of the inner content container.',
    },
    style: argTypes.style,
  },
  title: 'Layout/Footer/FooterSection',
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiFooterSection],
    },
    template: `
      <gi-footer-section
        [variant]="variant"
        [maxWidth]="maxWidth"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        Footer section content
      </gi-footer-section>
    `,
  }),
};
