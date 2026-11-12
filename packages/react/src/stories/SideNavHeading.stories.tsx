import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/SideNav/SideNav';
import SideNavHeading from '@/SideNav/SideNavHeading';
import SideNavItem from '@/SideNav/SideNavItem';
import * as stories from '@/atoms/storybook/SideNavHeading.meta';
import { importNext } from './helpers';
import omit from 'lodash/omit';

const meta = {
  ...stories.sideNavHeadingMeta,
  title: 'Navigation/SideNav/SideNavHeading',
  component: SideNavHeading,
  argTypes: {
    ...omit(stories.sideNavHeadingMeta.argTypes, 'styles'),
    style: stories.sideNavHeadingMeta.argTypes.styles,
  },
  parameters: {
    ...stories.sideNavHeadingMeta.parameters,
    docs: {
      ...stories.sideNavHeadingMeta.parameters.docs,
      description: {
        component: `${stories.sideNavHeadingMeta.parameters.docs.description.component}${importNext('SideNavHeading')}`,
      },
    },
  },
} satisfies Meta<typeof SideNavHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavHeading {...props}>{props.children}</SideNavHeading>
      <SideNavItem>Overview</SideNavItem>
      <SideNavItem>Reports</SideNavItem>
    </SideNav>
  ),
};
