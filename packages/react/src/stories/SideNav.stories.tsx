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
import SideNavItemLink from '@/SideNav/SideNavItemLink';
import { IconButton } from '@/atoms';
import MoreVertical from '@/atoms/icons/MoreVertical';

const meta = {
  ...stories.sideNavMeta,
  title: 'Navigation/SideNav (alpha)',
  tags: ['!dev', '!autodocs', 'skip-playwright'], // exclude story until Storybook examples complete
};

export default meta;

type Story = StoryObj<typeof SideNav>;

/**
 * This is a DRAFT Storybook for the SideNav component. Implementation is still being finalised
 */

export const Default: Story = {
  ...stories.Default,
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
          }}
          label={
            <GiBox className="gi-flex gi-gap-1">
              <MailIcon />
              Inbox
            </GiBox>
          }
          actions={<Tag type="counter" text={'3'} />}
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

export const WithActions: Story = {
  ...stories.WithActions,
  render: function Render() {
    const [current, setCurrent] = useState('');
    const [inboxOpen, setInboxOpen] = useState(true);
    const [lastTriggered, setLastTriggered] = useState('none');
    return (
      <div>
        <p data-testid="last-triggered">{lastTriggered}</p>
        <SideNav dataTestId="sidenav-with-actions">
          <SideNavGroup
            open={inboxOpen}
            onClick={() => {
              setInboxOpen((open) => !open);
              setLastTriggered('inbox');
            }}
            label="Inbox"
            actions={
              <div className="gi-flex gi-items-center">
                <Tag text="3" type="counter" />
                <IconButton
                  variant="flat"
                  appearance="dark"
                  size="sm"
                  ariaLabel="Inbox action"
                  onClick={() => setLastTriggered('inbox-action')}
                >
                  <MoreVertical />
                </IconButton>
              </div>
            }
          >
            <SideNavItem>Primary</SideNavItem>
          </SideNavGroup>
          <SideNavItem
            selected={current === 'overview'}
            ariaCurrent={current === 'overview' ? 'page' : undefined}
            onClick={() => {
              setCurrent('overview');
              setLastTriggered('overview');
            }}
            actions={
              <IconButton
                variant="flat"
                appearance="dark"
                size="sm"
                ariaLabel="Overview action"
                onClick={() => setLastTriggered('overview-action')}
              >
                <MoreVertical />
              </IconButton>
            }
          >
            Overview
          </SideNavItem>
          <SideNavItemLink
            selected={current === 'homepage'}
            ariaCurrent={current === 'homepage' ? 'page' : undefined}
            href="#"
            onClick={() => {
              setCurrent('homepage');
              setLastTriggered('homepage');
            }}
            actions={
              <IconButton
                variant="flat"
                appearance="dark"
                size="sm"
                ariaLabel="Homepage action"
                onClick={() => setLastTriggered('homepage-action')}
              >
                <MoreVertical />
              </IconButton>
            }
          >
            Homepage
          </SideNavItemLink>
        </SideNav>
      </div>
    );
  },
};
