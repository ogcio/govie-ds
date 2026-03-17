import type { Meta, StoryObj } from '@storybook/angular';
import { Close, KeyboardArrowDown, KeyboardArrowUp, Visibility, VisibilityOff } from '../atoms/icons';
import { iconsMeta, Default as iconsDefault } from '../atoms/storybook/Icons.meta';

const meta: Meta = {
  ...iconsMeta,
  title: 'Foundation/Icons',
};

export default meta;
export const Default: StoryObj = {
  ...iconsDefault,
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [Close, KeyboardArrowDown, KeyboardArrowUp, Visibility, VisibilityOff],
    },
    template: `
      <div class="gi-flex gi-flex-wrap gi-gap-8">
        <div class="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
          <close [size]="size" [color]="color" [label]="label" [className]="className"></close>
          <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">close</span>
        </div>

        <div class="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
          <visibility [size]="size" [color]="color" [label]="label" [className]="className"></visibility>
          <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">visibility</span>
        </div>

        <div class="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
          <visibility-off [size]="size" [color]="color" [label]="label" [className]="className"></visibility-off>
          <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">visibility-off</span>
        </div>

        <div class="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
          <keyboard-arrow-down [size]="size" [color]="color" [label]="label" [className]="className"></keyboard-arrow-down>
          <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">keyboard-arrow-down</span>
        </div>

        <div class="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
          <keyboard-arrow-up [size]="size" [color]="color" [label]="label" [className]="className"></keyboard-arrow-up>
          <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">keyboard-arrow-up</span>
        </div>
      </div>
    `,
  }),
};
