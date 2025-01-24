'use client';
import { useEffect, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import GovieLogoHarpWithText from '../assets/logos/gov-of-ireland/harp-white.js';
import GovieLogoHarp from '../assets/logos/harp/harp-white.js';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';
import Anchor from '../primitives/anchor.js';
import { MobileHeaderMenuItems } from './components/header-menu.js';
import { SlotContainer, SlotItemAction } from './components/header-slot.js';
import { attachEventsToItemActionTriggers } from './helper.js';
import type {
  HeaderItem,
  HeaderLinkItemType,
  HeaderProps,
  HeaderSlotItemType,
} from './types.js';

function getLogo({ logo }: HeaderProps) {
  const svgMobileString = btoa(renderToStaticMarkup(<GovieLogoHarp />));
  const svgDataUriMobile = `data:image/svg+xml;base64,${svgMobileString}`;
  const svgDesktopString = btoa(
    renderToStaticMarkup(<GovieLogoHarpWithText />),
  );
  const svgDataUriDesktop = `data:image/svg+xml;base64,${svgDesktopString}`;

  return (
    <picture>
      <source
        srcSet={logo?.imageLarge || svgDataUriDesktop}
        media="(min-width: 640px)"
      />
      <img
        className={'gi-h-10 sm:gi-h-14'}
        src={logo?.imageSmall || svgDataUriMobile}
        alt={logo?.alt || 'Gov.ie logo'}
      />
    </picture>
  );
}

const buildDefaultMobileMenu = (
  mobileMenuLabel: string,
  items: HeaderItem[],
  secondaryLinks: {
    href: string;
    label: string;
  }[],
) => {
  const mobileMenu: HeaderItem = {
    label: mobileMenuLabel,
    icon: 'menu',
    itemType: 'slot',
    details: {
      component: (
        <MobileHeaderMenuItems items={items} secondaryLinks={secondaryLinks} />
      ),
      slotAppearance: 'drawer',
    },
    showItemMode: 'mobile-only',
  };

  return [mobileMenu, ...items];
};

export function Header({
  title,
  items,
  logo,
  secondaryLinks,
  fullWidth = false,
  addDefaultMobileMenu,
  mobileMenuLabel,
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
    item: HeaderItem;
    index: number;
  }) => {
    switch (itemType) {
      case 'slot': {
        const slot = details as HeaderSlotItemType;
        return (
          <SlotItemAction
            index={index}
            item={{
              slot,
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
        // Divider
        return <div className={menuDividerClassNames}></div>;
      }
    }
  };

  const finalItems = useMemo(() => {
    const newItems = items || [];
    return addDefaultMobileMenu
      ? buildDefaultMobileMenu(
          mobileMenuLabel || '',
          newItems,
          secondaryLinks || [],
        )
      : newItems;
  }, [addDefaultMobileMenu]);

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
            {finalItems?.map((item, index) => {
              const { label, showItemMode = 'desktop-only' } = item;

              return (
                <div
                  aria-label={label}
                  data-testid={`header-item-${index}`}
                  className={cn({
                    'gi-block': showItemMode === 'always',
                    'gi-block lg:gi-hidden': showItemMode === 'mobile-only',
                    'gi-hidden lg:gi-block': showItemMode === 'desktop-only',
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
      {finalItems?.map(({ itemType, details }, index) => {
        if (itemType === 'slot') {
          const slot = details as HeaderSlotItemType;
          const renderOnlyForDropdown =
            slot.component && slot.slotAppearance !== 'drawer';

          if (renderOnlyForDropdown) {
            return (
              <SlotContainer
                key={`slot-container-${index}`}
                slot={(details as HeaderSlotItemType)?.component}
                index={index}
              />
            );
          }
          return null;
        }
      })}
    </header>
  );
}
