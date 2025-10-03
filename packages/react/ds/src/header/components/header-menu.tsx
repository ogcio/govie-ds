'use client';

import { useState } from 'react';
import { cn } from '../../cn.js';
import { translate as t } from '../../i18n/utility.js';
import { Icon } from '../../icon/icon.js';
import { ListItem } from '../../list-item/list-item.js';
import { HeaderProps } from '../types.js';

export type MobileHeaderMenuProps = Pick<
  HeaderProps,
  'items' | 'secondaryLinks'
>;

export type MenuItemAccordionProps = {
  index: number;
  item: { label?: string; slot: React.ReactNode };
};
export const MenuItemAccordion = ({ index, item }: MenuItemAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((previous) => !previous);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAccordion();
    }
  };

  return (
    <div
      key={`Accordion-item-${index}`}
      id={`Accordion-item-${index}`}
      className="gi-accordion-item-container"
      data-open={isOpen.toString()}
      role="presentation"
    >
      <div
        aria-label={item.label}
        id={`Accordion-header-${index}`}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`Accordion-slot-${index}`}
        className="gi-header-accordion-item-toggle"
        tabIndex={0}
        onClick={toggleAccordion}
        onKeyDown={handleKeyDown}
      >
        <div>
          <span className="gi-text-sm gi-font-bold gi-ml-1">{item.label}</span>
          <Icon icon="chevron_right" className="gi-accordion-item-icon" />
        </div>
      </div>

      <div
        id={`Accordion-slot-${index}`}
        role="region"
        className={cn('gi-accordion-item-slot', {
          'gi-hidden': !isOpen,
        })}
      >
        {item.slot}
      </div>
    </div>
  );
};

export const MobileHeaderMenuItems = ({
  items,
  secondaryLinks,
}: MobileHeaderMenuProps) => {
  return (
    <ul>
      {items?.map(({ itemType, label, ...item }, index) => {
        const [isLink, isSlot] = [
          itemType === 'link' || itemType === 'custom-link',
          itemType === 'slot',
        ];
        if (!label) {
          return null;
        }

        if (isLink) {
          return (
            <li key={`navLink-${label}-${index}`}>
              <ListItem
                href={item?.href}
                label={label}
                external={item?.external}
                slot={item?.component as any}
              />
            </li>
          );
        } else if (isSlot) {
          return (
            <li key={`toolItems-${label}-${index}`}>
              <MenuItemAccordion
                index={index}
                item={{
                  label,
                  slot: item?.component,
                }}
              />
            </li>
          );
        }
      })}

      {secondaryLinks?.map((link, index) => (
        <li key={`secondary-${link.label}-${index}`}>
          <ListItem
            href={link.href}
            label={link.label}
            bold={false}
            slot={link.slot as any}
          />
        </li>
      ))}
    </ul>
  );
};

// TODO: remove when stable. keeping this for now but is not used anymore.
function HeaderMenu({ ...props }: MobileHeaderMenuProps) {
  return (
    <div
      id="HeaderMenuContainer"
      className="gi-header-menu-container lg:gi-hidden"
      aria-label={t('header.mobileNavigationMenu', {
        defaultValue: 'Mobile Navigation Menu',
      })}
    >
      <div>
        <div className="gi-flex gi-items-center">
          <label
            htmlFor="MobileMenuTrigger"
            className="gi-header-menu-mobile-trigger"
            aria-label={t('header.closeMobileMenu', {
              defaultValue: 'Close Mobile Menu',
            })}
          >
            <span>Close</span>
            <Icon icon={'close'} />
          </label>
        </div>
      </div>
      <MobileHeaderMenuItems {...props} />
    </div>
  );
}

export default HeaderMenu;
