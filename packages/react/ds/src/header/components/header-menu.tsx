import { useEffect } from 'react';
import { cn } from '../../cn.js';
import { Icon, IconId } from '../../icon/icon.js';
import { HeaderProps } from '../header.js';
import HeaderSearch from './header-search.js';

type HeaderMenuProps = {
  navLinks?: {
    href: string;
    label: string;
  }[];
  languages?: {
    href: string;
    label: string;
  }[];
  searchProps?: {
    action?: string;
    serverAction?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    label?: string;
    icon?: IconId;
  };
} & Pick<HeaderProps, 'tools'>;

type MenuItemAccordionProps = {
  index: number;
  item: { label?: string; slot: React.ReactNode };
};

type MenuListItemProps = {
  href?: string;
  label?: string;
  bold?: boolean;
};

const MenuListItem = ({
  href = '#',
  label = '',
  bold = true,
}: MenuListItemProps) => (
  <a
    aria-label={label || 'link with no label'}
    href={href}
    className="gi-header-menu-list-item"
  >
    <span className={cn('gi-text-sm', 'gi-ml-1', { 'gi-font-bold': bold })}>
      {label}
    </span>
  </a>
);

export const MenuItemAccordion = ({ index, item }: MenuItemAccordionProps) => {
  useEffect(() => {
    const accordionItemContainer = document.querySelector(
      `#Accordion-item-${index}`,
    );
    const toggleLink = accordionItemContainer?.querySelector(
      '.gi-header-accordion-item-toggle',
    );

    const handleOnClick =
      (accordionItemContainer: HTMLElement) => (event: Event) => {
        const slotContainer = accordionItemContainer.querySelector(
          '.gi-accordion-item-slot',
        );

        event.preventDefault();

        const isOpen = slotContainer?.classList.contains('gi-block');
        slotContainer?.classList.toggle('gi-block', !isOpen);
        slotContainer?.classList.toggle('gi-hidden', isOpen);

        accordionItemContainer.dataset.open = (!isOpen).toString();
      };

    if (accordionItemContainer) {
      toggleLink?.addEventListener(
        'click',
        handleOnClick(accordionItemContainer as HTMLInputElement),
      );
    }
  }, [index]);

  return (
    <div
      key={`Accordion-item-${index}`}
      id={`Accordion-item-${index}`}
      className="gi-accordion-item-container"
      data-open="false"
    >
      <div aria-label={item.label} className="gi-header-accordion-item-toggle">
        <div>
          <span className="gi-text-sm gi-font-bold gi-ml-1">{item.label}</span>
          <Icon icon="chevron_right" className="gi-accordion-item-icon" />
        </div>
      </div>

      <div className="gi-accordion-item-slot gi-hidden">{item.slot}</div>
    </div>
  );
};

function HeaderMenu({
  languages,
  navLinks,
  searchProps,
  tools,
}: HeaderMenuProps) {
  return (
    <div
      id="HeaderMenuContainer"
      className="gi-header-menu-container lg:gi-hidden"
    >
      <div>
        <div className="gi-flex gi-items-center">
          <label
            htmlFor="MobileMenuTrigger"
            className="gi-header-menu-mobile-trigger"
          >
            <span>Close</span>
            <Icon icon={'close'} />
          </label>
        </div>
      </div>
      <ul>
        {navLinks?.map((link, index) => (
          <li key={`navLink-${link.label}-${index}`}>
            <MenuListItem href={link.href} label={link.label} />
          </li>
        ))}
        {tools?.items?.map(({ href, label, slot, keepOnMobile }, index) => {
          if (slot && !keepOnMobile) {
            return null;
          }
          return (
            <li key={`toolItems-${label}-${index}`}>
              {slot ? (
                <MenuItemAccordion index={index} item={{ label, slot }} />
              ) : (
                <MenuListItem href={href} label={label} />
              )}
            </li>
          );
        })}
        {languages?.map((link, index) => (
          <li key={`language-${link.label}-${index}`}>
            <MenuListItem href={link.href} label={link.label} bold={false} />
          </li>
        ))}
        {searchProps && (
          <li className="gi-mt-8 sm:gi-hidden">
            <HeaderSearch {...searchProps} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default HeaderMenu;
