import type { ArgTypes, StoryContext, Renderer } from '@storybook/types';
import { within, expect } from 'storybook/test';
import type { IconProps } from '../icons/types';
import ArrowLeft from '../icons/ArrowLeft.lite';
import ArrowRight from '../icons/ArrowRight.lite';
import CheckCircle from '../icons/CheckCircle.lite';
import Close from '../icons/Close.lite';
import Error from '../icons/Error.lite';
import FirstPage from '../icons/FirstPage.lite';
import Info from '../icons/Info.lite';
import KeyboardArrowDown from '../icons/KeyboardArrowDown.lite';
import KeyboardArrowLeft from '../icons/KeyboardArrowLeft.lite';
import KeyboardArrowRight from '../icons/KeyboardArrowRight.lite';
import KeyboardArrowUp from '../icons/KeyboardArrowUp.lite';
import LastPage from '../icons/LastPage.lite';
import Visibility from '../icons/Visibility.lite';
import VisibilityOff from '../icons/VisibilityOff.lite';
import Warning from '../icons/Warning.lite';

export const iconList = [
  { Component: ArrowLeft, name: 'ArrowLeft', selector: 'arrow-left' },
  { Component: ArrowRight, name: 'ArrowRight', selector: 'arrow-right' },
  { Component: CheckCircle, name: 'CheckCircle', selector: 'check-circle' },
  { Component: Close, name: 'Close', selector: 'close' },
  { Component: Error, name: 'Error', selector: 'error' },
  { Component: FirstPage, name: 'FirstPage', selector: 'first-page' },
  { Component: Info, name: 'Info', selector: 'info' },
  { Component: KeyboardArrowDown, name: 'KeyboardArrowDown', selector: 'keyboard-arrow-down' },
  { Component: KeyboardArrowLeft, name: 'KeyboardArrowLeft', selector: 'keyboard-arrow-left' },
  { Component: KeyboardArrowRight, name: 'KeyboardArrowRight', selector: 'keyboard-arrow-right' },
  { Component: KeyboardArrowUp, name: 'KeyboardArrowUp', selector: 'keyboard-arrow-up' },
  { Component: LastPage, name: 'LastPage', selector: 'last-page' },
  { Component: Visibility, name: 'Visibility', selector: 'visibility' },
  { Component: VisibilityOff, name: 'VisibilityOff', selector: 'visibility-off' },
  { Component: Warning, name: 'Warning', selector: 'warning' },
];

export const iconsMeta = {
  tags: ['autodocs'] as string[],
  title: 'Foundation/Icons',
  args: {
    size: 48,
    color: 'currentColor',
    label: '',
    className: '',
  },
  argTypes: {
    size: {
      control: 'number',
      description: 'Width and height of the icon in pixels.',
    },
    color: {
      control: 'color',
      description: 'Fill colour — defaults to `currentColor`.',
    },
    label: {
      control: 'text',
      description:
        'Accessible label. When set, renders `role="img"` and `aria-label`. When empty, the icon is hidden from assistive technology via `aria-hidden`.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names.',
    },
  } satisfies ArgTypes<IconProps>,
  parameters: {
    docs: {
      description: {
        component:
          'Use icons to visually reinforce actions, status, and navigation. Icons accept a `size` prop (in pixels), an optional `color`, and a `label` for accessibility.',
      },
    },
  },
};

export const Default = {
  args: iconsMeta.args,
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    for (const { selector } of iconList) {
      await step(`renders ${selector} icon`, async () => {
        expect(canvas.getByTestId(selector)).toBeInTheDocument();
      });
    }
  },
};
