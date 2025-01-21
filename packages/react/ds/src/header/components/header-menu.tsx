import { useEffect } from 'react';
import { cn } from '../../cn.js';
import { Icon, IconId } from '../../icon/icon.js';
import Anchor from '../../primitives/anchor.js';
import { HeaderProps } from '../header.js';
import HeaderSearch, { HeaderSearchProps } from './header-search.js';

type HeaderMenuProps = {
  searchProps?: HeaderSearchProps;
} & Pick<HeaderProps, 'tools' | 'navLinks' | 'languages'>;

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

export const MenuListItem = ({
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
        <div>
          <span className="gi-text-sm gi-font-bold gi-ml-1">{item.label}</span>
          <Icon icon="chevron_right" className="gi-accordion-item-icon" />
        </div>
      </div>

      <div className="gi-accordion-item-slot gi-hidden">{item.slot}</div>
    </div>
  );
};

export const HeaderMenuItems = ({
  navLinks,
  tools,
  languages,
  searchProps,
}: HeaderMenuProps) => {
  return (
    <ul>
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
  );
};

// TODO: remove when stable. keeping this for now but is not used anymore.
function HeaderMenu({ ...props }: HeaderMenuProps) {
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
      <HeaderMenuItems {...props} />
    </div>
  );
}

export default HeaderMenu;
