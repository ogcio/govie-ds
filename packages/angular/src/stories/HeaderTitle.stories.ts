import type { StoryObj } from '@storybook/angular-vite';
import { headerTitleMeta, Default as defaultStory } from '@/atoms/storybook/HeaderTitle.meta';
import { GiHeaderTitle } from '@/header/HeaderTitle';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...headerTitleMeta,
  title: 'Layout/Header/HeaderTitle',
  component: GiHeaderTitle,
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderTitle, GiHeaderSection],
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
