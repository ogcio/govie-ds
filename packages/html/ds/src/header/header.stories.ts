import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { createIcon } from '../helpers/icons';
import { createDrawer } from '../helpers/modal';
import { beautifyHtmlNode } from '../storybook/storybook';
import { HeaderItem, HeaderProps } from './types';

const meta: Meta<HeaderProps> = {
  title: 'Layout/Header',
};

export default meta;
type Story = StoryObj<HeaderProps>;

const buildDefaultMobileMenu = (
  mobileMenuLabel: string,
  items: HeaderItem[],
  secondaryLinks: {
    href: string;
    label: string;
  }[],
) => {
  const mobileHeaderMenuItems = document.createElement('ul');

  for (const item of items) {
    if (item.itemType === 'link') {
      const li = document.createElement('li');

      const listItem = document.createElement('a');
      listItem.href = item.href!;
      listItem.className = 'gi-list-item';
      if (item.external) {
        listItem.target = '_blank';
        listItem.rel = 'noreferrer noopener';
      }

      const span = document.createElement('span');
      span.className = 'gi-text-sm gi-ml-1';
      span.textContent = item.label!;

      listItem.append(span);
      li.append(listItem);

      mobileHeaderMenuItems.append(li);
    }
  }

  const mobileMenu: HeaderItem = {
    label: mobileMenuLabel,
    icon: 'menu',
    itemType: 'slot',
    component: mobileHeaderMenuItems.outerHTML,
    slotAppearance: 'drawer',
    showItemMode: 'mobile-only',
  };

  return [mobileMenu, ...items];
};

