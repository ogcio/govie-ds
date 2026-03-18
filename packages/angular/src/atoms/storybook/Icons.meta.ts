import type { ArgTypes, StoryContext, Renderer } from '@storybook/types';
import { within, expect } from 'storybook/test';
import type { IconProps } from '../icons/types';
export const iconList = [{
  reactComponentName: 'CheckCircle',
  angularSelector: 'check-circle',
  testId: 'check-circle'
}, {
  reactComponentName: 'Close',
  angularSelector: 'close',
  testId: 'close'
}, {
  reactComponentName: 'Error',
  angularSelector: 'error',
  testId: 'error'
}, {
  reactComponentName: 'Info',
  angularSelector: 'info',
  testId: 'info'
}, {
  reactComponentName: 'KeyboardArrowDown',
  angularSelector: 'keyboard-arrow-down',
  testId: 'keyboard-arrow-down'
}, {
  reactComponentName: 'KeyboardArrowUp',
  angularSelector: 'keyboard-arrow-up',
  testId: 'keyboard-arrow-up'
}, {
  reactComponentName: 'Visibility',
  angularSelector: 'visibility',
  testId: 'visibility'
}, {
  reactComponentName: 'VisibilityOff',
  angularSelector: 'visibility-off',
  testId: 'visibility-off'
}, {
  reactComponentName: 'Warning',
  angularSelector: 'warning',
  testId: 'warning'
}];
export const iconsMeta = {
  tags: ['autodocs'] as string[],
  title: 'Foundation/Icons',
  args: {
    size: 48,
    color: 'currentColor',
    label: '',
    className: ''
  },
  argTypes: {
    size: {
      control: 'number',
      description: 'Width and height of the icon in pixels.'
    },
    color: {
      control: 'color',
      description: 'Fill colour — defaults to `currentColor`.'
    },
    label: {
      control: 'text',
      description: 'Accessible label. When set, renders `role="img"` and `aria-label`. When empty, the icon is hidden from assistive technology via `aria-hidden`.'
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names.'
    }
  } satisfies ArgTypes<IconProps>,
  parameters: {
    docs: {
      description: {
        component: 'Use icons to visually reinforce actions, status, and navigation. Icons accept a `size` prop (in pixels), an optional `color`, and a `label` for accessibility.'
      }
    }
  }
};
export const Default = {
  args: iconsMeta.args,
  play: async ({
    canvasElement,
    step
  }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    for (const {
      testId
    } of iconList) {
      await step(`renders ${testId} icon`, async () => {
        expect(canvas.getByTestId(testId)).toBeInTheDocument();
      });
    }
  }
}