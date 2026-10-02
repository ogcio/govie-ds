import type { Meta, StoryObj } from '@storybook/react-vite';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavItemLink from '@/SideNav/SideNavItemLink';
import * as stories from '@/atoms/storybook/SideNavItemLink.meta';

const meta = {
  ...stories.sideNavItemLinkMeta,
  argTypes: {
    ...stories.sideNavItemLinkMeta.argTypes,
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
        component: `${stories.sideNavItemLinkMeta.parameters.docs.description.component}\n\nThis is the recommended SideNavItemLink component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { SideNavItemLink } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof SideNavItemLink>;

export default meta;
type Story = StoryObj<typeof SideNavItemLink>;

export const Default: Story = {
  ...stories.Default,
  tags: ['skip-playwright'],
  render: (props) => (
    <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
      <SideNavItemLink {...props}>{props.children}</SideNavItemLink>
    </SideNav>
  ),
};
