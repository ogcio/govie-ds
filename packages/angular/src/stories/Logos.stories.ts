import type { Meta, StoryObj } from '@storybook/angular';
import LogoBlack from '../atoms/icons/logos/LogoBlack';
import LogoGoldGreen from '../atoms/icons/logos/LogoGoldGreen';
import LogoGoldWhite from '../atoms/icons/logos/LogoGoldWhite';
import LogoHarpBlack from '../atoms/icons/logos/LogoHarpBlack';
import LogoHarpWhite from '../atoms/icons/logos/LogoHarpWhite';
import LogoWhite from '../atoms/icons/logos/LogoWhite';
import {
  logosMeta,
  Default as logosDefault,
} from '../atoms/storybook/Logos.meta';

const meta: Meta = {
  ...logosMeta,
  title: 'Foundation/Logos',
};

export default meta;

export const Default: StoryObj = {
  ...logosDefault,
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [
        LogoBlack,
        LogoGoldGreen,
        LogoGoldWhite,
        LogoHarpBlack,
        LogoHarpWhite,
        LogoWhite,
      ],
    },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-8">
        <div class="gi-flex gi-flex-wrap gi-gap-8">
          <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
            <logo-black [label]="label"></logo-black>
            <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">logo-black</span>
          </div>

          <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
            <logo-gold-green [label]="label"></logo-gold-green>
            <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">logo-gold-green</span>
          </div>

          <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
            <div class="gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
              <logo-white [label]="label"></logo-white>
            </div>
            <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">logo-white</span>
          </div>
        </div>

        <div class="gi-flex gi-flex-wrap gi-gap-8">
          <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
            <logo-harp-black [label]="label"></logo-harp-black>
            <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">logo-harp-black</span>
          </div>

          <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
            <div class="gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
              <logo-harp-white [label]="label"></logo-harp-white>
            </div>
            <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">logo-harp-white</span>
          </div>
        </div>

        <div class="gi-flex gi-flex-wrap gi-gap-8">
          <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
            <div class="gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
              <logo-gold-white [label]="label"></logo-gold-white>
            </div>
            <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">logo-gold-white</span>
          </div>
        </div>
      </div>
    `,
  }),
};
