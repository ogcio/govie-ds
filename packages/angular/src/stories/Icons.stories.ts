import _ from 'lodash';
import type { Meta, StoryObj } from '@storybook/angular';
import { iconsMeta, Default as iconsDefault, iconList } from '../atoms/storybook/Icons.meta';

const meta: Meta = {
  ...iconsMeta,
  title: 'Foundation/Icons',
};

export default meta;

export const Default: StoryObj = {
  ...iconsDefault,
  render: (props) => {
    return {
      props,
      moduleMetadata: {
        imports: _.map(_.flatMap(iconList), 'Component'),
      },
      template: `
        <div class="gi-flex gi-flex-col gi-gap-8">
          ${_.map(
            iconList,
            (icons, key) => `
            <div class="gi-flex gi-flex-col gi-gap-8">
              <h2 class="gi-text-lg gi-font-bold gi-mb-8 gi-underline gi-text-center">${_.startCase(key)}</h2>
              <div class="gi-flex gi-flex-wrap gi-gap-8">
                ${_.map(
                  icons,
                  ({ selector }) => `
                    <div class="gi-w-32 gi-flex gi-flex-col gi-items-center gi-gap-2">
                      <${selector}
                        [size]="size"
                        [color]="color"
                        [label]="label"
                        [className]="className"
                        dataTestId="${selector}"
                      ></${selector}>
                      <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">
                        ${selector.replace('gi-', '').replace('-icon', '')}
                      </span>
                    </div>`,
                ).join('')}
              </div>
            </div>
          `,
          ).join('')}
        </div>
    `,
    };
  },
};