const createHeader = (arguments_: HeaderProps) => {
  const items =
    (arguments_.addDefaultMobileMenu
      ? buildDefaultMobileMenu(
          arguments_.mobileMenuLabel || '',
          arguments_.items || [],
          arguments_.secondaryLinks || [],
        )
      : arguments_.items) || [];

  const containerClassName = arguments_.fullWidth
    ? 'gi-layout-container-full-width'
    : 'gi-layout-container';
  const headerClassNames = 'gi-header';
  const secondaryBarClassNames = 'gi-header-secondary-bar';
  const secondaryItemClassNames = 'gi-header-secondary-item';
  const menuContainerClassNames = 'gi-header-menu';
  const appTitleClassNames = 'gi-header-title';
  const toolItemClassNames = 'gi-header-tool-item';
  const menuDividerClassNames = 'gi-header-divider';

  const header = document.createElement('header');
  header.id = 'GovieHeader';
  header.className = headerClassNames;

  const container = document.createElement('div');
  container.className = `${containerClassName} gi-order-2`;
  header.append(container);

  const menuContainer = document.createElement('div');
  menuContainer.className = menuContainerClassNames;
  container.append(menuContainer);

  const wrapper1 = document.createElement('div');

  const logoWrapper = document.createElement('div');
  logoWrapper.className = 'gi-header-logo';

  const logo = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset =
    arguments_.logo?.imageLarge ||
    'https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov-of-ireland/harp-white.svg';
  source.media = '(min-width: 640px)';
  const img = document.createElement('img');
  img.src =
    arguments_.logo?.imageSmall ||
    'https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/harp/harp-white.svg';
  img.alt = arguments_.logo?.alt || 'Gov.ie logo';
  img.className = 'gi-h-10 sm:gi-h-14';
  logo.append(source);
  logo.append(img);

  if (arguments_.logo?.href) {
    const logoLink = document.createElement('a');
    logoLink.dataset.testid = 'logo-link';
    if (arguments_.logo.external) {
      logoLink.target = '_blank';
      logoLink.rel = 'noreferrer noopener';
    }
    logoLink.href = arguments_.logo.href;
    logoLink.append(logo);
    logoWrapper.append(logoLink);
  } else {
    logoWrapper.append(logo);
  }

  const titleWrapper = document.createElement('div');
  titleWrapper.className = `${appTitleClassNames} ${arguments_.showTitleOnMobile ? '' : 'gi-hidden'}`;
  if (arguments_.title) {
    titleWrapper.textContent = arguments_.title;
  }

  wrapper1.append(logoWrapper);
  wrapper1.append(titleWrapper);

  const wrapper2 = document.createElement('div');
  wrapper2.className = 'gi-gap-2 md:gi-gap-4';

  for (const [index, item] of items.entries()) {
    const menuItem = document.createElement('div');
    menuItem.className = 'gi-block';
    if (item.showItemMode === 'mobile-only') {
      menuItem.className = 'gi-block lg:gi-hidden';
    } else if (item.showItemMode === 'desktop-only') {
      menuItem.className = 'gi-hidden lg:gi-block';
    }
    wrapper2.append(menuItem);

    switch (item.itemType) {
      case 'link': {
        const link = document.createElement('a');
        link.className = toolItemClassNames;
        link.href = item.href || '#';
        link.textContent = item.label || '';
        if (item.icon) {
          const icon = createIcon({ icon: item.icon });
          link.append(icon);
        }
        if (item.external) {
          link.target = '_blank';
          link.rel = 'noreferrer noopener';
        }
        menuItem.append(link);
        break;
      }
      case 'slot': {
        if (item.slotAppearance === 'drawer') {
          const drawer = createDrawer({
            body: item.component || '',
            position: item.drawerPosition || 'right',
            startsOpen: false,
            isOpen: false,
            footer: '',
          });
          drawer.id = `Drawer-${index}`;
          header.append(drawer);
        }

        const label = document.createElement('label');
        label.className = toolItemClassNames;
        label.htmlFor = `ItemActionTrigger-${index}`;
        label.dataset.testid = `ItemActionTrigger-${index}`;
        label.ariaLabel = item.label || item.icon || 'menu';
        label.id = `ItemActionLabel-${index}`;

        const input = document.createElement('input');
        input.id = `ItemActionTrigger-${index}`;
        input.type = 'checkbox';
        input.dataset.index = `${index}`;

        if (item.slotAppearance === 'drawer') {
          const script = document.createElement('script');
          script.async = false;

          const scriptCode = `
          function toggleDrawer${index}() {
            const element = document.getElementById('Drawer-${index}');
            const elements = element.querySelectorAll('[data-element="modal"]');
            const modal = elements[0];
            modal.classList.add('gi-modal-open');
            modal.classList.remove('gi-modal-close');
            modal.setAttribute('aria-hidden', 'false');
          }
          setTimeout(() => {
            const label = document.getElementById('ItemActionLabel-${index}');
            label.addEventListener('click', function() { toggleDrawer${index}(); })
          }, 500);
          `;

          script.append(document.createTextNode(scriptCode));
          document.body.append(script);
        }

        const span = document.createElement('span');
        span.className = 'label';
        span.textContent = item.label || '';

        label.append(input);
        label.append(span);
        if (item.icon) {
          const icon = createIcon({ icon: item.icon });
          icon.id = `ItemIconActionTrigger-${index}`;
          label.append(icon);
        }
        const closeIcon = createIcon({ icon: 'close' });
        closeIcon.className = 'gi-hidden close-icon';
        closeIcon.id = `ItemCloseTrigger-${index}`;
        label.append(closeIcon);
        menuItem.append(label);

        break;
      }
      case 'divider': {
        const divider = document.createElement('div');
        divider.className = menuDividerClassNames;
        menuItem.append(divider);
        break;
      }
    }
  }

  menuContainer.append(wrapper1);
  menuContainer.append(wrapper2);

  if (arguments_.secondaryLinks) {
    const secondaryLinks = document.createElement('div');
    secondaryLinks.className = `${secondaryBarClassNames} gi-order-1`;
    header.append(secondaryLinks);

    const secondaryLinksContainer = document.createElement('div');
    secondaryLinksContainer.className = containerClassName;
    secondaryLinks.append(secondaryLinksContainer);

    const list = document.createElement('ul');
    secondaryLinksContainer.append(list);

    for (const link of arguments_.secondaryLinks) {
      const li = document.createElement('li');

      const secondaryLink = document.createElement('a');
      secondaryLink.href = link.href;
      secondaryLink.textContent = link.label;
      secondaryLink.className = secondaryItemClassNames;

      li.append(secondaryLink);
      list.append(li);
    }
  }

  return header;
};

