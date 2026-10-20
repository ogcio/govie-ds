import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/FooterLogo.meta';
import { GiFooterLogo } from '@/footer/FooterLogo';
import { LogoGoldGreen } from '@/atoms/icons/logos';
import omit from 'lodash/omit';

const meta = {
  ...stories.meta,
  argTypes: {
    ...omit(stories.meta.argTypes, 'styles', 'className'),
    class: stories.meta.argTypes.className,
    style: stories.meta.argTypes.styles,
  },
  title: 'Layout/Footer/FooterLogo',
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
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
