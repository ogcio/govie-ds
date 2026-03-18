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
    <div class="gi-flex gi-flex-col gi-gap-10">
      <div class="gi-flex gi-flex-wrap gi-gap-8">
        <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div class="gi-flex gi-min-h-16 gi-items-center gi-justify-center">
            <logo-black [label]="label" dataTestId="logo-black"></logo-black>
          </div>
          <span class="gi-min-h-6 gi-text-sm gi-text-center">logo-black</span>
        </div>

        <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div class="gi-flex gi-min-h-16 gi-items-center gi-justify-center">
            <logo-gold-green [label]="label" dataTestId="logo-gold-green"></logo-gold-green>
          </div>
          <span class="gi-min-h-6 gi-text-sm gi-text-center">logo-gold-green</span>
        </div>

        <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div class="gi-flex gi-min-h-16 gi-items-center gi-justify-center gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
            <logo-white [label]="label" dataTestId="logo-white"></logo-white>
          </div>
          <span class="gi-min-h-6 gi-text-sm gi-text-center">logo-white</span>
        </div>
      </div>

      <div class="gi-border-t gi-border-color-border-subtle"></div>

      <div class="gi-flex gi-flex-wrap gi-gap-8">
        <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div class="gi-flex gi-min-h-16 gi-items-center gi-justify-center gi-p-1">
            <logo-harp-black [label]="label" dataTestId="logo-harp-black"></logo-harp-black>
          </div>
          <span class="gi-min-h-6 gi-text-sm gi-text-center">logo-harp-black</span>
        </div>

        <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div class="gi-flex gi-min-h-16 gi-items-center gi-justify-center gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
            <logo-harp-white [label]="label" dataTestId="logo-harp-white"></logo-harp-white>
          </div>
          <span class="gi-min-h-6 gi-text-sm gi-text-center">logo-harp-white</span>
        </div>
      </div>

      <div class="gi-border-t gi-border-color-border-subtle"></div>

      <div class="gi-flex gi-flex-wrap gi-gap-8">
        <div class="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div class="gi-flex gi-min-h-16 gi-items-center gi-justify-center gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
            <logo-gold-white [label]="label" dataTestId="logo-gold-white"></logo-gold-white>
          </div>
          <span class="gi-min-h-6 gi-text-sm gi-text-center">logo-gold-white</span>
        </div>
      </div>
    </div>
    `,
  }),
};
