import type { ArgTypes, StoryContext, Renderer } from '@storybook/types';
import { within, expect } from 'storybook/test';
import type { IconProps } from '../icons/types';
import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import CheckCircle from '../icons/CheckCircle';
import Close from '../icons/Close';
import Error from '../icons/Error';
import FirstPage from '../icons/FirstPage';
import Info from '../icons/Info';
import KeyboardArrowDown from '../icons/KeyboardArrowDown';
import KeyboardArrowLeft from '../icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../icons/KeyboardArrowRight';
import KeyboardArrowUp from '../icons/KeyboardArrowUp';
import LastPage from '../icons/LastPage';
import Visibility from '../icons/Visibility';
import VisibilityOff from '../icons/VisibilityOff';
import Warning from '../icons/Warning';
export const iconList = [{
  Component: ArrowLeft,
  selector: 'arrow-left'
}, {
  Component: ArrowRight,
  selector: 'arrow-right'
}, {
  Component: CheckCircle,
  selector: 'check-circle'
}, {
  Component: Close,
  selector: 'close'
}, {
  Component: Error,
  selector: 'error'
}, {
  Component: FirstPage,
  selector: 'first-page'
}, {
  Component: Info,
  selector: 'info'
}, {
  Component: KeyboardArrowDown,
  selector: 'keyboard-arrow-down'
}, {
  Component: KeyboardArrowLeft,
  selector: 'keyboard-arrow-left'
}, {
  Component: KeyboardArrowRight,
  selector: 'keyboard-arrow-right'
}, {
  Component: KeyboardArrowUp,
  selector: 'keyboard-arrow-up'
}, {
  Component: LastPage,
  selector: 'last-page'
}, {
  Component: Visibility,
  selector: 'visibility'
}, {
  Component: VisibilityOff,
  selector: 'visibility-off'
}, {
  Component: Warning,
  selector: 'warning'
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
      selector
    } of iconList) {
      await step(`renders ${selector} icon`, async () => {
        expect(canvas.getByTestId(selector)).toBeInTheDocument();
      });
    }
  }
}