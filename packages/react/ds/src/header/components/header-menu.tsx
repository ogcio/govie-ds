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
    action: string;
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
      <div className="gi-border-gray-100 gi-border-b gi-border-solid gi-h-20 gi-flex gi-justify-end">
        <label
          htmlFor="MobileMenuTrigger"
          className="gi-mr-4 sm:gi-mr-8 gi-text-md gi-flex gi-items-center gi-gap-2 gi-cursor-pointer"
        >
          <span className="gi-text-2md gi-font-bold">Close</span>
          <Icon icon="close" />
        </label>
      </div>
      <ul className="gi-bg-white gi-px-4 sm:gi-px-8 gi-h-screen">
        {navLinks?.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="hover:gi-underline hover:gi-underline-offset-sm gi-block gi-py-4 gi-border-gray-100 gi-border-b gi-border-solid"
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
