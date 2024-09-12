import CloseIcon from '../../../assets/icons/closeIcon.js';
import { Text } from '../../text/text.js';
import HeaderSearch from './headerSearch.js';

type HeaderMenuProps = {
  navLinks?: {
    href: string;
    label: string;
  }[];
  languages?: {
    href: string;
    label: string;
  }[];
};

function HeaderMenu({ languages, navLinks }: HeaderMenuProps) {
  return (
    <div
      id="HeaderMenuContainer"
      className="gi-z-1000 gi-bg-white gi-absolute gi-h-full gi-w-full xs:gi-w-3/5 gi-translate-x-full gi-top-0 gi-right-0"
    >
      <div className="gi-border-gray-100 gi-border-b gi-border-solid gi-h-20 gi-flex gi-justify-end">
        <label
          htmlFor="MobileMenuTrigger"
          className="gi-mr-8 gi-text-md gi-flex gi-items-center gi-gap-2 gi-cursor-pointer"
        >
          <Text size="sm" as="span">
            Close
          </Text>
          <CloseIcon />
        </label>
      </div>

      <ul className="gi-bg-white gi-px-4 sm:gi-px-8 gi-h-screen">
        {navLinks?.map((link,i) => (
          <li key={i}>
            <a
              href={link.href}
              className="hover:gi-underline hover:gi-underline-offset-sm gi-block gi-py-4 gi-border-gray-100 gi-border-b gi-border-solid"
            >
              <Text className="gi-font-bold" size="sm" as="span">
                {link.label}
              </Text>
            </a>
          </li>
        ))}
        {languages?.map((link,i) => (
          <li key={i}>
            <a
              href={link.href}
              className="hover:gi-underline hover:gi-underline-offset-sm gi-block gi-py-4 gi-border-gray-100 gi-border-b gi-border-solid"
            >
              <Text size="sm" as="span">
                {link.label}
              </Text>
            </a>
          </li>
        ))}
        <li className="xs:gi-hidden gi-mt-8">
          <HeaderSearch className="!gi-h-40" />
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
