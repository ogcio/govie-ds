import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import {
  sideNavItemMeta,
  Default as defaultStory,
  Selected as selectedStory,
} from '@/atoms/storybook/SideNavItem.meta';

const meta = {
  ...sideNavItemMeta,
  title: 'Navigation/SideNav/SideNavItem',
  component: SideNavItem,
  parameters: {
    ...sideNavItemMeta.parameters,
    docs: {
      ...sideNavItemMeta.parameters.docs,
      description: {
        component: `${sideNavItemMeta.parameters.docs.description.component}\n\nThis is the recommended SideNavItem component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { SideNavItem } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof SideNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItem {...props}>{props.children}</SideNavItem>
    </SideNav>
  ),
};

export const Selected: Story = {
  ...selectedStory,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItem {...props}>{props.children}</SideNavItem>
    </SideNav>
  ),
};