const createElement = (arguments_: HeaderProps) => {
  const component = createHeader(arguments_);
  return beautifyHtmlNode(component);
};

const slotExample1 = () => `
  <ul class="gi-list-bullet" data-testid="govieList">
    <li>
      <a
        href="#"
        class="gi-link gi-link-sm"
      >
        Citizens Information - Services and Rights
      </a>
    </li>
    <li>
      <a
        href="#"
        class="gi-link gi-link-sm"
      >
        Revenue - Taxes and Payments
      </a>
    </li>
    <li>
      <a
        href="#"
        class="gi-link gi-link-sm"
      >
        Department of Social Protection
      </a>
    </li>
  </ul>
`;

const slotSearch = () => `
  <form class="gi-max-w-md gi-mx-auto">
    <h4 class="gi-heading-sm">Search the website</h4>
    <div class="gi-flex gi-items-end gi-mt-4">
      <div class="gi-text-input-container gi-flex-auto">
        <div class="gi-text-input-container">
          <input
            placeholder="Enter search term"
            id="search"
            type="text"
            data-testid="textbox"
            class="gi-border-gray-950 gi-w-full gi-text-input"
            name="search_query"
            aria-label="Search the website"
          />
        </div>
      </div>
      <button
        data-testid="govieButton-undefined-undefined-undefined-"
        class="gi-btn gi-btn-primary gi-btn-regular gi-ml-1 gi-flex-none"
      >
        Search
        <span
          data-testid="govie-icon"
          aria-label="Search"
          role="img"
          class="material-symbols-outlined gi-block"
          style="font-size: 24px; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;"
        >
          search
        </span>
      </button>
    </div>
  </form>
`;

const slotExample3 = () => `
  <select
    class="gi-select"
    id="slot-example-2"
    aria-label="slot-example-2"
  >
    <optgroup label="Languages">
      <option class="gi-select-option" value="gaeilge">Gaeilge</option>
      <option class="gi-select-option" value="english">English</option>
      <option class="gi-select-option" value="spanish">Spanish</option>
      <option class="gi-select-option" value="italian">Italian</option>
    </optgroup>
  </select>
`;

const headerProps: HeaderProps = {
  items: [
    {
      label: 'Departments',
      itemType: 'link',
      href: '#',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Services',
      itemType: 'link',
      href: '#',
      showItemMode: 'desktop-only',
    },
    {
      itemType: 'divider',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Faq',
      icon: 'info',
      itemType: 'slot',
      component: slotExample1(),
      slotAppearance: 'drawer',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Search',
      icon: 'search',
      itemType: 'slot',
      component: slotSearch(),
      slotAppearance: 'dropdown',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Languages',
      icon: 'mic',
      itemType: 'slot',
      component: slotExample3(),
      slotAppearance: 'dropdown',
      showItemMode: 'desktop-only',
    },
  ],
};

export const Default: Story = {
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the Header',
      table: {
        category: 'Header',
      },
    },
    logo: {
      control: 'object',
      description: 'The url and image for the logo',
      table: {
        category: 'Header',
      },
    },
    items: {
      control: 'object',
      description: 'Actionable items such as CTAs, links, slots, or dividers',
      table: {
        category: 'Header',
        type: {
          summary: 'HeaderItem[]',
        },
      },
    },
    secondaryLinks: {
      description: 'A list of secondary navigation links',
      table: {
        category: 'Header',
      },
    },
    addDefaultMobileMenu: {
      control: 'boolean',
      description:
        'If true, adds a default mobile menu to the header according with your "items" ',
      table: {
        category: 'Header',
      },
    },
    mobileMenuLabel: {
      control: 'text',
      description:
        'Change the mobile menu label when "addDefaultMobileMenu" is set',
      table: {
        category: 'Header',
      },
    },
    showTitleOnMobile: {
      control: 'boolean',
      description:
        'If true, the title will be shown on mobile, if false it will be hidden',
      table: {
        category: 'Header',
      },
    },
  },
  args: {
    logo: {
      href: '/link',
    },
    items: headerProps.items,
    addDefaultMobileMenu: true,
    mobileMenuLabel: 'Menu',
  },
  render: createElement,
};

