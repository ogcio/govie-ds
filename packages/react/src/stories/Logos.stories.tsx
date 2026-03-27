import type { Meta, StoryObj } from '@storybook/react-vite';
import { BaseSVGProps } from '../atoms';
import {
  LogoBlack,
  LogoGoldGreen,
  LogoGoldWhite,
  LogoHarpBlack,
  LogoHarpWhite,
  LogoWhite,
} from '../atoms/icons/logos';
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
  render: (props: BaseSVGProps) => (
    <div className="gi-flex gi-flex-col gi-gap-10">
      <div className="gi-flex gi-flex-wrap gi-gap-8">
        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div className="gi-flex gi-min-h-16 gi-items-center gi-justify-center">
            <LogoBlack {...props} dataTestId="logo-black" />
          </div>
          <span className="gi-min-h-6 gi-text-sm gi-text-center">
            LogoBlack
          </span>
        </div>

        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div className="gi-flex gi-min-h-16 gi-items-center gi-justify-center">
            <LogoGoldGreen {...props} dataTestId="logo-gold-green" />
          </div>
          <span className="gi-min-h-6 gi-text-sm gi-text-center">
            LogoGoldGreen
          </span>
        </div>

        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div className="gi-flex gi-min-h-16 gi-items-center gi-justify-center gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
            <LogoWhite {...props} dataTestId="logo-white" />
          </div>
          <span className="gi-min-h-6 gi-text-sm gi-text-center">
            LogoWhite
          </span>
        </div>
      </div>

      <div className="gi-border-t gi-border-color-border-subtle" />

      <div className="gi-flex gi-flex-wrap gi-gap-8">
        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div className="gi-flex gi-min-h-16 gi-items-center gi-justify-center gi-p-1">
            <LogoHarpBlack {...props} dataTestId="logo-harp-black" />
          </div>
          <span className="gi-min-h-6 gi-text-sm gi-text-center">
            LogoHarpBlack
          </span>
        </div>

        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div className="gi-flex gi-min-h-16 gi-items-center gi-justify-center gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
            <LogoHarpWhite {...props} dataTestId="logo-harp-white" />
          </div>
          <span className="gi-min-h-6 gi-text-sm gi-text-center">
            LogoHarpWhite
          </span>
        </div>
      </div>

      <div className="gi-border-t gi-border-color-border-subtle" />

      <div className="gi-flex gi-flex-wrap gi-gap-8">
        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div className="gi-flex gi-min-h-16 gi-items-center gi-justify-center gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
            <LogoGoldWhite {...props} dataTestId="logo-gold-white" />
          </div>
          <span className="gi-min-h-6 gi-text-sm gi-text-center">
            LogoGoldWhite
          </span>
        </div>
      </div>
    </div>
  ),
};
