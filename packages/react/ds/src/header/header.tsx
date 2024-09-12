import { Container } from '../container/container.js';
import { Text } from '../text/text.js';
import GovieLogo from '../../assets/logos/logo.js';
import GovieLogoSmall from '../../assets/logos/logoSmall.js';
import SearchIcon from '../../assets/icons/searchIcon.js';
import MobileMenu from '../../assets/icons/menuIcon.js';
import HeaderMenu from './components/headerMenu.js';
import HeaderSearch from './components/headerSearch.js';

export type HeaderProps = {
  languages?: {
    href: string;
    label: string;
  }[];
  navLinks?: {
    href: string;
    label: string;
  }[];
};

export function Header({ languages, navLinks }: HeaderProps) {
  return (
    <header
      className={`gi-relative gi-overflow-x-clip gi-bg-emerald-800 gi-border-gold-500 gi-font-primary`}
    >
      {languages && (
        <div className="gi-hidden sm:gi-block gi-bg-emerald-700">
          <ul className="gi-py-2 gi-flex gi-justify-end gi-gap-xl gi-items-center gi-h-full gi-mr-3xl">
            {languages.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400 gi-block gi-text-white hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 gi-rounded-sm"
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
        className="gi-h-20 gi-justify-between gi-items-center gi-flex gi-bg-emerald-800 gi-relative gi-px-3xl gi-py-xl"
      >
        <div className="gi-flex">
          <div className="xs:gi-block gi-hidden">
            <GovieLogo />
          </div>
          <div className="xs:gi-hidden gi-block">
            <GovieLogoSmall />
          </div>
        </div>
        <div className="gi-flex gi-items-center">
          <ul className="gi-hidden sm:gi-flex gi-gap-4 gi-text-white">
            {navLinks?.map((link, i) => (
              <li key={i} className="gi-flex">
                <a
                  href={link.href}
                  className="gi-rounded-sm active:gi-underline active:gi-underline-offset-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {navLinks && (
            <Text
              className="gi-hidden sm:gi-flex gi-text-white gi-p-2"
              as="span"
            >
              |
            </Text>
          )}
          <label
            htmlFor="SearchTrigger"
            className="gi-hidden xs:gi-flex gi-rounded-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 gi-items-center gi-gap-md gi-cursor-pointer focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400"
          >
            <Text className="gi-text-white" as="span">
              Search
            </Text>
            <SearchIcon />
          </label>
          <label
            htmlFor="MobileMenuTrigger"
            className="sm:gi-hidden gi-rounded-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 gi-flex gi-items-center gi-gap-md gi-cursor-pointer focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400"
          >
            <Text className="gi-text-white" as="span">
              Menu
            </Text>
            <MobileMenu />
          </label>
          <input className="gi-hidden" id="SearchTrigger" type="checkbox" />
          <input className="gi-hidden" id="MobileMenuTrigger" type="checkbox" />
        </div>
      </div>
      <HeaderSearch />
      <HeaderMenu languages={languages} navLinks={navLinks} />
      <div
        id="HeaderOverlayContainer"
        className="gi-top-0 gi-z-900 gi-pointer-events-none gi-hidden gi-w-full gi-h-full gi-bg-black gi-opacity-20"
      ></div>
    </header>
  );
}
