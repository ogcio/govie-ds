import type { StoryObj } from '@storybook/angular-vite';
import { footerSectionMeta, Default as defaultStory } from '@/atoms/storybook/FooterSection.meta';
import { GiFooterSection } from '@/footer/FooterSection';
import omit from 'lodash/omit';

const meta = {
  ...footerSectionMeta,
  argTypes: {
    ...omit(footerSectionMeta.argTypes, 'styles', 'className'),
    class: footerSectionMeta.argTypes.className,
    style: footerSectionMeta.argTypes.styles,
  },
  title: 'Layout/Footer/FooterSection',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
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
