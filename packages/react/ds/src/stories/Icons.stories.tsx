import type { Meta, StoryObj } from '@storybook/react-vite';
import map from 'lodash/map';
import type { IconProps } from '../atoms/icons';
import {
  iconsMeta,
  Default as iconsDefault,
  iconList,
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
      {map(iconList, ({ Component, name, selector }) => (
        <div
          key={selector}
          className="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2"
        >
          <Component {...props} size={48} dataTestId={selector} />
          <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};
