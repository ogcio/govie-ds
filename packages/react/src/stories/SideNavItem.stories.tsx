import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/SideNav/SideNav';
import SideNavItem from '@/SideNav/SideNavItem';
import * as buttonStories from '@/atoms/storybook/SideNavItemButton.meta';
import { importNext } from './helpers';
import omit from 'lodash/omit';

const meta = {
  ...buttonStories.sideNavItemButtonMeta,
  title: 'Navigation/SideNav/SideNavItem',
  component: SideNavItem,
  argTypes: {
    ...omit(buttonStories.sideNavItemButtonMeta.argTypes, 'styles'),
    style: buttonStories.sideNavItemButtonMeta.argTypes.styles,
    actions: {
      ...buttonStories.sideNavItemButtonMeta.argTypes.actions,
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
