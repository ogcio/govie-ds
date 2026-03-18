import type { Meta, StoryObj } from '@storybook/react';
import type { IconProps } from '../atoms/icons';
import {
  CheckCircle,
  Close,
  Error,
  Info,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  VisibilityOff,
  Warning,
} from '../atoms/icons';
import {
  iconsMeta,
  Default as iconsDefault,
  iconList,
} from '../atoms/storybook/Icons.meta';

const iconMap = {
  CheckCircle,
  Close,
  Error,
  Info,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  VisibilityOff,
  Warning,
} as const;

const meta: Meta = {
  ...iconsMeta,
  title: 'Foundation/Icons',
};

export default meta;

export const Default: StoryObj = {
  ...iconsDefault,
  render: (props: IconProps) => (
    <div className="gi-flex gi-flex-wrap gi-gap-8">
      {iconList.map(({ reactComponentName, testId }) => {
        const Icon = iconMap[reactComponentName as keyof typeof iconMap];

        return (
          <div
            key={testId}
            className="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2"
          >
            <Icon {...props} size={48} dataTestId={testId} />
            <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
              {reactComponentName}
            </span>
          </div>
        );
      })}
    </div>
  ),
};