export const DesktopDrawerDefaultMenu: Story = {
  args: {
    logo: {
      href: '/link',
    },
    items: [
      // {
      //   label: 'Menu',
      //   icon: 'menu',
      //   itemType: 'slot',
      //   component: <MobileHeaderMenuItems items={headerProps.items} />,
      //   slotAppearance: 'drawer',
      // },
    ],
  },
  render: createElement,
};

export const DesktopDrawerCustom: Story = {
  args: {
    logo: {
      href: '/link',
    },
    items: [
      {
        icon: 'chevron_left',
        itemType: 'slot',
        component: `<div className="gi-py-4">Left</div>`,
        slotAppearance: 'drawer',
        drawerPosition: 'left',
        showItemMode: 'always',
      },
      {
        icon: 'chevron_right',
        itemType: 'slot',
        component: `<div className="gi-py-4">Right</div>`,
        slotAppearance: 'drawer',
        drawerPosition: 'right',
        showItemMode: 'always',
      },
      {
        label: 'Bottom',
        icon: 'work',
        itemType: 'slot',
        component: `<div className="gi-py-4">Bottom</div>`,
        slotAppearance: 'drawer',
        drawerPosition: 'bottom',
        showItemMode: 'always',
      },
    ],
  },
  render: createElement,
};

export const NoLinks: Story = {
  args: {},
  render: createElement,
};

export const WithMainLinksDesktopOnly: Story = {
  args: {
    logo: {
      href: '/path',
    },
    items: [
      {
        label: 'News',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Departments',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
    ],
  },
  render: createElement,
};

export const WithSecondaryLinks: Story = {
  args: {
    logo: {
      href: '/path',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
    items: [
      {
        icon: 'search',
        label: 'Search',
        itemType: 'slot',
        component: slotSearch(),
        slotAppearance: 'dropdown',
      },
    ],
  },
  render: createElement,
};

export const withMainAndSecondaryLinksDesktopOnly: Story = {
  args: {
    logo: {
      href: 'path',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
    items: [
      {
        label: 'News',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Departments',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
    ],
  },
  render: createElement,
};

const defaultHeaderItems = (external?: boolean) => [
  {
    label: 'Departments',
    itemType: 'link',
    href: '#',
    external,
    showItemMode: 'desktop-only',
  },
  {
    label: 'Services',
    itemType: 'link',
    href: '#',
    external,
    showItemMode: 'desktop-only',
  },
  {
    itemType: 'divider',
  },
  {
    icon: 'search',
    label: 'Search',
    itemType: 'slot',
    component: slotSearch(),
    slotAppearance: 'dropdown',
  },
];

const defaultHeaderProps = (external?: boolean) =>
  ({
    items: [...(defaultHeaderItems(external) as any)],
    addDefaultMobileMenu: true,
    secondaryLinks: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  }) as HeaderProps;

export const withTitle: Story = {
  args: {
    title: 'Life Events',
    logo: {
      href: 'path',
    },
  },
  render: createElement,
};

export const NoLabelSearch: Story = {
  args: {
    logo: {
      href: 'path',
    },
    items: [
      {
        label: 'News',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Departments',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'divider',
      },
      {
        icon: 'search',
        itemType: 'slot',
        component: slotSearch(),
        slotAppearance: 'dropdown',
      },
    ],
    secondaryLinks: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
  render: createElement,
};

export const tabletView: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  args: {
    logo: {
      href: 'path',
    },
    items: headerProps.items,
    addDefaultMobileMenu: true,
  },
  render: createElement,
};

export const mobileView: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    logo: {
      href: 'path',
    },
    items: headerProps.items,
    addDefaultMobileMenu: true,
  },
  render: createElement,
};

export const WithExtraButtons: Story = {
  args: {
    logo: {
      href: '/path',
    },
    items: [
      {
        icon: 'home',
        itemType: 'link',
        href: '#',
        showItemMode: 'always',
      },
      {
        icon: 'logout',
        itemType: 'link',
        href: '#',
        showItemMode: 'always',
      },
      {
        label: 'News',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
    ],
  },
  render: createElement,
};

const withExtraButtonsAndLabelsItems: HeaderItem[] = [
  {
    icon: 'search',
    itemType: 'slot',
    component: slotSearch(),
    slotAppearance: 'dropdown',
  },
  {
    icon: 'home',
    itemType: 'link',
    href: '#',
  },
  {
    icon: 'logout',
    itemType: 'link',
    href: '#',
  },
  {
    label: 'News',
    itemType: 'link',
    href: '#',
    showItemMode: 'desktop-only',
  },
  {
    label: 'Services',
    itemType: 'link',
    href: '#',
    showItemMode: 'desktop-only',
  },
];

export const WithExtraButtonsAndLabels: Story = {
  args: {
    logo: {
      href: '/path',
    },
    items: withExtraButtonsAndLabelsItems,
  },
  render: createElement,
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    logo: {
      href: '/link',
    },
    ...defaultHeaderProps(),
  },
  render: createElement,
};

export const ShowMobileMenuForLanguages: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    logo: {
      href: '/link',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        href: '#',
        label: 'English',
      },
    ],
    addDefaultMobileMenu: true,
  },
  render: createElement,
};

