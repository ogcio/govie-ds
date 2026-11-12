import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/SideNav/SideNav';
import SideNavItemLink from '@/SideNav/SideNavItemLink';
import * as stories from '@/atoms/storybook/SideNavItemLink.meta';
import { importNext } from './helpers';
import omit from 'lodash/omit';

const meta = {
  ...stories.sideNavItemLinkMeta,
  argTypes: {
    ...omit(stories.sideNavItemLinkMeta.argTypes, 'styles'),
    style: stories.sideNavItemLinkMeta.argTypes.styles,
    asChild: {
      control: false,
      description:
        'When true, `SideNavItemLink` renders a Radix Slot instead of an anchor. The child element receives the styling classes. Useful for composing with framework routers like next/link.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    actions: {
      ...stories.sideNavItemLinkMeta.argTypes.actions,
      table: { type: { summary: 'React.ReactNode' } },
    },
  },
  title: 'Navigation/SideNav/SideNavItemLink',
  component: SideNavItemLink,
  parameters: {
    ...stories.sideNavItemLinkMeta.parameters,
    docs: {
      ...stories.sideNavItemLinkMeta.parameters.docs,
      description: {
        component: `${stories.sideNavItemLinkMeta.parameters.docs.description.component}${importNext('SideNavItemLink')}`,
      },
    },
  },
} satisfies Meta<typeof SideNavItemLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItemLink {...props}>{props.children}</SideNavItemLink>
    </SideNav>
  ),
};
