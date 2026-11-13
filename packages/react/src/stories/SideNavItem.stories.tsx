import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/SideNav/SideNav';
import SideNavItem from '@/SideNav/SideNavItem';
import * as stories from '@/atoms/storybook/SideNavItem.meta';
import * as buttonStories from '@/atoms/storybook/SideNavItemButton.meta';
import { importNext } from './helpers';
import omit from 'lodash/omit';

const meta = {
  ...stories.sideNavItemMeta,
  args: { ...stories.sideNavItemMeta.args, ...buttonStories.sideNavItemButtonMeta.args },
  title: 'Navigation/SideNav/SideNavItem',
  component: SideNavItem,
  argTypes: {
    ...stories.sideNavItemMeta.argTypes,
    ...omit(buttonStories.sideNavItemButtonMeta.argTypes, 'styles'),
    style: buttonStories.sideNavItemButtonMeta.argTypes.styles,
    actions: {
      ...stories.sideNavItemMeta.argTypes.actions,
      table: { type: { summary: 'React.ReactNode' } },
    },
  },
  parameters: {
    ...stories.sideNavItemMeta.parameters,
    docs: {
      ...stories.sideNavItemMeta.parameters.docs,
      description: {
        component: `${stories.sideNavItemMeta.parameters.docs.description.component}${importNext('SideNavItem')}`,
      },
    },
  },
} satisfies Meta<typeof SideNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...buttonStories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItem {...props}>{props.children}</SideNavItem>
    </SideNav>
  ),
};

export const Selected: Story = {
  ...buttonStories.Selected,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItem {...props}>{props.children}</SideNavItem>
    </SideNav>
  ),
};
