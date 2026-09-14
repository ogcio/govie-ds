import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import type { Props } from '../sidenav/SideNavHeading.lite';
import { boxMeta } from './Box.meta';
import { checker } from './utilities';

export const sideNavHeadingMeta = {
  tags: ['autodocs'] as string[],
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
          'Section label within a SideNav list. Use this to label and group similar `SideNavItem`, `SideNavItemLink`, and `SideNavGroup` siblings.',
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
