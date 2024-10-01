import GovieLogoSmall from '../assets/logos/logo-small.js';
import GovieLogo from '../assets/logos/logo.js';
import { Icon } from '../icon/icon.js';
import HeaderMenu from './components/header-menu.js';
import HeaderSearch from './components/header-search.js';

export type HeaderProps = {
  logoLink: string;
  searchUrl?: string;
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
  searchUrl,
  logoLink,
  languages,
  navLinks,
}: HeaderProps) {
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
                <a
                  href={link.href}
                  className="gi-border gi-border-solid gi-border-transparent focus-visible:gi-outline-offset-0 focus-visible:gi-outline-none focus-visible:gi-border focus-visible:gi-border-solid focus-visible:gi-border-yellow-400 focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400 gi-block gi-text-white hover:gi-bg-black hover:gi-bg-opacity-20 gi-py-1 gi-px-2 gi-rounded-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        id="MenuContainer"
        className="gi-h-20 gi-justify-between gi-items-center gi-flex gi-bg-emerald-800 gi-relative gi-py-3 gi-px-4 sm:gi-px-8 sm:gi-py-4"
      >
        <div className="gi-flex">
          <a href={logoLink} className="xs:gi-block gi-hidden">
            <GovieLogo />
          </a>
          <a href={logoLink} className="xs:gi-hidden gi-block">
            <GovieLogoSmall />
          </a>
        </div>
        <div className="gi-flex gi-items-center">
          <ul className="gi-hidden sm:gi-flex gi-gap-4 gi-text-white">
            {navLinks?.map((link, index) => (
              <li key={index} className="gi-flex">
                <a
                  href={link.href}
                  className="gi-border gi-border-solid gi-border-transparent gi-text-2md gi-font-bold focus-visible:gi-outline-offset-0 focus-visible:gi-outline-none focus-visible:gi-border focus-visible:gi-border-solid focus-visible:gi-border-yellow-400 gi-rounded-sm active:gi-underline active:gi-underline-offset-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {navLinks && searchUrl && (
            <div className="gi-hidden sm:gi-block gi-border-l gi-border-solid gi-border-l-white gi-h-8 gi-mx-6"></div>
          )}
          {searchUrl && (
            <label
              htmlFor="SearchTrigger"
              className="gi-border gi-border-solid gi-border-transparent focus-within:gi-outline-offset-0 focus-within:gi-outline-none focus-within:gi-border focus-within:gi-border-solid focus-within:gi-border-yellow-400 gi-hidden xs:gi-flex gi-rounded-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 gi-items-center gi-gap-md gi-cursor-pointer focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400"
            >
              <input
                className="gi-block gi-w-0 gi-absolute gi-h-0"
                id="SearchTrigger"
                type="checkbox"
              />
              <span className="gi-text-2md gi-font-bold gi-text-white">
                Search
              </span>
              <Icon className="search-icon gi-text-white" icon="search" />
              <Icon
                className="gi-hidden close-icon gi-text-white"
                icon="close"
              />
            </label>
          )}
          <label
            htmlFor="MobileMenuTrigger"
            className="gi-border gi-border-solid gi-border-transparent sm:gi-hidden gi-rounded-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 gi-flex gi-items-center gi-gap-md gi-cursor-pointer focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400 focus-within:gi-outline-offset-0 focus-within:gi-outline-none focus-within:gi-border focus-within:gi-border-solid focus-within:gi-border-yellow-400"
          >
            <input
              className="gi-block gi-w-0 gi-absolute gi-h-0"
              id="MobileMenuTrigger"
              type="checkbox"
            />
            <span className="gi-text-2md gi-font-bold gi-text-white">Menu</span>
            <Icon className="gi-text-white" icon="menu" />
          </label>
        </div>
      </div>
      {searchUrl && <HeaderSearch searchUrl={searchUrl} />}
      <HeaderMenu
        searchUrl={searchUrl}
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
