import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import type { Props } from '../sidenav/SideNavHeading.lite';
import { boxMeta } from './Box.meta';
import { checker } from './utilities';

export const sideNavHeadingMeta = {
  title: 'Navigation/SideNav/SideNavHeading',
  args: {
    children: 'Section heading',
    id: 'side-nav-heading-id',
    dataTestId: 'side-nav-heading',
  },
  argTypes: {
    className: boxMeta.argTypes.className,
    id: boxMeta.argTypes.id,
    dataTestId: boxMeta.argTypes.dataTestId,
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component:
          'Non-interactive heading that labels the items following it in a SideNav list. It is a visual separator between sibling `SideNavItem`, `SideNavItemLink` and `SideNavGroup` entries, not a container: use `SideNavGroup` to nest items.',
      },
    },
  },
};

export const Default = {
  args: sideNavHeadingMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('h5');
    await check.attributes({ id: args.id });
    await check.children();
  },
};
