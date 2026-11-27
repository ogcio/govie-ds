import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/SideNav/SideNav';
import SideNavItem from '@/SideNav/SideNavItem';
import * as buttonStories from '@/atoms/storybook/SideNavItemButton.meta';
import { importNext } from './helpers';
import argTypes from '@/atoms/storybook/argTypes';

const meta = {
  ...buttonStories.sideNavItemButtonMeta,
  title: 'Navigation/SideNav/SideNavItem',
  component: SideNavItem,
  argTypes: {
    ...buttonStories.sideNavItemButtonMeta.argTypes,
    className: argTypes.class,
    style: argTypes.style,
    actions: {
      control: { disable: true },
      description:
        'Content shown to the right of the item, for quick actions in its context (for example an `IconButton`).',
      table: { type: { summary: 'React.ReactNode' } },
    },
  },
  parameters: {
    ...buttonStories.sideNavItemButtonMeta.parameters,
    docs: {
      ...buttonStories.sideNavItemButtonMeta.parameters.docs,
      description: {
        component: `${buttonStories.sideNavItemButtonMeta.parameters.docs.description.component}\n\nPlace \`SideNavItem\` inside \`SideNav\` or \`SideNavGroup\`.${importNext('SideNavItem')}`,
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
      <SideNavItem {...props}>Overview</SideNavItem>
    </SideNav>
  ),
};

export const Selected: Story = {
  ...buttonStories.Selected,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItem {...props}>Overview</SideNavItem>
    </SideNav>
  ),
};
