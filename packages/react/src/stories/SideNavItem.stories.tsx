import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import * as stories from '@/atoms/storybook/SideNavItem.meta';

const meta = {
  ...stories.sideNavItemMeta,
  title: 'Navigation/SideNav/SideNavItem',
  component: SideNavItem,
  argTypes: {
    ...stories.sideNavItemMeta.argTypes,
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
        component: `${stories.sideNavItemMeta.parameters.docs.description.component}\n\nThis is the recommended SideNavItem component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { SideNavItem } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof SideNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItem {...props}>{props.children}</SideNavItem>
    </SideNav>
  ),
};

export const Selected: Story = {
  ...stories.Selected,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItem {...props}>{props.children}</SideNavItem>
    </SideNav>
  ),
};
