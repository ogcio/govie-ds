import omit from 'lodash/omit';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import * as stories from '@/atoms/storybook/SideNavHeading.meta';
import { GiSideNav } from '@/sidenav/SideNav';
import { GiSideNavHeading } from '@/sidenav/SideNavHeading';
import { GiSideNavItemButton } from '@/sidenav/SideNavItemButton';

const meta: Meta = {
  ...stories.sideNavHeadingMeta,
  title: 'Navigation/SideNav/SideNavHeading',
  component: GiSideNavHeading,
  argTypes: {
    children: { table: { disable: true } },
    ...omit(stories.sideNavHeadingMeta.argTypes, ['className']),
    class: {
      control: false,
      description: 'Additional CSS classes applied to the heading element.',
      table: { type: { summary: 'string' } },
    },
  },
  parameters: {
    ...stories.sideNavHeadingMeta.parameters,
    docs: {
      ...stories.sideNavHeadingMeta.parameters.docs,
      description: {
        component: `${stories.sideNavHeadingMeta.parameters.docs.description.component}\n\nPlace \`gi-side-nav-heading\` inside \`gi-side-nav\`, before the items it labels, with the heading text inside the tag.`,
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiSideNav, GiSideNavHeading, GiSideNavItemButton] },
    template: `
      <gi-side-nav class="gi-max-w-xs" ariaLabel="Side navigation">
        <gi-side-nav-heading [id]="id" [class]="class" [dataTestId]="dataTestId">Section heading</gi-side-nav-heading>
        <gi-side-nav-item-button>Overview</gi-side-nav-item-button>
        <gi-side-nav-item-button>Reports</gi-side-nav-item-button>
      </gi-side-nav>
    `,
  }),
};
