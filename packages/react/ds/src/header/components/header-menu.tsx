import { useEffect } from 'react';
import { cn } from '../../cn.js';
import { Icon, IconId } from '../../icon/icon.js';
import Anchor from '../../primitives/anchor.js';
import { HeaderProps } from '../header.js';
import HeaderSearch from './header-search.js';

type HeaderMenuProps = {
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
} & Pick<HeaderProps, 'tools' | 'navLinks'>;

type MenuItemAccordionProps = {
  index: number;
  item: { label?: string; slot: React.ReactNode };
};

type MenuListItemProps = {
  href?: string;
  label?: string;
  bold?: boolean;
  external?: boolean;
};

const MenuListItem = ({
  href = '#',
  label = '',
  bold = true,
  external,
}: MenuListItemProps) => (
  <Anchor
    aria-label={label || 'link with no label'}
    href={href}
    className="gi-header-menu-list-item"
    external={external}
  >
    <span className={cn('gi-text-sm', 'gi-ml-1', { 'gi-font-bold': bold })}>
      {label}
    </span>
  </Anchor>
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
        <div className="gi-full-width gi-flex gi-justify-between">
          <span className="gi-text-sm gi-font-bold gi-ml-1">{item.label}</span>
          <Icon icon="chevron_right" className="gi-accordion-item-icon" />
        </div>
      </div>

      <div className="gi-accordion-item-slot gi-hidden gi-bg-gray-50 gi-p-4">
        {item.slot}
      </div>
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
      className="gi-z-1000 gi-bg-white gi-absolute gi-h-full gi-w-full xs:gi-w-3/5 gi-translate-x-full gi-top-0 gi-right-0 gi-min-h-screen lg:gi-hidden"
    >
      <div className="gi-border-gray-100 gi-border-b-xs gi-border-solid gi-h-20 gi-justify-end gi-items-center gi-flex gi-relative gi-py-3 gi-px-4 sm:gi-px-8 sm:gi-py-4">
        <div className="gi-flex gi-items-center">
          <label
            htmlFor="MobileMenuTrigger"
            className="gi-border gi-border-solid gi-border-transparent lg:gi-hidden gi-rounded-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 gi-flex gi-items-center gi-gap-md gi-cursor-pointer"
          >
            <span className="gi-text-2md gi-font-bold">Close</span>
            <Icon icon={'close'} />
          </label>
        </div>
      </div>
      <ul className="gi-bg-white gi-px-4 sm:gi-px-8">
        {navLinks?.map((link, index) => (
          <li key={`navLink-${link.label}-${index}`}>
            <MenuListItem
              href={link.href}
              label={link.label}
              external={link.external}
            />
          </li>
        ))}
        {tools?.items?.map(
          ({ href, label, slot, keepOnMobile, external }, index) => {
            if (slot && !keepOnMobile) {
              return null;
            }
            return (
              <li key={`toolItems-${label}-${index}`}>
                {slot ? (
                  <MenuItemAccordion index={index} item={{ label, slot }} />
                ) : (
                  <MenuListItem href={href} label={label} external={external} />
                )}
              </li>
            );
          },
        )}
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
