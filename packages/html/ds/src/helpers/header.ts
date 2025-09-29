import parse from 'html-react-parser';
import type { HeaderItem, HeaderProps } from '../header/types.js';
import {
  headerDividerVariants,
  headerLogoVariants,
  headerMenuVariants,
  headerSecondaryLinkItemVariants,
  headerSecondaryLinkSlotItemVariants,
  headerSecondaryLinksVariants,
  headerSlotContainerVariants,
  headerTitleVariants,
  headerToolItemVariants,
  headerVariants,
} from '../header/variants.js';
import { createIcon } from '../helpers/icons';
import { createDrawer } from '../helpers/modal';

export const slotExample1 = () => `
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

export const slotSearch = () => `
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

export const slotExample3 = () => `
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

export const mobileHeaderMenuItems = (
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

export const buildDefaultMobileMenu = (
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

const getIcon = (appearance = 'default', size = 'small') => {
  const harpLogoUrl =
    'https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/harp';
  const govLogoUrl =
    'https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov-of-ireland';
  const iconMap: any = {
    default: {
      small: `${harpLogoUrl}/harp-white.svg`,
      large: `${govLogoUrl}/harp-white.svg`,
    },
    light: {
      small: `${harpLogoUrl}/harp-black.svg`,
      large: `${govLogoUrl}/harp-black.svg`,
    },
  };

  return iconMap[appearance][size];
};

export const createHeader = (arguments_: HeaderProps) => {
  const items =
    (arguments_.addDefaultMobileMenu
      ? buildDefaultMobileMenu(
          arguments_.mobileMenuLabel || '',
          arguments_.items || [],
          arguments_.secondaryLinks || [],
        )
      : arguments_.items) || [];
  const appearance = arguments_?.appearance || 'default';

  const containerClassName = arguments_.fullWidth
    ? 'gi-layout-container-full-width'
    : 'gi-layout-container';

  const header = document.createElement('header');
  header.id = 'GovieHeader';
  header.className = headerVariants({ appearance });
  header.dataset.module = 'gieds-header';

  const container = document.createElement('div');
  container.className = `${containerClassName} gi-order-2`;
  header.append(container);

  const menuContainer = document.createElement('div');
  menuContainer.className = headerMenuVariants({ appearance });
  container.append(menuContainer);

  const logoWrapper = document.createElement('div');
  logoWrapper.className = headerLogoVariants({ appearance });

  const logo = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset = arguments_.logo?.imageLarge || getIcon(appearance, 'large');
  source.media = '(min-width: 640px)';
  const img = document.createElement('img');
  img.src = arguments_.logo?.imageSmall || getIcon(appearance, 'small');
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
  titleWrapper.className = `${headerTitleVariants({ appearance })} ${arguments_.showTitleOnMobile ? '' : 'gi-hidden'}`;
  if (arguments_.title) {
    titleWrapper.textContent = arguments_.title;
  }

  const wrapper2 = document.createElement('div');
  wrapper2.className = 'gi-header-action-list';

  for (const [index, item] of items.entries()) {
    const menuItem = document.createElement('div');
    menuItem.className = 'gi-block';
    if (item.showItemMode === 'mobile-only') {
      menuItem.className = 'gi-header-action-mobile-item';
    } else if (item.showItemMode === 'desktop-only') {
      menuItem.className = 'gi-header-action-desktop-item';
    }
    wrapper2.append(menuItem);

    switch (item.itemType) {
      case 'link': {
        const link = document.createElement('a');
        link.className = headerToolItemVariants({ appearance });
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
        label.className = headerToolItemVariants({ appearance });
        label.htmlFor = `ItemActionTrigger-${index}`;
        label.ariaLabel = item.label || item.icon || 'menu';
        label.id = `ItemActionLabel-${index}`;

        const input = document.createElement('input');
        input.classList = 'gi-header-tool-item-input';
        label.append(input);
        input.id = `ItemActionTrigger-${index}`;
        input.dataset.testid = `ItemActionTrigger-${index}`;
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

        if (item.label) {
          const span = document.createElement('span');
          span.className = 'label';
          span.textContent = item.label;
          label.append(span);
        }

        if (item.icon) {
          const icon = createIcon({ icon: item.icon });
          icon.id = `ItemIconActionTrigger-${index}`;
          icon.dataset.testid = `ItemIconActionTrigger-${index}`;
          icon.ariaHidden = 'true';
          label.append(icon);
        }
        const closeIcon = createIcon({
          icon: 'close',
          className: 'gi-hidden close-icon',
        });
        closeIcon.id = `ItemCloseTrigger-${index}`;
        closeIcon.dataset.testid = `ItemCloseTrigger-${index}`;
        closeIcon.ariaHidden = 'true';
        label.append(closeIcon);
        menuItem.append(label);
        break;
      }
      case 'divider': {
        const divider = document.createElement('div');
        divider.className = headerDividerVariants({ appearance });
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
    secondaryBar.className = headerSecondaryLinksVariants({ appearance });
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
          slotWrapper.className = headerSecondaryLinkSlotItemVariants({
            appearance,
          });
          slotWrapper.innerHTML = link.slot;
          li.append(slotWrapper);
        } else if (link.href && link.label) {
          const secondaryLink = document.createElement('a');
          secondaryLink.href = link.href;
          secondaryLink.textContent = link.label;
          secondaryLink.className = headerSecondaryLinkItemVariants({
            appearance,
          });

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
    slotContainer.dataset.testid = `SlotContainer-${index}`;
    slotContainer.dataset.index = `${index}`;
    slotContainer.ariaLabel = `Slot Container ${index + 1}`;
    slotContainer.className = `${headerSlotContainerVariants({ appearance })} gi-hidden`;
    slotContainer.innerHTML = item.component || '';
    header.append(slotContainer);
  }

  return header;
};

export const createElement = (arguments_: HeaderProps) => {
  const component = createHeader(arguments_);
  return parse(component.outerHTML) as React.ReactElement;
};

export const defaultHeaderItems = (external?: boolean) => [
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

export const defaultHeaderProps = () =>
  ({
    items: headerWithSlotsProps.items,
    addDefaultMobileMenu: true,
    mobileMenuLabel: 'Menu',
  }) as HeaderProps;