export const withExternalLinks: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    logo: {
      href: 'path',
      external: true,
    },
    items: [
      {
        itemType: 'link',
        href: '#',
        label: 'Internal Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        href: '#',
        external: true,
        label: 'External Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'divider',
      },
      {
        itemType: 'link',
        icon: 'attach_file',
        href: '#',
        label: 'Internal Tool',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        icon: 'arrow_outward',
        href: '#',
        external: true,
        label: 'External Tool',
        showItemMode: 'desktop-only',
      },
    ],
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logoLink = canvas.getByTestId('logo-link');
    const internalNav = canvas.getByText('Internal Nav');
    const externalNav = canvas.getByText('External Nav');
    const externalTool = canvas.getByText('External Tool');
    const internalTool = canvas.getByText('Internal Tool');

    await expect(logoLink).toHaveAttribute('target', '_blank');
    await expect(logoLink).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(internalNav).not.toHaveAttribute('target', '_blank');
    await expect(internalNav).not.toHaveAttribute('rel', 'noreferrer noopener');

    await expect(externalNav).toHaveAttribute('target', '_blank');
    await expect(externalNav).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(externalTool).toHaveAttribute('target', '_blank');
    await expect(externalTool).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(internalTool).not.toHaveAttribute('target', '_blank');
    await expect(internalTool).not.toHaveAttribute(
      'rel',
      'noreferrer noopener',
    );
  },
};

export const mobileWithExternalLinks: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    logo: {
      href: 'path',
      external: true,
    },
    items: [
      {
        itemType: 'link',
        href: '#',
        label: 'Internal Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        href: '#',
        external: true,
        label: 'External Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        icon: 'attach_file',
        href: '#',
        label: 'Internal Tool',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        icon: 'arrow_outward',
        href: '#',
        external: true,
        label: 'External Tool',
        showItemMode: 'desktop-only',
      },
    ],
    addDefaultMobileMenu: true,
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logoLink = canvas.getByTestId('logo-link');
    const headerMobileMenu = canvas.getByTestId('ItemActionTrigger-0');

    await expect(logoLink).toHaveAttribute('target', '_blank');
    await expect(logoLink).toHaveAttribute('rel', 'noreferrer noopener');

    await userEvent.click(headerMobileMenu);

    const internalNav = canvas.getByText('Internal Nav');
    const externalNav = canvas.getByText('External Nav');
    const externalTool = canvas.getByText('External Tool');
    const internalTool = canvas.getByText('Internal Tool');

    await expect(internalNav).not.toHaveAttribute('target', '_blank');
    await expect(internalNav).not.toHaveAttribute('rel', 'noreferrer noopener');

    await expect(externalNav).toHaveAttribute('target', '_blank');
    await expect(externalNav).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(externalTool).toHaveAttribute('target', '_blank');
    await expect(externalTool).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(internalTool).not.toHaveAttribute('target', '_blank');
    await expect(internalTool).not.toHaveAttribute(
      'rel',
      'noreferrer noopener',
    );
  },
};

export const ShowTitleOnMobile: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    title: 'Title on mobile',
    showTitleOnMobile: true,
    logo: {
      href: '/link',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        href: '#',
        label: 'English',
      },
    ],
  },
  render: createElement,
};
