import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, userEvent, within } from 'storybook/test';
import { createIcon } from '../helpers/icons';
import { createDrawer } from '../helpers/modal';
import { HeaderItem, HeaderProps } from './types';

const meta: Meta<HeaderProps> = {
  title: 'Layout/Header',
};

export default meta;
type Story = StoryObj<HeaderProps>;

const mobileHeaderMenuItems = (
  items: HeaderItem[],
  secondaryLinks?: {
    href?: string;
    label?: string;
  }[],
) => {
  function createListItem(
    item:
      | HeaderItem
      | {
          href?: string;
          label?: string;
        },
  ) {
    const li = document.createElement('li');

    const listItem = document.createElement('a');
    listItem.href = item.href!;
    listItem.className = 'gi-list-item';
    if ('external' in item && item.external) {
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

  const mobileHeaderMenuItems = document.createElement('ul');

  for (const item of items) {
    if (item.itemType === 'link') {
      createListItem(item);
    }
  }

  for (const item of secondaryLinks || []) {
    createListItem(item);
  }

  return mobileHeaderMenuItems;
};

const buildDefaultMobileMenu = (
  mobileMenuLabel: string,
  items: HeaderItem[],
  secondaryLinks: {
    href?: string;
    label?: string;
  }[],
) => {
  const component = mobileHeaderMenuItems(items, secondaryLinks);

  const mobileMenu: HeaderItem = {
    label: mobileMenuLabel,
    icon: 'menu',
    itemType: 'slot',
    component: component.outerHTML,
    slotAppearance: 'drawer',
    showItemMode: 'mobile-only',
  };

  return [...items, mobileMenu];
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
  header.dataset.module = 'gieds-header';

  const container = document.createElement('div');
  container.className = `${containerClassName} gi-order-2`;
  header.append(container);

  const menuContainer = document.createElement('div');
  menuContainer.className = menuContainerClassNames;
  container.append(menuContainer);

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

  const wrapper2 = document.createElement('div');
  wrapper2.className =
    'gi-flex gi-items-center gi-gap-2 md:gi-gap-4 gi-flex-none';

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
        label.append(input);
        input.id = `ItemActionTrigger-${index}`;
        input.type = 'button';
        input.dataset.index = `${index}`;

        // this code is needed only for storybook
        if (item.slotAppearance === 'drawer') {
          const script = document.createElement('script');
          script.async = false;

          const scriptCode = `
          function toggleDrawer${index}() {
            const element = document.getElementById('Drawer-${index}');
            const elements = element.querySelectorAll('[data-element="modal"]');
            const modal = elements[0];

            if(modal){
              modal.classList.add('gi-modal-open');
              modal.classList.remove('gi-modal-close');
              modal.setAttribute('aria-hidden', 'false');
            }
          }
          setTimeout(() => {
            const label = document.getElementById('ItemActionLabel-${index}');
            label?.addEventListener('click', function() { toggleDrawer${index}(); })
          }, 500);
          `;

          script.append(document.createTextNode(scriptCode));
          document.body.append(script);
        }
        // this code is needed only for storybook
        if (item.slotAppearance === 'dropdown') {
          const script = document.createElement('script');
          script.async = false;

          const scriptCode = `
          function openSlotContainer${index}() {
            const element = document.getElementById('SlotContainer-${index}');

            if(element){
              element.classList.add('gi-block');
              element.classList.remove('gi-hidden');
            }
          }
          setTimeout(() => {
            const label = document.getElementById('ItemActionLabel-${index}');
            label?.addEventListener('click', function() { openSlotContainer${index}(); })
          }, 500);
          `;

          script.append(document.createTextNode(scriptCode));
          document.body.append(script);
        }

        if (item.label) {
          const span = document.createElement('span');
          span.className = 'label';
          span.textContent = item.label;
          label.append(span);
        }

        if (item.icon) {
          const icon = createIcon({ icon: item.icon });
          icon.id = `ItemIconActionTrigger-${index}`;
          icon.ariaHidden = 'true';
          label.append(icon);
        }
        const closeIcon = createIcon({
          icon: 'close',
          className: 'gi-hidden close-icon',
        });
        closeIcon.id = `ItemCloseTrigger-${index}`;
        closeIcon.ariaHidden = 'true';
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
  menuContainer.append(logoWrapper);
  menuContainer.append(titleWrapper);
  menuContainer.append(wrapper2);

  if (arguments_.secondaryLinks?.length) {
    const secondaryBar = document.createElement('div');
    secondaryBar.className = `${secondaryBarClassNames} gi-order-1`;
    header.append(secondaryBar);

    const secondaryBarContainer = document.createElement('div');
    secondaryBarContainer.className = `${containerClassName} gi-flex gi-justify-end gi-items-center`;
    secondaryBar.append(secondaryBarContainer);

    if (arguments_.secondaryLinks?.length) {
      const list = document.createElement('ul');

      for (const link of arguments_.secondaryLinks) {
        const li = document.createElement('li');

        if (link.slot) {
          const slotWrapper = document.createElement('div');
          slotWrapper.className = 'gi-header-secondary-item-slot';
          slotWrapper.innerHTML = link.slot;
          li.append(slotWrapper);
        } else if (link.href && link.label) {
          const secondaryLink = document.createElement('a');
          secondaryLink.href = link.href;
          secondaryLink.textContent = link.label;
          secondaryLink.className = secondaryItemClassNames;

          li.append(secondaryLink);
        }
        list.append(li);
      }
      secondaryBarContainer.append(list);
    }
  }

  for (const [index, item] of items.entries()) {
    if (item.itemType !== 'slot') {
      continue;
    }
    if (item.slotAppearance !== 'dropdown') {
      continue;
    }
    const slotContainer = document.createElement('div');
    slotContainer.id = `SlotContainer-${index}`;
    slotContainer.dataset.index = `${index}`;
    slotContainer.ariaLabel = `Slot Container ${index + 1}`;
    slotContainer.className =
      'gi-hidden gi-bg-gray-50 gi-py-4 gi-px-4 gi-border-b-2xl gi-border-b-color-surface-system-primary-default gi-order-3';
    slotContainer.innerHTML = item.component || '';
    header.append(slotContainer);
  }

  return header;
};

const createElement = (arguments_: HeaderProps) => {
  const component = createHeader(arguments_);
  return parse(component.outerHTML) as React.ReactElement;
};

const slotExample1 = () => `
  <ul class="gi-list-bullet">
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
      <div class="gi-input-text-container gi-flex-auto">
        <div class="gi-input-text-container">
          <input
            placeholder="Enter search term"
            id="search"
            type="text"
            class="gi-border-gray-950 gi-w-full gi-input-text"
            name="search_query"
            aria-label="Search the website"
          />
        </div>
      </div>
      <div class="gi-ml-1 gi-flex-none">
        <button class="gi-btn gi-btn-primary sm:gi-icon-btn-regular gi-btn-regular">
          <span class="gi-hidden md:gi-block">Search</span>
          <span class="gi-block md:gi-hidden material-symbols-outlined gi-text-[24px]" style="font-variation-settings: &quot;FILL&quot; 0, &quot;wght&quot; 400, &quot;GRAD&quot; 0, &quot;opsz&quot; 24;">search</span>
        </button>
      </div>
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

const defaultHeaderProps = () =>
  ({
    items: headerWithSlotsProps.items,
    addDefaultMobileMenu: true,
    mobileMenuLabel: 'Menu',
  }) as HeaderProps;

const headerWithSlotsProps: HeaderProps = {
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
    ...defaultHeaderProps(),
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
      {
        label: 'Menu',
        icon: 'menu',
        itemType: 'slot',
        component: mobileHeaderMenuItems(defaultHeaderProps().items || [])
          .outerHTML,
        slotAppearance: 'drawer',
        showItemMode: 'always',
      },
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

export const TabletView: Story = {
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
    ...defaultHeaderProps(),
  },
  render: createElement,
};

export const MobileView: Story = {
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
    ...defaultHeaderProps(),
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

export const WithExternalLinks: Story = {
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

export const MobileWithExternalLinks: Story = {
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
    const headerMobileMenu = canvas.getByTestId('ItemActionTrigger-4');

    await expect(logoLink).toHaveAttribute('target', '_blank');
    await expect(logoLink).toHaveAttribute('rel', 'noreferrer noopener');

    await userEvent.click(headerMobileMenu);

    const internalNav = await canvas.findAllByText('Internal Nav');
    const externalNav = await canvas.findAllByText('External Nav');
    const externalTool = await canvas.findAllByText('External Tool');
    const internalTool = await canvas.findAllByText('Internal Tool');

    await expect(internalNav[0]).not.toHaveAttribute('target', '_blank');
    await expect(internalNav[0]).not.toHaveAttribute(
      'rel',
      'noreferrer noopener',
    );

    await expect(externalNav[0]).toHaveAttribute('target', '_blank');
    await expect(externalNav[0]).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(externalTool[0]).toHaveAttribute('target', '_blank');
    await expect(externalTool[0]).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(internalTool[0]).not.toHaveAttribute('target', '_blank');
    await expect(internalTool[0]).not.toHaveAttribute(
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

export const GovieHeader: Story = {
  args: {
    logo: {
      href: '#',
      imageLarge:
        'https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg',
      imageSmall:
        'https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg',
    },
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
        label: 'Gaelige',
        itemType: 'link',
        href: '#',
        showItemMode: 'always',
      },
    ],
    addDefaultMobileMenu: true,
  },
  render: createElement,
};

export const WithUtilitySlot: Story = {
  args: {
    logo: {
      href: 'path',
      external: true,
    },
    title: 'Title',
    secondaryLinks: [
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        slot: `<a href="#">English</a>`,
      },
      {
        slot: `
          <p class="gi-paragraph-sm">Hello John | <a href="#">Logout</a></p>
        `,
      },
    ],
  },
  render: createElement,
};

/* New ones */

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

export const WithCustomSecondaryLinks: Story = {
  args: {
    logo: {
      href: '/path',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        slot: `<a href="#">English</a>`,
      },
      {
        slot: `
        <p class="gi-paragraph-sm">Hello John | <a href="#">Logout</a></p>
      `,
      },
    ],
    addDefaultMobileMenu: true,
    items: [...defaultHeaderItems()],
  },
  render: createElement,
};

export const WithMainAndSecondaryLinksDesktopOnly: Story = {
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

export const WithTitle: Story = {
  args: {
    title: 'Life Events',
    logo: {
      href: 'path',
    },
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
