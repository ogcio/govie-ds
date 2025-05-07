import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
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

  const createSideNavItem = (item: SideNavItemProps) => {
    const itemId = `side-nav-${item.value}`;

    const sideNavItemWrapper = document.createElement('div');
    sideNavItemWrapper.role = 'group';
    sideNavItemWrapper.ariaLabel = `${item.label} ${item.expandable ? 'dropdown' : 'item'}`;

    const isNavigable = !!item.href;
    const clickable = isNavigable
      ? document.createElement('a')
      : document.createElement('button');

    clickable.className = 'gi-btn gi-side-nav-item';
    if (item.primary) {
      clickable.classList.add('gi-side-nav-item-primary');
    }
    if (item.secondary) {
      clickable.classList.add('gi-side-nav-item-secondary');
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

    if (item.primary && item.expandable) {
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

    if (item.expandable && item.children) {
      const contentWrapper = document.createElement('div');
      contentWrapper.className = item.open
        ? 'gi-side-nav-item-content'
        : 'gi-hidden';

      for (const child of item.children) {
        child.secondary = true;
        contentWrapper.append(createSideNavItem(child));
      }

      sideNavItemWrapper.append(contentWrapper);
    }

    return sideNavItemWrapper;
  };

  for (const item of _arguments.items) {
    item.primary = item.primary ?? true;
    container.append(createSideNavItem(item));
  }

  return beautifyHtmlNode(container);
};
export const Basic: Story = {
  args: {
    items: [
      { value: 'item-1', label: 'Overview', primary: true, selected: true },
      { value: 'item-2', label: 'Reports', primary: true },
      { value: 'item-3', label: 'Settings', primary: true },
    ],
  },
  render: (_arguments) => createSideNav(_arguments),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selected = canvas.getByRole('group', { name: /Overview item/i });
    expect(selected).toBeInTheDocument();
    expect(selected.querySelector('.gi-side-nav-item-selected')).toBeTruthy();
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        value: 'dashboard',
        label: 'Dashboard',
        icon: 'menu',
        primary: true,
        selected: true,
      },
      { value: 'analytics', label: 'Analytics', icon: 'apps', primary: true },
      { value: 'settings', label: 'Settings', icon: 'settings', primary: true },
    ],
  },
  render: (_arguments) => createSideNav(_arguments),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getAllByTestId('govie-icon')[0];
    expect(icon).toHaveTextContent('menu');
  },
};

export const ParentChild: Story = {
  args: {
    items: [
      {
        value: 'team',
        label: 'Team',
        primary: true,
        expandable: true,
        children: [
          { value: 'team-members', label: 'Members', secondary: true },
          { value: 'team-permissions', label: 'Permissions', secondary: true },
        ],
      },
      {
        value: 'projects',
        label: 'Projects',
        primary: true,
        expandable: true,
        children: [
          {
            value: 'projects-active',
            label: 'Active Projects',
            secondary: true,
          },
          {
            value: 'projects-archived',
            label: 'Archived Projects',
            secondary: true,
          },
        ],
      },
    ],
  },
  render: (_arguments) => createSideNav(_arguments),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parent = canvas.getByRole('group', { name: /Team dropdown/i });
    expect(parent).toBeInTheDocument();
    const child = within(parent).getByText('Members');
    expect(child).toBeInTheDocument();
  },
};

export const FullExample: Story = {
  args: {
    items: [
      { value: 'dashboard', label: 'Dashboard', icon: 'apps', primary: true },
      {
        primary: true,
        expandable: true,
        value: 'team',
        label: 'Team',
        children: [
          { value: 'team-members', label: 'Members', secondary: true },
          { value: 'team-permissions', label: 'Permissions', secondary: true },
        ],
      },
      {
        primary: true,
        expandable: true,
        open: true,
        value: 'projects',
        label: 'Projects',
        href: '#',
        children: [
          {
            value: 'projects-active',
            label: 'Active',
            href: '#',
            selected: true,
            secondary: true,
          },
          {
            href: '#',
            value: 'projects-archived',
            label: 'Archived',
            secondary: true,
          },
        ],
      },
      { value: 'settings', label: 'Settings', icon: 'settings', primary: true },
    ],
  },
  render: (_arguments) => createSideNav(_arguments),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const active = canvas.getByRole('group', { name: /Active item/i });
    expect(active.querySelector('.gi-side-nav-item-selected')).toBeTruthy();

    const projects = canvas.getByRole('group', { name: /Projects dropdown/i });
    expect(projects.querySelector('.gi-side-nav-expandable-icon')).toBeTruthy();
  },
};
