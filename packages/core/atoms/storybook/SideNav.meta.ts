import type { StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect, userEvent } from 'storybook/test';
import { checker } from './utilities';

export const sideNavMeta = {
  tags: ['autodocs'] as string[],
  title: 'Navigation/SideNav',
  argTypes: {
    value: {
      control: { disable: true },
      description: 'The initially selected item value. Controls which item shows the active state.',
      table: { category: 'SideNav', type: { summary: 'string' } },
    },
    onChange: {
      control: { disable: true },
      description: 'Callback fired when the selected item changes.',
      table: {
        category: 'SideNav',
        type: { summary: '(value: string) => void' },
      },
    },
    className: {
      control: { disable: true },
      description: 'Additional CSS class names.',
      table: { category: 'SideNav', type: { summary: 'string' } },
    },
    dataTestId: {
      control: { disable: true },
      description: 'Test id for automated tests.',
      table: { category: 'SideNav', type: { summary: 'string' } },
    },
    id: {
      control: { disable: true },
      description: 'HTML id attribute for the nav element.',
      table: { category: 'SideNav', type: { summary: 'string' } },
    },
    ariaLabel: {
      control: { disable: true },
      description: 'Accessible label for the nav landmark. Defaults to "Side navigation".',
      table: { category: 'SideNav', type: { summary: 'string' } },
    },
    itemValue: {
      name: 'value',
      control: { disable: true },
      description: 'Unique identifier for the item, used for selection and expand/collapse tracking.',
      table: { category: 'SideNavItem', type: { summary: 'string' } },
    },
    label: {
      control: { disable: true },
      description:
        'Text or composed ReactNode for the item content. When a string, auto-wraps in a Paragraph with `gi-flex-1`. When a ReactNode, rendered as-is (client controls layout).',
      table: { category: 'SideNavItem', type: { summary: 'ReactNode | string' } },
    },
    icon: {
      control: { disable: true },
      description:
        'Icon rendered before the label. Pass a ReactNode (e.g. `<MailIcon />`). String IconId values are deprecated.',
      table: {
        category: 'SideNavItem',
        type: { summary: 'ReactNode | IconId' },
      },
    },
    children: {
      control: { disable: true },
      description: 'Nested SideNavItem or SideNavHeading elements for expandable items.',
      table: { category: 'SideNavItem', type: { summary: 'ReactNode' } },
    },
    asChild: {
      control: { disable: true },
      description:
        'When true, the first child element (e.g. NextLink) replaces the default button/anchor. The child receives merged props (className, aria attributes, onClick).',
      table: { category: 'SideNavItem', type: { summary: 'boolean' } },
    },
    actions: {
      control: { disable: true },
      description: 'Interactive controls (e.g. IconButton with variant="flat") rendered as siblings to the button/link',
      table: { category: 'SideNavItem', type: { summary: 'ReactNode' } },
    },
    href: {
      control: { disable: true },
      description:
        'When provided, the item renders as an anchor element instead of a button. Ignored when `expandable` is true.',
      table: { category: 'SideNavItem', type: { summary: 'string' } },
    },
    primary: {
      control: { disable: true },
      description: 'Whether the item uses primary (top-level) styling. Auto-detected from nesting depth when not set.',
      table: { category: 'SideNavItem', type: { summary: 'boolean' } },
    },
    expandable: {
      control: { disable: true },
      description: 'Makes the item a collapsible parent with nested children.',
      table: { category: 'SideNavItem', type: { summary: 'boolean' } },
    },
    open: {
      control: { disable: true },
      description: 'Pre-opens the expandable section on mount.',
      table: { category: 'SideNavItem', type: { summary: 'boolean' } },
    },
    secondary: {
      control: { disable: true },
      description: 'Whether the heading uses secondary (indented) styling.',
      table: { category: 'SideNavHeading', type: { summary: 'boolean' } },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'SideNav is a composable navigation component. Use SideNavItem for each navigation entry with icon and label props. Nested SideNavItems go as children of expandable items. Use SideNavHeading for section headings.',
      },
    },
  },
};

export const Basic = {
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('basic-nav', canvas, step);

    await check.is('nav');
    await check.children();
    await check.attributes({ 'aria-label': 'Side navigation' });
    await step('renders list with three items', async () => {
      const items = canvas.getAllByRole('listitem');
      expect(items.length).toBe(3);
    });
    await step('all items are keyboard focusable', async () => {
      await userEvent.tab();
      const buttons = canvas.getAllByRole('button');
      expect(buttons[0]).toHaveFocus();
      await userEvent.tab();
      expect(buttons[1]).toHaveFocus();
      await userEvent.tab();
      expect(buttons[2]).toHaveFocus();
    });
  },
};

