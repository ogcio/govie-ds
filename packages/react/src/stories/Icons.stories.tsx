import type { Meta, StoryObj } from '@storybook/react-vite';
import _ from 'lodash';
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
  render: () => {
    return (
      <div className="gi-flex gi-flex-col gi-gap-8 ">
        {Object.entries(iconList).map(([key, icons]) => (
          <div key={key} className="gi-border-b gi-pb-4">
            <h2 className="gi-text-lg gi-font-bold gi-mb-8 gi-underline gi-text-center">
              {_.startCase(key)}
            </h2>
            <div className="gi-flex gi-flex-wrap gi-gap-8">
              {_.map(icons, ({ Component, selector, name }) => (
                <div className=" gi-w-32 gi-flex gi-flex-col gi-items-center gi-gap-2">
                  <Component size={48} dataTestId={selector} />
                  <span className="gi-text-xs gi-text-center gi-whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
