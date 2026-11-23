import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, fn } from 'storybook/test';
import * as stories from '@/atoms/storybook/SideNavGroup.meta';
import { GiSideNav } from '@/sidenav/SideNav';
import { GiSideNavGroup } from '@/sidenav/SideNavGroup';
import { GiSideNavItemButton } from '@/sidenav/SideNavItemButton';

const meta: Meta = {
  ...stories.sideNavGroupMeta,
  title: 'Navigation/SideNav/SideNavGroup',
  component: GiSideNavGroup,
  args: {
    ...stories.sideNavGroupMeta.args,
    openChange: fn(),
  },
  argTypes: {
    ...stories.sideNavGroupMeta.argTypes,
    label: {
      control: 'text',
      description: 'Text of the group header button.',
      table: { type: { summary: 'string' } },
    },
    open: {
      ...stories.sideNavGroupMeta.argTypes.open,
      description:
        'Whether nested items are visible. Use `[(open)]`, or bind `[open]` and update it from `(openChange)`.',
    },
    openChange: {
      control: false,
      description:
        'Emits the requested open state (`!open`) when the header button is activated. Not emitted while `disabled`.',
      table: { type: { summary: 'EventEmitter<boolean>' } },
    },
    class: {
      control: false,
      description: 'Additional CSS classes applied to the group header button.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description:
        'Inline styles applied to the group header button. Use for truly dynamic values that cannot be expressed as Tailwind classes.',
      table: { type: { summary: 'string | Record<string, string | number | null | undefined>' } },
    },
  },
  parameters: {
    ...stories.sideNavGroupMeta.parameters,
    docs: {
      ...stories.sideNavGroupMeta.parameters.docs,
      description: {
        component: `${stories.sideNavGroupMeta.parameters.docs.description.component}\n\nPlace \`gi-side-nav-item-button\` and \`gi-side-nav-item-link\` entries inside the tag. For a header with more than plain text, such as an icon or a counter, mark that content with \`ngProjectAs="[label]"\` instead of setting \`label\`. Mark a trailing action beside the header, for example a \`gi-icon-button\`, with \`ngProjectAs="[actions]"\`.`,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const imports = [GiSideNav, GiSideNavGroup, GiSideNavItemButton];

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports },
    template: `
      <gi-side-nav class="gi-max-w-xs" ariaLabel="Side navigation">
        <gi-side-nav-group
          [open]="open"
          (openChange)="openChange($event)"
          [label]="label"
          [disabled]="disabled"
          [id]="id"
          [class]="class"
          [style]="style"
          [ariaLabel]="ariaLabel"
          [ariaControls]="ariaControls"
          [ariaHidden]="ariaHidden"
          [tabIndex]="tabIndex"
          [dataTestId]="dataTestId"
        >
          <gi-side-nav-item-button>Primary</gi-side-nav-item-button>
          <gi-side-nav-item-button>Social</gi-side-nav-item-button>
        </gi-side-nav-group>
      </gi-side-nav>
    `,
  }),
};

export const ControlledOpen: Story = {
  ...stories.ControlledOpen,
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story: 'Group that starts open. Activating the header hides and then shows its items.',
      },
    },
  },
  render: (props) => ({
    props,
    moduleMetadata: { imports },
    template: `
      <gi-side-nav class="gi-max-w-xs" ariaLabel="Side navigation">
        <gi-side-nav-group
          [label]="label"
          [disabled]="disabled"
          [id]="id"
          [class]="class"
          [style]="style"
          [ariaLabel]="ariaLabel"
          [ariaControls]="ariaControls"
          [ariaHidden]="ariaHidden"
          [tabIndex]="tabIndex"
          [dataTestId]="dataTestId"
          [open]="open"
          (openChange)="open = $event; openChange($event)"
        >
          <gi-side-nav-item-button>Primary</gi-side-nav-item-button>
          <gi-side-nav-item-button>Social</gi-side-nav-item-button>
        </gi-side-nav-group>
      </gi-side-nav>
    `,
  }),
  play: async (context) => {
    await stories.ControlledOpen.play(context);

    await context.step('openChange emits the requested state on each toggle', async () => {
      expect(context.args.openChange).toHaveBeenNthCalledWith(1, false);
      expect(context.args.openChange).toHaveBeenNthCalledWith(2, true);
    });
  },
};
