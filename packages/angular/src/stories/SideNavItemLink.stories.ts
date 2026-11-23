import omit from 'lodash/omit';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import * as stories from '@/atoms/storybook/SideNavItemLink.meta';
import { MoreVerticalIcon } from '@/icons';
import { GiIconButton } from '@/IconButton';
import { GiSideNav } from '@/sidenav/SideNav';
import { GiSideNavActionDirective } from '@/sidenav/SideNavAction';
import { GiSideNavItemDirective } from '@/sidenav/SideNavItem';
import { GiSideNavItemLink, GiSideNavLinkDirective } from '@/sidenav/SideNavItemLink';
import { withRouter } from '@/stories/router';

const meta: Meta = {
  ...stories.sideNavItemLinkMeta,
  title: 'Navigation/SideNav/SideNavItemLink',
  component: GiSideNavItemLink,
  args: {
    ...stories.sideNavItemLinkMeta.args,
    // preventDefault stops the click navigating the Storybook iframe
    itemClick: fn((event: MouseEvent) => event.preventDefault()),
  },
  argTypes: {
    ...omit(stories.sideNavItemLinkMeta.argTypes, ['className', 'styles']),
    itemClick: {
      control: false,
      description: 'Emits the native click event when the link is activated.',
      table: { type: { summary: 'EventEmitter<MouseEvent>' } },
    },
    class: {
      control: false,
      description: 'Additional CSS classes applied to the anchor element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description:
        'Inline styles applied to the anchor element. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'string | Record<string, string | number | null | undefined>' } },
    },
  },
  parameters: {
    ...stories.sideNavItemLinkMeta.parameters,
    docs: {
      ...stories.sideNavItemLinkMeta.parameters.docs,
      description: {
        component: `${stories.sideNavItemLinkMeta.parameters.docs.description.component}\n\nPlace the link text inside the tag. Mark a trailing action beside the link, for example a \`gi-icon-button\`, with \`ngProjectAs="[actions]"\`. To use your own anchor, for example with \`routerLink\`, use the \`giSideNavItem\` and \`giSideNavLink\` directives instead (see [Directive](#directive) and [With Router](#with-router)).`,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  play: async (context) => {
    await stories.Default.play(context);

    await context.step('itemClick emits when the link is clicked', async () => {
      await userEvent.click(within(context.canvasElement).getByTestId(context.args.dataTestId));
      expect(context.args.itemClick).toHaveBeenCalledOnce();
    });
  },
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiSideNav, GiSideNavItemLink] },
    template: `
      <gi-side-nav class="gi-max-w-xs" ariaLabel="Side navigation">
        <gi-side-nav-item-link
          [href]="href"
          [id]="id"
          [selected]="selected"
          [external]="external"
          [target]="target"
          [rel]="rel"
          [download]="download"
          [class]="class"
          [style]="style"
          [ariaCurrent]="ariaCurrent"
          [ariaLabel]="ariaLabel"
          [ariaLabelledBy]="ariaLabelledBy"
          [ariaDescribedBy]="ariaDescribedBy"
          [ariaHidden]="ariaHidden"
          [tabIndex]="tabIndex"
          [lang]="lang"
          [dataTestId]="dataTestId"
          (itemClick)="itemClick($event)"
        >
          Homepage
        </gi-side-nav-item-link>
      </gi-side-nav>
    `,
  }),
};

export const Directive: Story = {
  tags: ['skip-playwright'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Your own `a` with `giSideNavLink`, inside an `li` with `giSideNavItem`. Set `aria-current="page"` on the current link, and add a trailing action as a sibling marked with `giSideNavAction`.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [
        GiSideNav,
        GiSideNavItemDirective,
        GiSideNavLinkDirective,
        GiSideNavActionDirective,
        GiIconButton,
        MoreVerticalIcon,
      ],
    },
    template: `
      <gi-side-nav class="gi-max-w-xs" ariaLabel="Side navigation">
        <li giSideNavItem>
          <a giSideNavLink href="#" aria-current="page">Homepage</a>
        </li>
        <li giSideNavItem>
          <a giSideNavLink href="#">Services</a>
          <div giSideNavAction>
            <gi-icon-button variant="flat" appearance="dark" size="sm" ariaLabel="Services action">
              <gi-more-vertical-icon />
            </gi-icon-button>
          </div>
        </li>
        <li giSideNavItem>
          <a giSideNavLink href="#">Contact</a>
        </li>
      </gi-side-nav>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const services = canvas.getByRole('link', { name: 'Services' });

    await step('the consumer anchors render inside list items', async () => {
      for (const name of ['Homepage', 'Services', 'Contact']) {
        expect(canvas.getByRole('link', { name }).parentElement?.tagName).toBe('LI');
      }
    });

    await step('aria-current marks the current page', async () => {
      expect(canvas.getByRole('link', { current: 'page' })).toHaveAccessibleName('Homepage');
    });

    await step('the action renders beside the link, outside it', async () => {
      const action = canvas.getByRole('button', { name: 'Services action' });
      expect(services).not.toContainElement(action);
      expect(action).toBeVisible();
    });
  },
};

export const WithRouter: Story = {
  tags: ['skip-playwright'],
  decorators: [withRouter(['', 'overview', 'reports', 'settings'], { initialUrl: 'overview' })],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`giSideNavLink` works with the Angular router: put it on the same `a` as `routerLink`, inside an `li` marked with `giSideNavItem`. Add `routerLinkActive` with `ariaCurrentWhenActive="page"` so the router sets `aria-current="page"` on the active link.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: {
      imports: [GiSideNav, GiSideNavItemDirective, GiSideNavLinkDirective, RouterLink, RouterLinkActive],
    },
    template: `
      <gi-side-nav class="gi-max-w-xs" ariaLabel="Side navigation">
        <li giSideNavItem>
          <a giSideNavLink routerLink="/overview" routerLinkActive ariaCurrentWhenActive="page">Overview</a>
        </li>
        <li giSideNavItem>
          <a giSideNavLink routerLink="/reports" routerLinkActive ariaCurrentWhenActive="page">Reports</a>
        </li>
        <li giSideNavItem>
          <a giSideNavLink routerLink="/settings" routerLinkActive ariaCurrentWhenActive="page">Settings</a>
        </li>
      </gi-side-nav>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const overview = canvas.getByRole('link', { name: 'Overview' });
    const reports = canvas.getByRole('link', { name: 'Reports' });

    await step('the consumer anchors carry the router href', async () => {
      expect(overview).toHaveAttribute('href', '#/overview');
      expect(reports).toHaveAttribute('href', '#/reports');
    });

    await step('the initial route is current', async () => {
      await waitFor(() => expect(overview).toHaveAttribute('aria-current', 'page'));
    });

    await step('clicking navigates through the router and moves aria-current', async () => {
      await userEvent.click(reports);
      await waitFor(() => expect(reports).toHaveAttribute('aria-current', 'page'));
      expect(overview).not.toHaveAttribute('aria-current');
      expect(canvas.getAllByRole('link', { current: 'page' })).toHaveLength(1);
    });

    await step('pressing Enter on a focused link navigates and moves aria-current', async () => {
      const settings = canvas.getByRole('link', { name: 'Settings' });
      settings.focus();
      expect(settings).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(settings).toHaveAttribute('aria-current', 'page'));
      expect(canvas.getAllByRole('link', { current: 'page' })).toHaveLength(1);
    });
  },
};
