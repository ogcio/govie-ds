import type { StoryObj } from '@storybook/react-vite';
import * as stories from '@/atoms/storybook/SideNav.meta';
import GiBox from '@/atoms/Box';
import MailIcon from '@/atoms/icons/Mail';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavHeading from '@/atoms/sidenav/SideNavHeading';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import { Tag } from '@/tag/tag';
import { useState } from 'react';
import SideNavGroup from '@/atoms/sidenav/SideNavGroup';
import SideNavItemLink from '@/atoms/sidenav/SideNavItemLink';
import { IconButton } from '@/atoms';
import MoreVertical from '@/atoms/icons/MoreVertical';

const meta = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav (alpha)',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  ...stories.Default,
  tags: ['!dev', '!autodocs', 'skip-playwright'], // exclude story until Storybook examples complete
  render: function Render() {
    const [current, setCurrent] = useState('overview');
    const [inboxOpen, setInboxOpen] = useState(true);
    const itemProps = (value: string) => ({
      selected: value === current,
      onClick: () => setCurrent(value),
    });
    return (
      <SideNav dataTestId="basic-nav">
        <SideNavHeading>Messages</SideNavHeading>
        <SideNavGroup
          open={inboxOpen}
          onClick={() => {
            setInboxOpen((open) => !open);
            setCurrent('inbox');
          }}
          selected={current === 'inbox'}
          ariaCurrent={current === 'inbox' ? 'page' : 'false'}
          actions={
            <IconButton variant="flat" appearance="dark" size="sm" ariaLabel="More actions">
              <MoreVertical />
            </IconButton>
          }
          label={
            <GiBox className="gi-flex gi-w-full gi-justify-between">
              <GiBox className="gi-flex gi-gap-1">
                <MailIcon />
                Inbox
              </GiBox>
              <Tag type="counter" text={'3'} />
            </GiBox>
          }
        >
          <SideNavItem {...itemProps('primary')}>Primary</SideNavItem>
          <SideNavItem {...itemProps('social')}>Social</SideNavItem>
          <SideNavItem {...itemProps('promotions')} disabled>
            Promotions (disabled)
          </SideNavItem>
        </SideNavGroup>
        <SideNavHeading>Side Nav Heading</SideNavHeading>
        <SideNavItem {...itemProps('overview')}>Overview</SideNavItem>
        <SideNavItemLink {...itemProps('link')} href="#">
          Homepage
        </SideNavItemLink>
        <SideNavItem {...itemProps('reports')}>Reports</SideNavItem>
        <SideNavItem {...itemProps('settings')}>Settings</SideNavItem>
      </SideNav>
    );
  },
};
