import type { Meta, StoryObj } from '@storybook/react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { SideNavItemProps, SideNavProps } from './types';

const meta: Meta<SideNavProps> = {
  title: 'Navigation/SideNav',
  parameters: {
    docs: {
      description: {
        component:
          'A collapsible side navigation component supporting parent/child relationships and single selected child at a time.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<SideNavProps>;

const createSideNav = (_arguments: SideNavProps) => {
  const container = document.createElement('div');
  container.className = 'gi-side-nav-container';

  const createSideNavItem = (item: SideNavItemProps, navId: string) => {
    const itemId = `${navId}-${item.value}`;

    const sideNavItemWrapper = document.createElement('div');
    sideNavItemWrapper.role = 'group';
    sideNavItemWrapper.ariaLabel = `${item.label} ${item.expandable ? 'dropdown' : 'item'}`;

    const isNavigable = !!item.href;
    const clickable = isNavigable
      ? document.createElement('a')
      : document.createElement('button');
    clickable.className = 'gi-btn gi-side-nav-item';
    if (item.parent) {
      clickable.classList.add('gi-side-nav-item-parent');
    }
    if (item.selected) {
      clickable.classList.add('gi-side-nav-item-selected');
    }
    clickable.id = itemId;

    if (isNavigable) {
      (clickable as HTMLAnchorElement).href = item.href || '#';
    } else {
      (clickable as HTMLButtonElement).type = 'button';
    }

    const left = document.createElement('div');
    left.className = 'gi-side-nav-item-left';

    if (item.icon) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'gi-side-nav-item-icon';

      const iconSpan = document.createElement('span');
      iconSpan.dataset.testid = 'govie-icon';
      iconSpan.role = 'presentation';
      iconSpan.className = 'gi-block material-symbols-outlined';
      iconSpan.style.fontSize = '24px';
      iconSpan.textContent = item.icon;

      iconDiv.append(iconSpan);
      left.append(iconDiv);
    }

    const labelDiv = document.createElement('div');
    labelDiv.className = 'gi-side-nav-item-label';

    const paragraph = document.createElement('p');
    paragraph.className = 'gi-paragraph-md gi-text-start gi-whitespace-normal';
    paragraph.textContent = item.label;

    labelDiv.append(paragraph);
    left.append(labelDiv);

    clickable.append(left);

    if (item.expandable) {
      const expandIconDiv = document.createElement('div');
      expandIconDiv.className = 'gi-side-nav-expandable-icon';

      const expandIcon = document.createElement('span');
      expandIcon.dataset.testid = 'govie-icon';
      expandIcon.role = 'presentation';
      expandIcon.className = 'gi-block material-symbols-outlined';
      if (item.open) {
        expandIcon.classList.add('gi-rotate-180');
      }
      expandIcon.style.fontSize = '24px';
      expandIcon.textContent = 'keyboard_arrow_down';

      expandIconDiv.append(expandIcon);
      clickable.append(expandIconDiv);
    }

    sideNavItemWrapper.append(clickable);

    if (item.expandable) {
      const contentWrapper = document.createElement('div');
      contentWrapper.className = item.open
        ? 'gi-side-nav-item-content'
        : 'gi-hidden';

      if (item.children) {
        for (const child of item.children) {
          contentWrapper.append(createSideNavItem(child, navId));
        }
      }

      sideNavItemWrapper.append(contentWrapper);
    }

    return sideNavItemWrapper;
  };

  const navId = `:r3:`;

  for (const item of _arguments.items) {
    container.append(createSideNavItem(item, navId));
  }

  return beautifyHtmlNode(container);
};

export const Basic: Story = {
  args: {
    items: [
      { value: 'item-1', label: 'Overview', parent: true, selected: true },
      { value: 'item-2', label: 'Reports', parent: true },
      { value: 'item-3', label: 'Settings', parent: true },
    ],
  },
  render: (_arguments) => createSideNav(_arguments),
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        value: 'dashboard',
        label: 'Dashboard',
        icon: 'menu',
        parent: true,
        selected: true,
      },
      { value: 'analytics', label: 'Analytics', icon: 'apps', parent: true },
      { value: 'settings', label: 'Settings', icon: 'settings', parent: true },
    ],
  },
  render: (_arguments) => createSideNav(_arguments),
};

export const ParentChild: Story = {
  args: {
    items: [
      {
        value: 'team',
        label: 'Team',
        parent: true,
        expandable: true,
        children: [
          { value: 'team-members', label: 'Members' },
          { value: 'team-permissions', label: 'Permissions' },
        ],
      },
      {
        value: 'projects',
        label: 'Projects',
        parent: true,
        expandable: true,
        children: [
          { value: 'projects-active', label: 'Active Projects' },
          { value: 'projects-archived', label: 'Archived Projects' },
        ],
      },
    ],
  },
  render: (_arguments) => createSideNav(_arguments),
};

export const FullExample: Story = {
  args: {
    items: [
      { value: 'dashboard', label: 'Dashboard', icon: 'apps' },
      {
        parent: true,
        expandable: true,
        icon: 'info',
        value: 'team',
        label: 'Team',
        children: [
          { value: 'team-members', label: 'Members' },
          { value: 'team-permissions', label: 'Permissions' },
        ],
      },
      {
        parent: true,
        expandable: true,
        open: true,
        value: 'projects',
        label: 'Projects',
        href: '#',
        icon: 'attach_file',
        children: [
          {
            value: 'projects-active',
            label: 'Active',
            href: '#',
            selected: true,
          },
          {
            href: '#',
            value: 'projects-archived',
            label: 'Archived',
          },
        ],
      },
      { value: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
  render: (_arguments) => createSideNav(_arguments),
};
