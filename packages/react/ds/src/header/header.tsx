import GovieLogoSmall from '../assets/logos/logo-small.js';
import GovieLogo from '../assets/logos/logo.js';
import { Icon } from '../icon/icon.js';
import { IconId } from '../icon/icon.js';
import HeaderMenu from './components/header-menu.js';
import HeaderSearch from './components/header-search.js';

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
};

export function Header({
  title,
  tools,
  logo,
  languages,
  navLinks,
}: HeaderProps) {
  const hasDivider = tools?.items || tools?.search;

  const logoClassName =
    'gi-border gi-border-solid gi-border-transparent focus-visible:gi-outline-offset-0 focus-visible:gi-outline-none focus-visible:gi-border focus-visible:gi-border-solid focus-visible:gi-border-yellow-400 focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400 gi-block gi-text-white hover:gi-bg-black hover:gi-bg-opacity-20 gi-py-1 gi-px-2 gi-rounded-sm';
  const toolItemClassNames =
    'gi-border gi-border-solid gi-border-transparent focus-within:gi-outline-offset-0 focus-within:gi-outline-none focus-within:gi-border focus-within:gi-border-solid focus-within:gi-border-yellow-400 gi-hidden xs:gi-flex gi-rounded-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 gi-items-center gi-gap-md gi-cursor-pointer focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400';
  const navLinkClassNames =
    'gi-border gi-border-solid gi-border-transparent gi-text-2md gi-font-bold focus-visible:gi-outline-offset-0 focus-visible:gi-outline-none focus-visible:gi-border focus-visible:gi-border-solid focus-visible:gi-border-yellow-400 gi-rounded-sm active:gi-underline active:gi-underline-offset-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400';

  return (
    <header
      id="GovieHeader"
      className="gi-relative gi-overflow-x-clip gi-bg-emerald-800 gi-border-gold-500"
    >
      {languages && (
        <div className="gi-hidden sm:gi-flex gi-bg-emerald-700 gi-h-10 gi-justify-end gi-items-center">
          <ul className="gi-py-2 gi-flex gi-justify-end gi-gap-4 gi-items-center gi-h-full gi-mr-8 gi-my-1">
            {languages.map((link, index) => (
              <li key={index}>
                {link.href ? (
                  <a href={link.href} className={logoClassName}>
                    {link.label}
                  </a>
                ) : (
                  <span className={logoClassName}>{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        id="MenuContainer"
        className="gi-h-20 gi-justify-between gi-items-center gi-flex gi-bg-emerald-800 gi-relative gi-py-3 gi-px-4 sm:gi-px-8 sm:gi-py-4"
      >
        <div className="gi-flex gi-items-center gi-gap-4 md:gi-gap-6 lg:gi-gap-12">
          {logo?.href ? (
            <>
              <a href={logo.href} className="md:gi-block gi-hidden">
                {logo.image ? (
                  <img className="gi-object-contain gi-h-12" src={logo.image} />
                ) : (
                  <GovieLogo />
                )}
              </a>
              <a href={logo.href} className="md:gi-hidden gi-block">
                {logo.image ? (
                  <img className="gi-object-contain gi-h-10" src={logo.image} />
                ) : (
                  <GovieLogoSmall />
                )}
              </a>
            </>
          ) : (
            <>
              <span className="md:gi-block gi-hidden">
                {logo?.image ? (
                  <img className="gi-object-contain gi-h-12" src={logo.image} />
                ) : (
                  <GovieLogo />
                )}
              </span>
              <span className="md:gi-hidden gi-block">
                {logo?.image ? (
                  <img className="gi-object-contain gi-h-10" src={logo.image} />
                ) : (
                  <GovieLogoSmall />
                )}
              </span>
            </>
          )}
          {title && (
            <div className="gi-heading-sm gi-tracking-wider gi-text-white !gi-m-0">
              {title}
            </div>
          )}
        </div>
        <div className="gi-flex gi-items-center">
          <ul className="gi-hidden sm:gi-flex gi-gap-4 gi-text-white">
            {navLinks?.map((link, index) => (
              <li key={index} className="gi-flex">
                <a href={link.href} className={navLinkClassNames}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {navLinks && hasDivider && (
            <div className="gi-hidden sm:gi-block gi-border-l-xs gi-border-solid gi-border-white gi-h-8 gi-mx-6"></div>
          )}
          {tools?.search && (
            <label htmlFor="SearchTrigger" className={toolItemClassNames}>
              <input
                className="gi-block gi-w-0 gi-absolute gi-h-0"
                id="SearchTrigger"
                type="checkbox"
              />
              {tools.search.label && (
                <span className="gi-hidden sm:gi-block gi-text-2md gi-font-bold gi-text-white">
                  {tools.search.label}
                </span>
              )}
              <Icon
                className="search-icon gi-text-white"
                icon={tools.search.icon || 'search'}
              />
              <Icon
                className="gi-hidden close-icon gi-text-white"
                icon="close"
              />
            </label>
          )}

          {tools?.items &&
            tools?.items.map((item) => (
              <a
                className="gi-rounded-sm gi-items-center gi-p-2 gi-border-solid gi-border gi-flex gi-gap-md focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400 hover:gi-bg-black hover:gi-bg-opacity-20 gi-border-transparent focus-within:gi-outline-offset-0 focus-within:gi-outline-none focus-within:gi-border focus-within:gi-border-solid focus-within:gi-border-yellow-400"
                href={item.href}
              >
                {item.label && (
                  <span className="gi-hidden sm:gi-block gi-text-2md gi-font-bold gi-text-white">
                    {item.label}
                  </span>
                )}
                {item.icon && (
                  <Icon className="gi-text-white" icon={item.icon} />
                )}
              </a>
            ))}
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
              <span className="gi-hidden sm:gi-block gi-text-2md gi-font-bold gi-text-white">
                {tools.menu.label}
              </span>
            )}
            <Icon
              className="gi-text-white"
              icon={tools?.menu?.icon || 'menu'}
            />
          </label>
        </div>
      </div>
      {tools?.search && <HeaderSearch {...tools.search} />}
      <HeaderMenu
        searchProps={tools?.search}
        languages={languages}
        navLinks={navLinks}
      />
      <div
        id="HeaderOverlayContainer"
        className="gi-top-0 gi-z-900 gi-pointer-events-none gi-hidden gi-w-full gi-h-full gi-bg-black gi-opacity-20"
      ></div>
    </header>
  );
}
