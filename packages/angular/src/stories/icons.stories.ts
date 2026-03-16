import type { Meta, StoryObj } from '@storybook/angular';
import Close from '../atoms/icons/Close';
import KeyboardArrowDown from '../atoms/icons/KeyboardArrowDown';
import KeyboardArrowUp from '../atoms/icons/KeyboardArrowUp';
import Visibility from '../atoms/icons/Visibility';
import VisibilityOff from '../atoms/icons/VisibilityOff';

const meta: Meta<Close> = {
  title: 'Components/Icons',
  component: Close,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Close>;

export const Default: Story = {
  render: () => ({
    props: {},
    moduleMetadata: {
      imports: [
        Close,
        KeyboardArrowDown,
        KeyboardArrowUp,
        Visibility,
        VisibilityOff,
      ],
    },
    template: `
      <div class="gi-bg-gray-50 gi-p-8 gi-flex gi-flex-col gi-gap-16">

        <div class="gi-flex gi-gap-12">
          <div class="gi-flex gi-flex-col gi-gap-3 gi-min-w-48">
            <div class="gi-flex gi-items-center gi-gap-3">
              <span class="gi-flex gi-items-center gi-justify-center gi-w-6 gi-h-6 gi-shrink-0">
                <close [size]="24"></close>
              </span>
              <span class="gi-text-sm gi-text-gray-900">Close</span>
            </div>
            <div class="gi-flex gi-items-center gi-gap-3">
              <span class="gi-flex gi-items-center gi-justify-center gi-w-6 gi-h-6 gi-shrink-0">
                <visibility [size]="24"></visibility>
              </span>
              <span class="gi-text-sm gi-text-gray-900">Visibility</span>
            </div>
            <div class="gi-flex gi-items-center gi-gap-3">
              <span class="gi-flex gi-items-center gi-justify-center gi-w-6 gi-h-6 gi-shrink-0">
                <visibility-off [size]="24"></visibility-off>
              </span>
              <span class="gi-text-sm gi-text-gray-900">Visibility off</span>
            </div>
          </div>
        </div>

        <div class="gi-flex gi-gap-12">
          <div class="gi-flex gi-flex-col gi-gap-3 gi-min-w-48">
            <div class="gi-flex gi-items-center gi-gap-3">
              <span class="gi-flex gi-items-center gi-justify-center gi-w-6 gi-h-6 gi-shrink-0">
                <keyboard-arrow-down [size]="24"></keyboard-arrow-down>
              </span>
              <span class="gi-text-sm gi-text-gray-900">Keyboard arrow down</span>
            </div>
            <div class="gi-flex gi-items-center gi-gap-3">
              <span class="gi-flex gi-items-center gi-justify-center gi-w-6 gi-h-6 gi-shrink-0">
                <keyboard-arrow-up [size]="24"></keyboard-arrow-up>
              </span>
              <span class="gi-text-sm gi-text-gray-900">Keyboard arrow up</span>
            </div>
          </div>
        </div>

      </div>
    `,
  }),
};
