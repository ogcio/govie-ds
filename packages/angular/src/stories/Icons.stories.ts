import map from 'lodash/map';
import type { Meta, StoryObj } from '@storybook/angular';
import { iconsMeta, Default as iconsDefault, iconList } from '../atoms/storybook/Icons.meta';
import _ from 'lodash';

const meta: Meta = {
  ...iconsMeta,
  title: 'Foundation/Icons',
};

export default meta;

export const Default: StoryObj = {
  ...iconsDefault,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: map(iconList, 'Component'),
    },
    template: `
    <div class="gi-flex gi-flex-wrap gi-gap-8">
      ${map(
        iconList,
        ({ name, selector }) => `
      <div class="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
        <${selector}
          [size]="size"
          [color]="color"
          [label]="label"
          [className]="className"
          dataTestId="${selector}"
        ></${selector}>
        <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">${_.kebabCase(name)}</span>
      </div>`,
      ).join('')}
    </div>
    `,
  }),
};
