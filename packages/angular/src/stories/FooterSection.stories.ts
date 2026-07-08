import type { StoryObj } from '@storybook/angular';
import { footerSectionMeta, Default as defaultStory } from '@/atoms/storybook/FooterSection.meta';
import { FooterSection } from '@/atoms';
import Container from '@/atoms/Container';

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
      imports: [FooterSection, Container],
    },
    template: `
      <gi-footer-section
        [variant]="variant"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <gi-container>Footer section content wrapped in a Container</gi-container>
      </gi-footer-section>
    `,
  }),
};