export const WithIcons = {
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('icons-nav', canvas, step);

    await check.is('nav');
    await step('renders SVG icons alongside labels', async () => {
      const buttons = canvas.getAllByRole('button');
      for (const button of buttons) {
        const svg = button.querySelector('svg');
        expect(svg).toBeInTheDocument();
      }
    });
    await step('renders label text for each item', async () => {
      expect(canvas.getByText('Dashboard')).toBeInTheDocument();
      expect(canvas.getByText('Analytics')).toBeInTheDocument();
      expect(canvas.getByText('Settings')).toBeInTheDocument();
    });
  },
};

export const ParentChild = {
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('parent-child-nav', canvas, step);

    await check.is('nav');
    await step('expandable items have aria-expanded', async () => {
      const buttons = canvas.getAllByRole('button');
      expect(buttons[0]).toHaveAttribute('aria-expanded');
    });
    await step('clicking expandable item toggles aria-expanded', async () => {
      const buttons = canvas.getAllByRole('button');
      const teamButton = buttons[0];
      expect(teamButton).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(teamButton);
      expect(teamButton).toHaveAttribute('aria-expanded', 'true');
    });
    await step('expanded group is a list', async () => {
      const lists = canvasElement.querySelectorAll('ul[aria-label]');
      expect(lists.length).toBeGreaterThan(0);
    });
    await step('expanded group has aria-controls link', async () => {
      const buttons = canvas.getAllByRole('button');
      const teamButton = buttons[0];
      const controlsId = teamButton.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      const panel = canvasElement.querySelector(`#${CSS.escape(controlsId as string)}`);
      expect(panel).toBeInTheDocument();
    });
  },
};

export const FullExample = {
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const check = checker('full-example-nav', canvas, step);

    await check.is('nav');
    await check.attributes({ 'aria-label': 'Side navigation' });
    await step('renders composable labels with icons and trailing content', async () => {
      expect(canvas.getByText('Inbox')).toBeInTheDocument();
      expect(canvas.getByText('5')).toBeInTheDocument();
      expect(canvas.getByText('Drafts')).toBeInTheDocument();
      expect(canvas.getByText('2')).toBeInTheDocument();
    });
    await step('renders section heading', async () => {
      expect(canvas.getByText('Workspace')).toBeInTheDocument();
    });
    await step('pre-opened expandable shows children', async () => {
      expect(canvas.getByText('Active')).toBeInTheDocument();
      expect(canvas.getByText('Archived')).toBeInTheDocument();
      expect(canvas.getByText('Completed')).toBeInTheDocument();
    });
    await step('project children render as anchors with href', async () => {
      const links = canvas.getAllByRole('link');
      const activeLink = links.find((link) => link.textContent?.includes('Active'));
      expect(activeLink).toHaveAttribute('href', '/projects/active');
      const archivedLink = links.find((link) => link.textContent?.includes('Archived'));
      expect(archivedLink).toHaveAttribute('href', '/projects/archived');
      const completedLink = links.find((link) => link.textContent?.includes('Completed'));
      expect(completedLink).toHaveAttribute('href', '/projects/completed');
    });
    await step('collapsed expandable hides children', async () => {
      const teamButton = canvas.getAllByRole('button').find((button) => button.textContent?.includes('Team'));
      expect(teamButton).toHaveAttribute('aria-expanded', 'false');
    });
    await step('selected item has aria-current="page"', async () => {
      const nav = canvas.getByTestId('full-example-nav');
      const currentItem = nav.querySelector('li[aria-current="page"]');
      expect(currentItem).toBeInTheDocument();
      const link = currentItem?.querySelector('a[href="/projects/active"]');
      expect(link).toBeInTheDocument();
    });
    await step('clicking collapsed expandable reveals children', async () => {
      const teamButton = canvas.getAllByRole('button').find((button) => button.textContent?.includes('Team'));
      expect(teamButton).toBeTruthy();
      await userEvent.click(teamButton!);
      expect(teamButton).toHaveAttribute('aria-expanded', 'true');
      expect(canvas.getByText('Members')).toBeInTheDocument();
      expect(canvas.getByText('Permissions')).toBeInTheDocument();
    });
    await step('actions buttons have accessible labels', async () => {
      expect(canvas.getByLabelText('Inbox options')).toBeInTheDocument();
      expect(canvas.getByLabelText('Drafts options')).toBeInTheDocument();
      expect(canvas.getByLabelText('Active options')).toBeInTheDocument();
    });
  },
};
