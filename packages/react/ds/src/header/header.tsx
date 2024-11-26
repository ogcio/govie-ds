import GovieLogoSmall from '../assets/logos/logo-small.js';
import GovieLogo from '../assets/logos/logo.js';
import { Icon, IconId } from '../icon/icon.js';
import HeaderMenu from './components/header-menu.js';
import HeaderSearch from './components/header-search.js';

export type HeaderProps = {
  title?: string;
  logo?: {
    image?: string;
    href?: string;
    alt?: string;
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

function getLogo({ logo }: HeaderProps) {
  const logoLargeClassNames = 'gi-header-logo-lg';
  const logoSmallClassNames = 'gi-header-logo-sm';

  return logo?.image ? (
    <img
      alt={logo.alt}
      className="gi-object-contain gi-h-10 lg:gi-h-12"
      src={logo.image}
    />
  ) : (
    <>
      <GovieLogo className={logoLargeClassNames} />
      <GovieLogoSmall className={logoSmallClassNames} />
    </>
  );
}

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
  const appTitleClassNames = 'gi-header-title';
  const toolItemClassNames = 'gi-header-tool-item';
  const navLinkContainerClassNames = 'gi-header-nav';
  const menuDividerClassNames = 'gi-header-separator';
  const overlayClassNames = 'gi-header-overlay';

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
          <div className="gi-header-logo">
            {logo?.href && (
              <a href={logo.href} aria-label="Go to the home page">
                {getLogo({ logo })}
              </a>
            )}
            {!logo?.href && getLogo({ logo })}
          </div>

          <div className={appTitleClassNames}>{title}</div>

          <ul className={navLinkContainerClassNames}>
            {navLinks?.map((link, index) => (
              <li key={index}>
                <a data-testid={`nav-link-desktop-${index}`} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {navLinks && hasDivider && (
            <div className={menuDividerClassNames}></div>
          )}
          {tools?.search && (
            <label htmlFor="SearchTrigger" className={toolItemClassNames}>
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
          )}

          {tools?.items &&
            tools?.items.map((item) => (
              <a className={toolItemClassNames} href={item.href}>
                {item.label && <span className="label">{item.label}</span>}
                {item.icon && <Icon icon={item.icon} />}
              </a>
            ))}

          {navLinks && (
            <label
              htmlFor="MobileMenuTrigger"
              className={`${toolItemClassNames} sm:gi-hidden`}
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
      {tools?.search && <HeaderSearch {...tools.search} />}
      <HeaderMenu
        searchProps={tools?.search}
        languages={languages}
        navLinks={navLinks}
      />
      <div id="HeaderOverlayContainer" className={overlayClassNames}></div>
    </header>
  );
}
