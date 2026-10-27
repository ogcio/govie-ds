import type { StoryContext, Renderer } from 'storybook/internal/types';
import { expect, within } from 'storybook/test';
import { Size } from '../constants';
import { boxMeta } from './Box.meta';
import { enumType } from './utilities';

export const meta = {
  tags: ['autodocs'] as string[],
  title: 'Layout/Header/HeaderNavItem',
  args: {
    children: 'Search',
    visible: undefined,
    className: undefined,
  },
  argTypes: {
    visible: {
      ...enumType(Size, {
        description:
          'Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`.',
      }),
      control: 'select',
    },
    className: boxMeta.argTypes.className,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Header navigation item. Controls responsive visibility and holds a `HeaderNavItemButton` or a `HeaderNavItemLink`.',
      },
    },
  },
};

export const Default = {
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders a list item with its content', async () => {
      expect(canvas.getByRole('listitem')).toHaveTextContent(String(args.children));
    });
  },
};
