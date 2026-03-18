import type { Meta, StoryObj } from '@storybook/angular';
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
      imports: [
        CheckCircle,
        Close,
        Error,
        Info,
        KeyboardArrowDown,
        KeyboardArrowUp,
        Visibility,
        VisibilityOff,
        Warning,
      ],
    },
    template: `
    <div class="gi-flex gi-flex-wrap gi-gap-8">
      ${iconList
        .map(
          ({ angularSelector, testId }) => `
      <div class="gi-flex gi-w-32 gi-flex-col gi-items-center gi-gap-2">
        <${angularSelector}
          [size]="size"
          [color]="color"
          [label]="label"
          [className]="className"
          dataTestId="${testId}"
        ></${angularSelector}>
        <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">${angularSelector}</span>
      </div>`,
        )
        .join('')}
    </div>
    `,
  }),
};
