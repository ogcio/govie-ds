'use client';
import { useEffect } from 'react';
import GovieLogo from '../assets/logos/logo.js';
import { cn } from '../cn.js';
import { Icon, IconId } from '../icon/icon.js';
import Anchor from '../primitives/anchor.js';
import { SlotContainer, SlotItemAction } from './components/header-slot.js';
import { attachEventsToItemActionTriggers } from './helper.js';

export type ItemMode = 'always' | 'mobile-only' | 'desktop-only';
export type ItemAppearance = 'dropdown' | 'drawer';

export type HeaderLinkItemType = {
  href: string;
  external?: boolean;
};

export type HeaderSlotItemType = {
  component: React.ReactNode;
  slotAppearance: ItemAppearance;
};

export type ItemType = 'slot' | 'divider' | 'link';

export type Item = {
  label?: string;
  icon?: IconId;
  itemType: ItemType;
  details?: HeaderLinkItemType | HeaderSlotItemType;
  showItemMode?: ItemMode;
};

export type HeaderProps = {
  title?: string;
  logo?: {
    image?: string;
    href?: string;
    external?: boolean;
    alt?: string;
  };
  items?: Item[];
  secondaryLinks?: {
    href: string;
    label: string;
  }[];
  fullWidth?: boolean;
};

function getLogo({ logo }: HeaderProps) {
  return logo?.image ? (
    <img
      alt={logo.alt}
      className="gi-object-contain gi-h-10 lg:gi-h-12"
      src={logo.image}
    />
  ) : (
    <>
      <GovieLogo />
    </>
  );
}

export function Header({
  title,
  items,
  logo,
  secondaryLinks,
  fullWidth = false,
}: HeaderProps) {
  const containerClassName = fullWidth
    ? 'gi-layout-container-full-width'
    : 'gi-layout-container';
  const headerClassNames = 'gi-header';
  const languageBarClassNames = 'gi-header-language-bar';
  const languageItemClassNames = 'gi-header-language-item';
  const menuContainerClassNames = 'gi-header-menu';
  const appTitleClassNames = 'gi-header-title';
  const toolItemClassNames = 'gi-header-tool-item';
  const menuDividerClassNames = 'gi-header-divider';

  useEffect(() => {
    attachEventsToItemActionTriggers();
  }, []);

  const ItemTypeComponent = ({
    item: { itemType, details, icon, label },
    index,
  }: {
    item: Item;
    index: number;
  }) => {
    switch (itemType) {
      case 'slot': {
        return (
          <SlotItemAction
            index={index}
            item={{
              slot: {
                component: (details as HeaderSlotItemType)?.component,
                slotAppearance: (details as HeaderSlotItemType)?.slotAppearance,
              },
              icon,
              label,
            }}
          />
        );
      }
      case 'link': {
        return (
          <Anchor
            className={toolItemClassNames}
            href={(details as HeaderLinkItemType).href}
            aria-label={label || `link ${index}`}
            data-testid={`item-link-${index}`}
            external={(details as HeaderLinkItemType).external}
          >
            {label && <span className="label">{label}</span>}
            {icon && <Icon icon={icon} />}
          </Anchor>
        );
      }
      default: {
        return <div className={menuDividerClassNames}></div>;
      }
    }
  };

  return (
    <header id="GovieHeader" className={headerClassNames}>
      {secondaryLinks && (
        <div className={languageBarClassNames}>
          <div className={containerClassName}>
            <ul>
              {secondaryLinks.map((link, index) => (
                <li key={`language-${link.label}-${index}`}>
                  {link.href ? (
                    <a
                      aria-label={link.label}
                      data-testid={`language-link-desktop-${index}`}
                      href={link.href}
                      className={languageItemClassNames}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className={languageItemClassNames}>{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div id="HeaderContainer" className={containerClassName}>
        <div className={menuContainerClassNames}>
          <div>
            <div className="gi-header-logo">
              {logo?.href && (
                <Anchor
                  href={logo.href}
                  aria-label="Go to the home page"
                  data-testid={`logo-link`}
                  external={logo.external}
                >
                  {getLogo({ logo })}
                </Anchor>
              )}
              {!logo?.href && getLogo({ logo })}
            </div>

            <div className={appTitleClassNames}>{title}</div>
          </div>
          <div className="gi-gap-2 md:gi-gap-4">
            {items &&
              items.map((item, index) => {
                const { label, showItemMode = 'desktop-only' } = item;

                return (
                  <div
                    className={cn({
                      'gi-block': showItemMode === 'always',
                      'gi-block md:gi-hidden': showItemMode === 'mobile-only',
                      'gi-hidden md:gi-block': showItemMode === 'desktop-only',
                    })}
                    key={`item-${label}-${index}`}
                  >
                    <ItemTypeComponent item={item} index={index} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {items?.map(({ itemType, details }, index) =>
        itemType === 'slot' && (details as HeaderSlotItemType)?.component ? (
          <SlotContainer
            key={`slot-container-${index}`}
            slot={(details as HeaderSlotItemType)?.component}
            index={index}
          />
        ) : null,
      )}
    </header>
  );
}
