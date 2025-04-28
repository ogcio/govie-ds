import { Meta } from '@storybook/react';
import { SideNavItem } from './side-nav-item.js';
import { JSX } from 'react/jsx-runtime';
import { SideNavItemProps } from './types.js';
import { SideNav } from './side-nav.js';

const meta = {
  title: 'Navigation/SideNavItem',
  component: SideNavItem,
  parameters: {
    docs: {
      description: {
        component:
          'A collapsible side navigation item that toggles its content visibility.',
      },
    },
  },
} satisfies Meta<typeof SideNavItem>;

export default meta;

export const Default = {
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text for the SideNavItem button.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  render: (args: JSX.IntrinsicAttributes & SideNavItemProps) => (
    <SideNav>
      <SideNavItem {...args}>Navigation Item</SideNavItem>
    </SideNav>
  ),
};

export const WithCustomLabel = {
  render: () => (
    <SideNav>
      <SideNavItem>Custom Label</SideNavItem>
    </SideNav>
  ),
};
