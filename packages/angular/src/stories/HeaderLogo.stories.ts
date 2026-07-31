import type { StoryObj } from '@storybook/angular';
import { headerLogoMeta, Default as defaultStory } from '@/atoms/storybook/HeaderLogo.meta';
import { HeaderLogo, HeaderSection } from '@/atoms';
import { LogoWhite } from '@/atoms/icons/logos';

const meta = {
  ...headerLogoMeta,
  title: 'Layout/Header/HeaderLogo',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [HeaderLogo, HeaderSection, LogoWhite],
    },
    template: `
      <gi-header-section>
        <gi-header-logo
          [id]="id"
          [dataTestId]="dataTestId"
        >
          <logo-white></logo-white>
        </gi-header-logo>
      </gi-header-section>
    `,
  }),
};
