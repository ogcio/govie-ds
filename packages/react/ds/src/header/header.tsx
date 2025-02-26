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
import type { HeaderItem, HeaderProps } from './types.js';

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
    component: (
      <MobileHeaderMenuItems items={items} secondaryLinks={secondaryLinks} />
    ),
    slotAppearance: 'drawer',
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
  showTitleOnMobile,
  dataTestid,
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
    item,
    index,
  }: {
    item: HeaderItem;
    index: number;
  }) => {
    switch (item.itemType) {
      case 'slot': {
        return <SlotItemAction index={index} item={item} />;
      }
      case 'link': {
        return (
          <Anchor
            className={toolItemClassNames}
            href={item.href}
            onClick={item.onClick}
            aria-label={item.label || `link ${index}`}
            data-testid={`item-link-${index}`}
            external={item.external}
          >
            {item.label && item.label}
            {item.icon && <Icon icon={item.icon} />}
          </Anchor>
        );
      }
      case 'custom-link': {
        return (
          <Anchor asChild className={toolItemClassNames}>
            {item.component}
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
    <header
      id="GovieHeader"
      aria-label="Site Header"
      className={headerClassNames}
      data-testid={dataTestid}
    >
      <div
        id="HeaderContainer"
        className={cn(containerClassName, 'gi-order-2')}
      >
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
            <div
              className={cn(appTitleClassNames, {
                'gi-hidden': !showTitleOnMobile,
              })}
            >
              {title}
            </div>
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

      {secondaryLinks && (
        <div className={cn(languageBarClassNames, 'gi-order-1')}>
          <div className={containerClassName}>
            <ul>
              {secondaryLinks.map((link, index) => (
                <li key={`language-${link.label}-${index}`}>
                  {link.href ? (
                    <a
                      aria-label={link.label}
                      data-testid={`language-link-desktop-${index}`}
                      href={link.href}
                      tabIndex={0}
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

      {finalItems?.map(({ itemType, component, slotAppearance }, index) => {
        if (itemType === 'slot') {
          const renderOnlyForDropdown =
            component && slotAppearance !== 'drawer';

          if (renderOnlyForDropdown) {
            return (
              <SlotContainer
                key={`slot-container-${index}`}
                slot={component}
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
