import type { StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/FooterLogo.meta';
import argTypes from '@/atoms/storybook/argTypes';
import { GiFooterLogo } from '@/footer/FooterLogo';
import { LogoGoldGreen } from '@/atoms/icons/logos';

const meta = {
  ...stories.meta,
  argTypes: {
    ...stories.meta.argTypes,
    class: argTypes.class,
    style: argTypes.style,
  },
  title: 'Layout/Footer/FooterLogo',
};

export default meta;

export const Default: StoryObj = {
  ...stories.Default,
  tags: ['skip-playwright'],
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
