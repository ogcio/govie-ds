import type { StoryObj } from '@storybook/angular';
import { headerTitleMeta, Default as defaultStory } from '@/atoms/storybook/HeaderTitle.meta';
import { HeaderTitle, HeaderSection } from '@/atoms';

const meta = {
  ...headerTitleMeta,
  title: 'Layout/Header/HeaderTitle',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [HeaderTitle, HeaderSection],
    },
    template: `
      <gi-header-section>
        <gi-header-title
          [id]="id"
          [dataTestId]="dataTestId"
        >
          {{ children }}
        </gi-header-title>
      </gi-header-section>
    `,
  }),
};
