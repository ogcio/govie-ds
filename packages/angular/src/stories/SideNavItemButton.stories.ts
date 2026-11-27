import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import * as stories from '@/atoms/storybook/SideNavItemButton.meta';
import { MoreVerticalIcon } from '@/icons';
import { GiIconButton } from '@/IconButton';
import { GiSideNav } from '@/sidenav/SideNav';
import { GiSideNavActionDirective } from '@/sidenav/SideNavAction';
import { GiSideNavItemDirective } from '@/sidenav/SideNavItem';
import { GiSideNavButtonDirective, GiSideNavItemButton } from '@/sidenav/SideNavItemButton';

const meta: Meta = {
  ...stories.sideNavItemButtonMeta,
  title: 'Navigation/SideNav/SideNavItemButton',
  component: GiSideNavItemButton,
  args: {
    ...stories.sideNavItemButtonMeta.args,
    itemClick: fn(),
  },
  argTypes: {
    ...stories.sideNavItemButtonMeta.argTypes,
    itemClick: {
      control: false,
      description: 'Emits the native click event when the item button is activated.',
      table: { type: { summary: 'EventEmitter<MouseEvent>' } },
    },
    class: {
      control: false,
      description: 'Additional CSS classes applied to the item button.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description:
        'Inline styles applied to the item button. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'string | Record<string, string | number | null | undefined>' } },
    },
  },
  parameters: {
    ...stories.sideNavItemButtonMeta.parameters,
    docs: {
      ...stories.sideNavItemButtonMeta.parameters.docs,
      description: {
        component: `${stories.sideNavItemButtonMeta.parameters.docs.description.component}\n\nPlace the item text inside the tag. Mark a trailing action beside the item, for example a \`gi-icon-button\`, with \`ngProjectAs="[actions]"\`. To use your own \`button\`, use the \`giSideNavItem\` and \`giSideNavButton\` directives instead (see [Directive](#directive)).`,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const imports = [GiSideNav, GiSideNavItemButton];

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  play: async (context) => {
    await stories.Default.play(context);

    await context.step('itemClick emits when the item is clicked', async () => {
      await userEvent.click(within(context.canvasElement).getByTestId(context.args.dataTestId));
      expect(context.args.itemClick).toHaveBeenCalledOnce();
    });
  },
  render: (props) => ({
    props,
    moduleMetadata: { imports },
    template: `
      <gi-side-nav class="gi-max-w-xs" ariaLabel="Side navigation">
        <gi-side-nav-item-button
          [id]="id"
          [selected]="selected"
          [disabled]="disabled"
          [class]="class"
          [style]="style"
          [ariaCurrent]="ariaCurrent"
          [ariaLabel]="ariaLabel"
          [ariaHidden]="ariaHidden"
          [tabIndex]="tabIndex"
          [dataTestId]="dataTestId"
          (itemClick)="itemClick($event)"
        >
          Overview
        </gi-side-nav-item-button>
      </gi-side-nav>
    `,
  }),
};

export const Selected: Story = {
  ...stories.Selected,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports },
    template: `
      <gi-side-nav class="gi-max-w-xs" ariaLabel="Side navigation">
        <gi-side-nav-item-button
          [id]="id"
          [selected]="selected"
          [disabled]="disabled"
          [class]="class"
          [style]="style"
          [ariaCurrent]="ariaCurrent"
          [ariaLabel]="ariaLabel"
          [ariaHidden]="ariaHidden"
          [tabIndex]="tabIndex"
          [dataTestId]="dataTestId"
          (itemClick)="itemClick($event)"
        >
          Overview
        </gi-side-nav-item-button>
      </gi-side-nav>
    `,
  }),
};

export const Directive: Story = {
  tags: ['skip-playwright'],
  args: { itemClick: fn() },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Your own `button` with `giSideNavButton`, inside an `li` with `giSideNavItem`. `giSideNavButton` takes `selected` and `disabled`. Set `aria-current="page"` on the active item yourself, and add a trailing action as a sibling marked with `giSideNavAction`.',
      },
    },
  },
  render: (props) => ({
    props: { ...props, current: 'overview' },
    moduleMetadata: {
      imports: [
        GiSideNav,
        GiSideNavItemDirective,
        GiSideNavButtonDirective,
        GiSideNavActionDirective,
        GiIconButton,
        MoreVerticalIcon,
      ],
    },
    template: `
      <gi-side-nav class="gi-max-w-xs" ariaLabel="Side navigation">
        <li giSideNavItem>
          <button
            giSideNavButton
            [attr.aria-current]="current === 'overview' ? 'page' : null"
            (click)="current = 'overview'; itemClick($event)"
          >
            Overview
          </button>
        </li>
        <li giSideNavItem>
          <button
            giSideNavButton
            [attr.aria-current]="current === 'reports' ? 'page' : null"
            (click)="current = 'reports'; itemClick($event)"
          >
            Reports
          </button>
          <div giSideNavAction>
            <gi-icon-button variant="flat" appearance="dark" size="sm" ariaLabel="Reports action">
              <gi-more-vertical-icon />
            </gi-icon-button>
          </div>
        </li>
        <li giSideNavItem>
          <button giSideNavButton disabled>Archived</button>
        </li>
      </gi-side-nav>
    `,
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const overview = canvas.getByRole('button', { name: 'Overview' });
    const reports = canvas.getByRole('button', { name: 'Reports' });

    await step('the consumer buttons render as plain buttons', async () => {
      expect(overview).toHaveAttribute('type', 'button');
      expect(overview).toHaveAttribute('aria-current', 'page');
      expect(canvas.getByRole('button', { name: 'Archived' })).toBeDisabled();
    });

    await step('native click moves aria-current', async () => {
      await userEvent.click(reports);
      expect(args.itemClick).toHaveBeenCalledOnce();
      expect(reports).toHaveAttribute('aria-current', 'page');
      expect(overview).not.toHaveAttribute('aria-current');
    });

    await step('the action renders beside the button, outside it', async () => {
      const action = canvas.getByRole('button', { name: 'Reports action' });
      expect(reports).not.toContainElement(action);
      expect(action).toBeVisible();
    });
  },
};
