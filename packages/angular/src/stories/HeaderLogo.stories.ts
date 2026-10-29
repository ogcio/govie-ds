import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/HeaderLogo.meta';
import { GiHeaderLogo } from '@/header/HeaderLogo';
import { GiHeaderSection } from '@/header/HeaderSection';
import { LogoWhite } from '@/logos';

const meta = {
  ...stories.meta,
  title: 'Layout/Header/HeaderLogo',
  component: GiHeaderLogo,
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiHeaderLogo, GiHeaderSection, LogoWhite],
    },
    template: `
      <gi-header-section>
        <gi-header-logo
          [id]="id"
          [dataTestId]="dataTestId"
        >
          <gi-logo-white />
        </gi-header-logo>
      </gi-header-section>
    `,
  }),
};
