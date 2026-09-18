import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect, userEvent } from 'storybook/test';
import type { Props } from '../sidenav/SideNav.lite';
import { boxMeta } from './Box.meta';
import { checker } from './utilities';

export const sideNavMeta = {
  title: 'Navigation/SideNav',
  args: {
    dataTestId: 'basic-nav',
  },
  argTypes: {
    className: boxMeta.argTypes.className,
    styles: boxMeta.argTypes.styles,
    id: boxMeta.argTypes.id,
    dataTestId: boxMeta.argTypes.dataTestId,
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the nav landmark. Maps to `aria-label`.',
      table: { type: { summary: 'string' } },
    },
    ariaLabelledBy: {
      control: { disable: true },
      description:
        'Points to the id of an element that labels the nav. Preferred over `ariaLabel` when a visible heading exists. Maps to `aria-labelledby`.',
      table: { type: { summary: 'string' } },
    },
  } satisfies ArgTypes<Props>,
  parameters: {
    docs: {
      description: {
        component:
          'SideNav is a composable navigation landmark. Nest SideNavHeading, SideNavSection, and SideNavItem to build grouped, expandable side navigation.',
      },
    },
  },
};

export const Default = {
  args: sideNavMeta.args,
  play: async ({ canvasElement, step, args }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker(args.dataTestId, canvas, step);

    await check.is('nav');
    await check.children();
    await step('renders section headings', async () => {
      expect(canvas.getByText('Messages')).toBeInTheDocument();
      expect(canvas.getByText('Side Nav Heading')).toBeInTheDocument();
    });
    await step('renders open inbox section with children', async () => {
      expect(canvas.getByText('Inbox')).toBeVisible();
      expect(canvas.getByText('Primary')).toBeVisible();
      expect(canvas.getByText('Social')).toBeVisible();
      expect(canvas.getByText(/Promotions/)).toBeVisible();
    });
    await step('renders top-level items', async () => {
      expect(canvas.getByText('Overview')).toBeVisible();
      expect(canvas.getByText('Reports')).toBeVisible();
      expect(canvas.getByText('Settings')).toBeVisible();
    });
    await step('clicking inbox collapses its children', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /inbox/i }));
      expect(canvas.getByText('Primary')).not.toBeVisible();
      expect(canvas.getByText('Social')).not.toBeVisible();
      expect(canvas.getByText(/Promotions/)).not.toBeVisible();
    });
  },
};

export const WithActions = {
  args: {
    ...sideNavMeta.args,
    dataTestId: 'sidenav-with-actions',
  },
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);

    await step('renders action buttons on group, item, and link', async () => {
      expect(canvas.getByRole('button', { name: 'Inbox action' })).toBeVisible();
      expect(canvas.getByRole('button', { name: 'Overview action' })).toBeVisible();
      expect(canvas.getByRole('button', { name: 'Homepage action' })).toBeVisible();
    });

    await step('clicking the group action does not toggle the group', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Inbox action' }));
      expect(canvas.getByTestId('last-triggered')).toHaveTextContent('inbox-action');
      expect(canvas.getByText('Primary')).toBeVisible();
    });

    await step('clicking the item action does not select the item', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Overview action' }));
      expect(canvas.getByTestId('last-triggered')).toHaveTextContent('overview-action');
      expect(canvas.getByRole('button', { name: 'Overview' })).not.toHaveAttribute('aria-current', 'page');
    });

    await step('clicking the link action does not activate the link', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Homepage action' }));
      expect(canvas.getByTestId('last-triggered')).toHaveTextContent('homepage-action');
      expect(canvas.getByRole('link', { name: 'Homepage' })).not.toHaveAttribute('aria-current', 'page');
    });
  },
};
