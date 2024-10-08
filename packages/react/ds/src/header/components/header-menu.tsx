import { Icon, IconId } from '../../icon/icon.js';
import HeaderSearch from './header-search.js';

type HeaderMenuProps = {
  navLinks?: {
    href: string;
    label: string;
  }[];
  languages?: {
    href: string;
    label: string;
  }[];
  searchProps?: {
    action?: string;
    serverAction?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    label?: string;
    icon?: IconId;
  };
};

function HeaderMenu({ languages, navLinks, searchProps }: HeaderMenuProps) {
  return (
    <div
      id="HeaderMenuContainer"
      className="gi-z-1000 gi-bg-white gi-absolute gi-h-full gi-w-full xs:gi-w-3/5 gi-translate-x-full gi-top-0 gi-right-0"
    >
      <div className="gi-border-gray-100 gi-border-b-xs gi-border-solid gi-h-20 gi-justify-end gi-items-center gi-flex gi-relative gi-py-3 gi-px-4 sm:gi-px-8 sm:gi-py-4">
        <div className="gi-flex gi-items-center">
          <label
            htmlFor="MobileMenuTrigger"
            className="gi-border gi-border-solid gi-border-transparent sm:gi-hidden gi-rounded-sm hover:gi-bg-black hover:gi-bg-opacity-20 gi-p-2 gi-flex gi-items-center gi-gap-md gi-cursor-pointer focus:gi-border focus:gi-border-solid focus:gi-border-yellow-400 focus-within:gi-outline-offset-0 focus-within:gi-outline-none focus-within:gi-border focus-within:gi-border-solid focus-within:gi-border-yellow-400"
          >
            <span className="gi-text-2md gi-font-bold">Close</span>
            <Icon icon={'close'} />
          </label>
        </div>
      </div>
      <ul className="gi-bg-white gi-px-4 sm:gi-px-8 gi-h-screen">
        {navLinks?.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="hover:gi-underline hover:gi-underline-offset-sm gi-block gi-py-4 gi-border-gray-100 gi-border-b-xs gi-border-solid"
            >
              <span className="gi-text-sm gi-font-bold">{link.label}</span>
            </a>
          </li>
        ))}
        {languages?.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="hover:gi-underline hover:gi-underline-offset-sm gi-block gi-py-4"
            >
              <span className="gi-text-sm">{link.label}</span>
            </a>
          </li>
        ))}
        {searchProps && (
          <li className="xs:gi-hidden gi-mt-8">
            <HeaderSearch {...searchProps} className="!gi-h-40" />
          </li>
        )}
      </ul>
    </div>
  );
}

export default HeaderMenu;
