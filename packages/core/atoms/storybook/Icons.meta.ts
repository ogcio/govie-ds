import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import type { IconProps } from '../icons/types';
import * as icons from '../icons';
import _ from 'lodash';

export const iconList = _.values(icons).map((icon) => {
  return {
    Component: icon,
    name: icon.name,
    selector: 'gi-' + _.kebabCase(icon.name + '-icon'),
  };
});

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
          'Use icons to visually reinforce actions, status, and navigation. Icons accept a `size` prop (in pixels), an optional `color`, and a `label` for accessibility. In React, the icon is suffixed with `Icon`, and in Angular, the icon selector name is wrapped with `gi-<icon-name>-icon`.',
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
