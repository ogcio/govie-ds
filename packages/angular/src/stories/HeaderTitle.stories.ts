import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/HeaderTitle.meta';
import { GiHeaderTitle } from '@/header/HeaderTitle';
import { GiHeaderSection } from '@/header/HeaderSection';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderTitle',
  component: GiHeaderTitle,
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
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
