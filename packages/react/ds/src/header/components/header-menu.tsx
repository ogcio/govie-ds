'use client';

import { useState } from 'react';
import { cn } from '../../cn.js';
import { Icon } from '../../icon/icon.js';
import Anchor from '../../primitives/anchor.js';
import {
  HeaderProps,
  HeaderLinkItemType,
  HeaderSlotItemType,
} from '../header.js';

export type MobileHeaderMenuProps = Pick<
  HeaderProps,
  'items' | 'secondaryLinks'
>;

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      key={`Accordion-item-${index}`}
      id={`Accordion-item-${index}`}
      className="gi-accordion-item-container"
      data-open={isOpen.toString()}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div aria-label={item.label} className="gi-header-accordion-item-toggle">
        <div>
          <span className="gi-text-sm gi-font-bold gi-ml-1">{item.label}</span>
          <Icon icon="chevron_right" className="gi-accordion-item-icon" />
        </div>
      </div>

      <div
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
      {items?.map(({ itemType, ...item }, index) => {
        const [isLink, isSlot] = [itemType === 'link', itemType === 'slot'];

        if (isLink) {
          const linkDetails = item.details as HeaderLinkItemType;
          return (
            <li key={`navLink-${item.label}-${index}`}>
              <MenuListItem
                href={linkDetails?.href}
                label={item.label}
                external={linkDetails?.external}
              />
            </li>
          );
        } else if (isSlot) {
          const slotDetails = item.details as HeaderSlotItemType;
          return (
            <li key={`toolItems-${item.label}-${index}`}>
              <MenuItemAccordion
                index={index}
                item={{
                  label: item.label,
                  slot: slotDetails?.component,
                }}
              />
            </li>
          );
        }
      })}

      {secondaryLinks?.map((link, index) => (
        <li key={`secondary-${link.label}-${index}`}>
          <MenuListItem href={link.href} label={link.label} bold={false} />
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
      <MobileHeaderMenuItems {...props} />
    </div>
  );
}

export default HeaderMenu;
