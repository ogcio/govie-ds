import { within } from 'storybook/test';
import type { Props } from '../footer/FooterLogo.lite';
import { checker } from './utilities';
import argTypes from './argTypes';
import { boxMeta } from './Box.meta';
import type { Meta, Story } from './types';

const FOOTER_LOGO_TESTID = 'footer-logo';

export const meta = {
  title: 'Layout/Footer/FooterLogo',
  args: {
    dataTestId: FOOTER_LOGO_TESTID,
    id: 'footer-logo-id',
  },
  argTypes: {
    id: argTypes.id,
    dataTestId: boxMeta.argTypes.dataTestId,
  },
  parameters: {
    docs: {
      description: {
        component: 'Container for the Gov.ie logo within a footer layout.',
      },
    },
  },
} satisfies Meta<Props>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const footerLogo = checker(FOOTER_LOGO_TESTID, canvas, step);
    await footerLogo.is('div');
    await footerLogo.attributes({ id: args.id });
  },
} satisfies Story<Props>;
