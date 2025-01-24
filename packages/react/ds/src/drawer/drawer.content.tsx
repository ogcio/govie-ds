import {
  MenuItemAccordion,
  MenuListItem,
} from '../header/components/header-menu.js';
import { HeaderSearch } from '../header/components/header-search.js';
import { DrawerBody, DrawerFooter } from './drawer.js';

export const HtmlContent = (
  <>
    <DrawerBody>
      <p className="gi-paragraph-md">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
        molestias error accusantium non nobis excepturi doloremque dolorem
        possimus corrupti. Nostrum quisquam est voluptate! Iure suscipit,
        commodi cupiditate sit minima veritatis.
      </p>
    </DrawerBody>
    <DrawerFooter className="gi-flex gi-gap-6 gi-justify-end">
      <>
        <button className="gi-btn gi-btn-secondary gi-btn-secondary-dark gi-btn-regular">
          Cancel
        </button>
        <button className="gi-btn gi-btn-primary gi-btn-regular">
          Primary
        </button>
      </>
    </DrawerFooter>
  </>
);

export const TriggerButton = (
  <button
    data-testid="trigger-button-container"
    className="gi-btn gi-btn-primary gi-btn-regular"
  >
    Open Modal
  </button>
);

export const DrawerMenuExample = () => {
  const navLinks: any = [
    {
      href: '#',
      label: 'News',
    },
    {
      href: '#',
      label: 'Departments',
    },
    {
      href: '#',
      label: 'Services',
    },
  ];
  const tools: any = [
    {
      search: {
        label: 'Search',
        action: 'search_page',
      },
    },
  ];
  const languages: any = [
    {
      href: '#',
      label: 'English',
    },
    {
      href: '#',
      label: 'Gaeilge',
    },
  ];
  const searchProps: any = undefined;
  return (
    <ul>
      {navLinks?.map((link: any, index: number) => (
        <li key={`navLink-${link.label}-${index}`}>
          <MenuListItem
            href={link.href}
            label={link.label}
            external={link.external}
          />
        </li>
      ))}
      {tools?.items?.map(
        ({ href, label, slot, keepOnMobile, external }: any, index: number) => {
          if (slot && !keepOnMobile) {
            return null;
          }
          return (
            <li key={`toolItems-${label}-${index}`}>
              {slot ? (
                <MenuItemAccordion index={index} item={{ label, slot }} />
              ) : (
                <MenuListItem href={href} label={label} external={external} />
              )}
            </li>
          );
        },
      )}
      {languages?.map((link: any, index: number) => (
        <li key={`language-${link.label}-${index}`}>
          <MenuListItem href={link.href} label={link.label} bold={false} />
        </li>
      ))}
      {searchProps && (
        <li className="gi-mt-8 sm:gi-hidden">
          <HeaderSearch {...searchProps} />
        </li>
      )}
    </ul>
  );
};
