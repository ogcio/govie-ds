import type { StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/SideNav.meta';
import GiBox from '@/atoms/Box';
import MailIcon from '@/atoms/icons/Mail';
import MoreVerticalIcon from '@/atoms/icons/MoreVertical';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavHeading from '@/atoms/sidenav/SideNavHeading';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import { Tag } from '@/tag/tag';
import { useState } from 'react';
import SideNavGroup from '@/atoms/sidenav/SideNavGroup';
import SideNavItemLink from '@/atoms/sidenav/SideNavItemLink';
import { IconButton } from '@/icon-button/icon-button';

const meta = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  render: function Render() {
    const [current, setCurrent] = useState('overview');
    const [inboxOpen, setInboxOpen] = useState(true);
    const itemProps = (value: string) => ({
      value,
      ariaCurrent: current === value ? 'page' : ('false' as 'page' | 'false'),
      onClick: () => setCurrent(value),
    });

    return (
      <SideNav dataTestId="basic-nav">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavGroup
          value="inbox"
          open={inboxOpen}
          onClick={() => {
            setInboxOpen((open) => !open);
            setCurrent('inbox');
          }}
          ariaCurrent={current === 'inbox' ? 'page' : 'false'}
          label={
            <GiBox className="gi-flex gi-w-full gi-justify-between">
              <GiBox className="gi-flex gi-gap-1">
                <MailIcon />
                Inbox
              </GiBox>
              <Tag type="counter" text={'3'} />
            </GiBox>
          }
          actions={
            <IconButton size="sm" variant="flat" appearance="dark">
              <MoreVerticalIcon />
            </IconButton>
          }
        >
          <SideNavItem {...itemProps('primary')}>Primary</SideNavItem>
          <SideNavItem {...itemProps('social')}>Social</SideNavItem>
          <SideNavItem {...itemProps('promotions')}>Promotions</SideNavItem>
        </SideNavGroup>
        <SideNavHeading>Side Nav Heading</SideNavHeading>
        <SideNavItem {...itemProps('overview')} actions={<Tag text="3" type="counter" />}>
          Overview
        </SideNavItem>
        <SideNavItemLink ariaCurrent={globalThis.location.href.endsWith('#') ? 'page' : 'false'} href="#">
          Link
        </SideNavItemLink>
        <SideNavItem {...itemProps('reports')}>Reports</SideNavItem>
        <SideNavItem {...itemProps('settings')}>Settings</SideNavItem>
      </SideNav>
    );
  },
};
