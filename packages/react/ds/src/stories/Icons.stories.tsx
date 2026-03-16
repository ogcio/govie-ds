import type { Meta, StoryObj } from '@storybook/react';
import {
  Close,
  IconProps,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  VisibilityOff,
} from '../atoms/icons';
import {
  iconsMeta,
  Default as iconsDefault,
} from '../atoms/storybook/Icons.meta';

const meta: Meta = {
  ...iconsMeta,
  title: 'Foundation/Icons',
};

export default meta;

export const Default: StoryObj = {
  ...iconsDefault,
  render: (props: IconProps) => (
    <div className="gi-flex gi-flex-wrap gi-gap-8">
      <div className="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
        <Close {...props} size={48} />
        <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
          Close
        </span>
      </div>

      <div className="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
        <Visibility {...props} size={48} />
        <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
          Visibility
        </span>
      </div>

      <div className="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
        <VisibilityOff {...props} size={48} />
        <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
          VisibilityOff
        </span>
      </div>

      <div className="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
        <KeyboardArrowDown {...props} size={48} />
        <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
          KeyboardArrowDown
        </span>
      </div>

      <div className="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
        <KeyboardArrowUp {...props} size={48} />
        <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
          KeyboardArrowUp
        </span>
      </div>
    </div>
  ),
};
