import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/FooterSection.meta';
import { GiFooterSection } from '@/footer/FooterSection';
import omit from 'lodash/omit';

const meta = {
  ...stories.meta,
  argTypes: {
    ...omit(stories.meta.argTypes, 'styles', 'className'),
    class: stories.meta.argTypes.className,
    style: stories.meta.argTypes.styles,
  },
  title: 'Layout/Footer/FooterSection',
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
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
