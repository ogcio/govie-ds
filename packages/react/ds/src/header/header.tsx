'use client';
import { useEffect } from 'react';
import GovieLogoSmall from '../assets/logos/logo-small.js';
import GovieLogo from '../assets/logos/logo.js';
import { Container } from '../container/container.js';
import { Icon } from '../icon/icon.js';
import { IconId } from '../icon/icon.js';
import HeaderMenu from './components/header-menu.js';
import HeaderSearch from './components/header-search.js';
import { Slot } from './components/header-slot.js';
import {
  attachEventsToItemActionTriggers,
  attachEventsToSearchTrigger,
} from './helper.js';

export type HeaderProps = {
  title?: string;
  logo?: {
    image?: string;
    href?: string;
  };
  tools?: {
    search?: {
      action?: string;
      // Temporary solution to include the usage of Server Actions, as the types of react allow only strings | undefined. The types/react package will eventually get allow this and a more permanent solution will be implemented
      serverAction?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
      label?: string;
      icon?: IconId;
    };
    menu?: {
      label?: string; // optional, default hide
      icon?: IconId; // optional, default icon-hamburger
    };
    items?: {
      label?: string;
      icon?: IconId;
      href: string;
      slot?: React.ReactNode;
      keepOnMobile?: boolean; // optional, default false to not show on mobile.
    }[];
  };
  languages?: {
    href: string;
    label: string;
  }[];
  navLinks?: {
    href: string;
    label: string;
  }[];
  fullWidth?: boolean;
};

export function Header({
  title,
  tools,
  logo,
  languages,
  navLinks,
  fullWidth = false,
}: HeaderProps) {
  const hasDivider = tools?.items || tools?.search;

  const containerClassName = fullWidth
    ? 'gi-layout-container-full-width'
    : 'gi-layout-container';
  const headerClassNames = 'gi-header';
  const languageBarClassNames = 'gi-header-language-bar';
  const languageItemClassNames = 'gi-header-language-item';
  const menuContainerClassNames = 'gi-header-menu';
  const logoLargeClassNames = 'gi-header-logo-lg';
  const logoSmallClassNames = 'gi-header-logo-sm';
  const appTitleClassNames = 'gi-header-title';
  const toolItemClassNames = 'gi-header-tool-item';
  const navLinkContainerClassNames = 'gi-header-nav';
  const menuDividerClassNames = 'gi-header-separator';
  const overlayClassNames = 'gi-header-overlay';

  const showMobileMenu =
    navLinks || tools?.items?.some((item) => item.slot && item.keepOnMobile);

  useEffect(() => {
    attachEventsToItemActionTriggers();
  }, []);

  useEffect(() => {
    if (tools?.search) {
      attachEventsToSearchTrigger();
    }
  }, [tools?.search]);

  return (
    <header id="GovieHeader" className={headerClassNames}>
      {languages && (
        <div className={languageBarClassNames}>
          <div className={containerClassName}>
            <ul>
              {languages.map((link, index) => (
                <li key={index}>
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
      <div id="HeaderMenuContainer" className={containerClassName}>
        <div className={menuContainerClassNames}>
          {logo?.href ? (
            <>
              <a
                href={logo.href}
                className={logoLargeClassNames}
                aria-label="Go to the home page"
              >
                {logo.image ? (
                  <img className="gi-object-contain gi-h-12" src={logo.image} />
                ) : (
                  <GovieLogo />
                )}
              </a>
              <a
                href={logo.href}
                className={logoSmallClassNames}
                aria-label="Go to the home page"
              >
                {logo.image ? (
                  <img className="gi-object-contain gi-h-10" src={logo.image} />
                ) : (
                  <GovieLogoSmall />
                )}
              </a>
            </>
          ) : (
            <>
              <span className={logoLargeClassNames}>
                {logo?.image ? (
                  <img className="gi-object-contain gi-h-12" src={logo.image} />
                ) : (
                  <GovieLogo />
                )}
              </span>
              <span className={logoSmallClassNames}>
                {logo?.image ? (
                  <img className="gi-object-contain gi-h-10" src={logo.image} />
                ) : (
                  <GovieLogoSmall />
                )}
              </span>
            </>
          )}
          <div className={appTitleClassNames}>{title}</div>
          <ul className={navLinkContainerClassNames}>
            {navLinks?.map((link, index) => (
              <li key={index}>
                <a
                  data-testid={`nav-link-desktop-${index}`}
                  href={link.href}
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {navLinks && hasDivider && (
            <div className={menuDividerClassNames}></div>
          )}
          <div className="gi-flex">
            {tools?.search && (
              <div className="gi-hidden sm:gi-flex">
                <label
                  htmlFor="SearchTrigger"
                  className={`${toolItemClassNames}`}
                >
                  <input
                    className="gi-block gi-w-0 gi-absolute gi-h-0"
                    id="SearchTrigger"
                    data-testid="SearchTrigger"
                    type="checkbox"
                  />
                  {tools.search.label && (
                    <span className="label">{tools.search.label}</span>
                  )}
                  <Icon
                    className="search-icon"
                    icon={tools.search.icon || 'search'}
                  />
                  <Icon className="gi-hidden close-icon" icon="close" />
                </label>
              </div>
            )}
            {tools?.items &&
              tools?.items.map((item, index) => {
                return (
                  <div className="gi-hidden md:gi-flex">
                    {item.slot ? (
                      <Slot index={index} item={item} />
                    ) : (
                      <a
                        className={toolItemClassNames}
                        href={item.href}
                        aria-label={item.label || `link ${index}`}
                      >
                        {item.label && (
                          <span className="label">{item.label}</span>
                        )}
                        {item.icon && <Icon icon={item.icon} />}
                      </a>
                    )}
                  </div>
                );
              })}
            {showMobileMenu && (
              <label
                htmlFor="MobileMenuTrigger"
                className={`${toolItemClassNames} md:gi-hidden`}
              >
                <input
                  className="gi-block gi-w-0 gi-absolute gi-h-0"
                  id="MobileMenuTrigger"
                  type="checkbox"
                />
                {tools?.menu?.label && (
                  <span className="label">{tools.menu.label}</span>
                )}
                <Icon icon={tools?.menu?.icon || 'menu'} />
              </label>
            )}
          </div>
        </div>
      </div>
      {tools?.search && (
        <div id="SearchContainer" className={`gi-hidden gi-bg-gray-50 gi-p-4`}>
          <HeaderSearch {...tools.search} />
        </div>
      )}
      <HeaderMenu
        tools={tools}
        searchProps={tools?.search}
        languages={languages}
        navLinks={navLinks}
      />
      <div id="HeaderOverlayContainer" className={overlayClassNames}></div>
    </header>
  );
}
