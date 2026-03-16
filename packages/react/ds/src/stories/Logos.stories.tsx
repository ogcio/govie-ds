import type { Meta, StoryObj } from '@storybook/react';
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
    <div className="gi-flex gi-flex-col gi-gap-8">
      <div className="gi-flex gi-flex-wrap gi-gap-8">
        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <LogoBlack {...props} />
          <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
            LogoBlack
          </span>
        </div>

        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <LogoGoldGreen {...props} />
          <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
            LogoGoldGreen
          </span>
        </div>

        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div className="gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
            <LogoWhite {...props} />
          </div>
          <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
            LogoWhite
          </span>
        </div>
      </div>

      <div className="gi-flex gi-flex-wrap gi-gap-8">
        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <LogoHarpBlack {...props} />
          <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
            LogoHarpBlack
          </span>
        </div>

        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div className="gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
            <LogoHarpWhite {...props} />
          </div>
          <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
            LogoHarpWhite
          </span>
        </div>
      </div>

      <div className="gi-flex gi-flex-wrap gi-gap-8">
        <div className="gi-flex gi-w-48 gi-flex-col gi-items-center gi-gap-3">
          <div className="gi-rounded gi-bg-color-surface-system-primary-default gi-p-1">
            <LogoGoldWhite {...props} />
          </div>
          <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
            LogoGoldWhite
          </span>
        </div>
      </div>
    </div>
  ),
};
