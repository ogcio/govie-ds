import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavGroup from '@/atoms/sidenav/SideNavGroup';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import * as stories from '@/atoms/storybook/SideNavGroup.meta';
import { importNext } from './helpers';

const meta = {
  ...stories.sideNavGroupMeta,
  title: 'Navigation/SideNav/SideNavGroup',
  component: SideNavGroup,
  argTypes: {
    ...stories.sideNavGroupMeta.argTypes,
    actions: {
      ...stories.sideNavGroupMeta.argTypes.actions,
      table: { type: { summary: 'React.ReactNode' } },
    },
    label: {
      ...stories.sideNavGroupMeta.argTypes.label,
      table: { type: { summary: 'React.ReactNode' } },
    },
  },
  parameters: {
    ...stories.sideNavGroupMeta.parameters,
    docs: {
      ...stories.sideNavGroupMeta.parameters.docs,
      description: {
        component: `${stories.sideNavGroupMeta.parameters.docs.description.component}${importNext('SideNavGroup')}`,
      },
    },
  },
} as Meta<typeof SideNavGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavGroup {...props}>
        <SideNavItem>Primary</SideNavItem>
        <SideNavItem>Social</SideNavItem>
      </SideNavGroup>
    </SideNav>
  ),
};

export const ControlledOpen: Story = {
  ...stories.ControlledOpen,
  tags: ['skip-playwright'],
  render: function Render(props) {
    const [open, setOpen] = useState(!!props.open);

    return (
      <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
        <SideNavGroup {...props} open={open} onClick={() => setOpen((value) => !value)}>
          <SideNavItem>Primary</SideNavItem>
          <SideNavItem>Social</SideNavItem>
        </SideNavGroup>
      </SideNav>
    );
  },
};
