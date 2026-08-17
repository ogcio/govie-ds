import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within } from 'storybook/test';
import type { Props } from '../header/Header.lite';
import { boxMeta } from './Box.meta';
import { checker } from './utilities';

export const headerMeta = {
  tags: ['autodocs'] as string[],
  title: 'Navigation/Header',
  args: {
    children: 'Header content',
    className: undefined,
    styles: undefined,
    id: 'header-example',
    ariaLabel: 'Site header',
    ariaLabelledBy: undefined,
    dataTestId: undefined,
  },
  argTypes: {
    className: boxMeta.argTypes.className,
    styles: boxMeta.argTypes.styles,
    id: boxMeta.argTypes.id,
    dataTestId: boxMeta.argTypes.dataTestId,
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the header landmark. Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
    ariaLabelledBy: {
      control: { disable: true },
      description:
        'Points to the id of an element that labels the header. Preferred over `ariaLabel` when a visible heading exists. Maps to `aria-labelledby`.',
      table: { type: { summary: 'string' } },
    },
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component:
          'The Header is the persistent banner at the top of a government service. It identifies the service, carries primary navigation, and can include utility actions such as language switching, search, and sign out.\n\nThis Header is assembled from smaller atoms rather than a single monolithic component. `Header` renders the semantic `<header>` landmark. Nest `HeaderSection` bands for the utility bar and primary row, then add `HeaderLogo`, `HeaderTitle`, `HeaderNav`, and nav items (`HeaderNavItem`, `HeaderNavItemLink`, `HeaderNavItemSeparator`) to build the layout your service needs. Each piece can be used on its own or composed together.',
      },
    },
  },
};

export const Default = {
  args: {
    ...headerMeta.args,
    dataTestId: 'header-default',
  },
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('header');
    await check.attributes({ 'aria-label': args.ariaLabel });
    await check.children();
  },
};
