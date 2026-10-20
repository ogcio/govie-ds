import type { StoryObj } from '@storybook/angular-vite';
import { footerLogoMeta, Default as defaultStory } from '@/atoms/storybook/FooterLogo.meta';
import { GiFooterLogo } from '@/footer/FooterLogo';
import { LogoGoldGreen } from '@/atoms/icons/logos';
import omit from 'lodash/omit';

const meta = {
  ...footerLogoMeta,
  argTypes: {
    ...omit(footerLogoMeta.argTypes, 'styles', 'className'),
    class: footerLogoMeta.argTypes.className,
    style: footerLogoMeta.argTypes.styles,
  },
  title: 'Layout/Footer/FooterLogo',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiFooterLogo, LogoGoldGreen],
    },
    template: `
      <gi-footer-logo
        [id]="id"
        [dataTestId]="dataTestId"
      >
        <gi-logo-gold-green size="181" label="Gov.ie Logo"></gi-logo-gold-green>
      </gi-footer-logo>
    `,
  }),
};
