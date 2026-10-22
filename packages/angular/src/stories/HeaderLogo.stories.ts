import type { StoryObj } from '@storybook/angular-vite';
import { headerLogoMeta, Default as defaultStory } from '@/atoms/storybook/HeaderLogo.meta';
import { GiHeaderLogo } from '@/header/HeaderLogo';
import { GiHeaderSection } from '@/header/HeaderSection';
import { LogoWhite } from '@/atoms/icons/logos';

const meta = {
  ...headerLogoMeta,
  title: 'Layout/Header/HeaderLogo',
  component: GiHeaderLogo,
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
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
