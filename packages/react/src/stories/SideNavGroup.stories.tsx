import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SideNav from '@/atoms/sidenav/SideNav';
import SideNavGroup from '@/atoms/sidenav/SideNavGroup';
import SideNavItem from '@/atoms/sidenav/SideNavItem';
import { sideNavGroupMeta, Default as defaultStory, Open as openStory } from '@/atoms/storybook/SideNavGroup.meta';

const meta = {
  ...sideNavGroupMeta,
  title: 'Navigation/SideNav/SideNavGroup',
  component: SideNavGroup,
  parameters: {
    ...sideNavGroupMeta.parameters,
    docs: {
      ...sideNavGroupMeta.parameters.docs,
      description: {
        component: `${sideNavGroupMeta.parameters.docs.description.component}\n\nThis is the recommended SideNavGroup component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { SideNavGroup } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof SideNavGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  tags: ['skip-playwright'],
  render: function Render(props) {
    const [open, setOpen] = useState(!!props.open);

    return (
      <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
        <SideNavGroup {...props} open={open} onClick={() => setOpen((value) => !value)}>
          <SideNavItem>Primary</SideNavItem>
          <SideNavItem>Social</SideNavItem>
        </SideNavGroup>
      </SideNav>
    );
  },
};

export const Open: Story = {
  ...openStory,
  tags: ['skip-playwright'],
  render: function Render(props) {
    const [open, setOpen] = useState(props.open ?? true);

    return (
      <SideNav className="gi-max-w-xs" ariaLabel="Side navigation">
        <SideNavGroup {...props} open={open} onClick={() => setOpen((value) => !value)}>
          <SideNavItem>Primary</SideNavItem>
          <SideNavItem>Social</SideNavItem>
        </SideNavGroup>
      </SideNav>
    );
  },
};
