import type { StoryObj } from '@storybook/angular';
import { footerLogoMeta, Default as defaultStory } from '@/atoms/storybook/FooterLogo.meta';
import { FooterLogo } from '@/atoms';
import { LogoGoldGreen } from '@/atoms/icons/logos';

const meta = {
  ...footerLogoMeta,
  title: 'Layout/Footer/FooterLogo',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [FooterLogo, LogoGoldGreen],
    },
    template: `
      <gi-footer-logo
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <logo-gold-green size="181" label="Gov.ie Logo"></logo-gold-green>
      </gi-footer-logo>
    `,
  }),
};
