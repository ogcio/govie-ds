import type { Meta, StoryObj } from '@storybook/react-vite';
import _ from 'lodash';
import type { IconProps } from '../atoms/icons';
import {
  iconsMeta,
  Default as iconsDefault,
  iconList,
} from '../atoms/storybook/Icons.meta';
import type { ComponentType } from 'react';

const meta: Meta = {
  ...iconsMeta,
  title: 'Foundation/Icons',
};

export default meta;

const navigationMatchers = ['Arrow', 'FirstPage', 'LastPage', 'SwapVertical'];
const socialIconNames = new Set([
  'Bluesky',
  'Facebook',
  'Instagram',
  'Linkedin',
  'Threads',
  'Tiktok',
  'X',
  'Youtube',
]);

type SortedIcons = {
  Base: typeof iconList;
  Navigation: typeof iconList;
  Social: typeof iconList;
};

export const Default: StoryObj = {
  ...iconsDefault,
  render: (props: IconProps) => {
    const sortedIcons = iconList.reduce(
      (acc, icon) => {
        console.log(icon.name);
        if (navigationMatchers.some((matcher) => icon.name.includes(matcher))) {
          acc.Navigation.push(icon);
        } else if (socialIconNames.has(icon.name)) {
          acc.Social.push(icon);
        } else {
          acc.Base.push(icon);
        }
        return acc;
      },
      {
        Base: [],
        Navigation: [],
        Social: [],
      } as SortedIcons,
    );

    return (
      <div className="gi-flex gi-flex-col gi-gap-8 ">
        {Object.entries(sortedIcons).map(([key, icons]) => (
          <div key={key} className="gi-border-b gi-pb-4">
            <h2 className="gi-text-lg gi-font-bold gi-mb-8 gi-underline gi-text-center">
              {key}
            </h2>
            <div className="gi-flex gi-flex-wrap gi-gap-8">
              {_.map(icons, (icon) => (
                <IconItem {...icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
const IconItem = ({
  Component,
  name,
  selector,
}: {
  Component: ComponentType<IconProps>;
  name: string;
  selector: string;
}) => {
  return (
    <div
      key={selector}
      className=" gi-w-32 gi-flex gi-flex-col gi-items-center gi-gap-2"
    >
      <Component size={48} dataTestId={selector} />
      <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};
