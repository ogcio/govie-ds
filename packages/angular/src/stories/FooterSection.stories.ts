import type { StoryObj } from '@storybook/angular';
import { footerSectionMeta, Default as defaultStory } from '@/atoms/storybook/FooterSection.meta';
import { FooterSection } from '@/atoms';

const meta = {
  ...footerSectionMeta,
  title: 'Layout/Footer/FooterSection',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [FooterSection],
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
